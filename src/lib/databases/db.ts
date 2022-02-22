import Dexie, { type Table } from 'dexie';
import type Article from './article';

interface AlternativeDatabase {
	indexedDB: { open: Function };
	IDBKeyRange: { bound: Function; lowerBound: Function; upperBound: Function };
}

export class IdxArticleStore extends Dexie {
	articles!: Table<Article, number>;

	constructor(alternativeDatabase?: AlternativeDatabase) {
		super('articles', { ...alternativeDatabase });
		this.version(12).stores({
			articles: '++id, title, book, author, content'
		});
	}
}

const db = new IdxArticleStore();

export class ArticleStore {
	private db: IdxArticleStore;

	constructor(store: IdxArticleStore) {
		this.db = store;
	}

	async save(article: Article): Promise<number> {
		return await this.db.transaction('rw', this.db.articles, async () => {
			return await this.db.articles.put(article);
		});
	}

	// 判断字符串内是否包含全部关键词
	private static stringIncludeAllKeywords(keys: string[], arr: string): boolean {
		return keys.map((key) => new RegExp(key).test(arr)).filter((a) => !a).length === 0;
	}

	async query(keyword = '', offset = 0, limit = 25): Promise<Article[]> {
		return await this.db.transaction('r', this.db.articles, async () => {
			return await this.db.articles
				.filter((article) =>
					ArticleStore.stringIncludeAllKeywords(keyword.split(' '), article.content)
				)
				.offset(offset)
				.limit(limit)
				.toArray();
		});
	}

	async get(id: number): Promise<Article> {
		return await this.db.transaction('r', this.db.articles, async () => {
			return await this.db.articles.get(id);
		});
	}

	async remove(id: number): Promise<void> {
		return await this.db.transaction('rw', this.db.articles, async () => {
			await this.db.articles.delete(id);
		});
	}
}

export const articleStore = new ArticleStore(db);
