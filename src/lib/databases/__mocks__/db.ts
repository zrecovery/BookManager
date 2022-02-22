import { ArticleStore, IdxArticleStore } from '../db';
import fakeIndexedDb from 'fake-indexeddb';
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import { vitest } from 'vitest';
import Article from '../article';

vitest.unmock('../db');

export { IdxArticleStore };

export const mockIdxArticleStore = new IdxArticleStore({
	indexedDB: fakeIndexedDb,
	IDBKeyRange: IDBKeyRange
});

export const mockArticleStore = new ArticleStore(mockIdxArticleStore);
