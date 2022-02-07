import Dexie, { type Table } from 'dexie';
import type Article from '$lib/databases/article';

export class ArticleStore extends Dexie {
	articles!: Table<Article, number>;

	constructor() {
		super('articles');
		this.version(12).stores({
			articles: '++id, title, book, author, content'
		});
	}
}

export const db = new ArticleStore();
