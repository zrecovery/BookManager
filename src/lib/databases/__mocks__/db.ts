import { ArticleStore, IdxArticleStore } from '../db';
import { vitest } from 'vitest';
import Article from '../article';

vitest.unmock('../db');

export { IdxArticleStore };

export const mockIdxArticleStore = new IdxArticleStore({
	indexedDB: fakeIndexedDb,
	IDBKeyRange: IDBKeyRange
});

export const mockArticleStore = new ArticleStore(mockIdxArticleStore);
