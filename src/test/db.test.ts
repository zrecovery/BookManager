import Article from '../lib/databases/article';

import { beforeEach, test, expect, vitest, assert } from 'vitest';
import { mockArticleStore, mockIdxArticleStore } from '../lib/databases/__mocks__/db';

let mockSavedArticles = async () => {
	let mockArticles = [
		new Article('mock title1', 'mock book1', 'mock  author1', 'mock content1\nmock line2-1', 1.0),
		new Article('mock title2', 'mock book1', 'mock  author1', 'mock content2\nmock line2-1', 2.0),
		new Article('mock title3', 'mock book2', 'mock  author2', 'mock content3\nmock line2-3', 2.0)
	];
	return await Promise.all(
		mockArticles.map(async (article) => {
			article.id = await mockIdxArticleStore.articles.add(article);
			return article;
		})
	);
};

test('能否保存文章', async () => {
	let article = new Article(
		'test title',
		'test book',
		'test author',
		'test content\ntest line2',
		1.0
	);
	let id = await mockArticleStore.save(article);
	expect(id).toBeDefined();
	expect(id).toBeGreaterThanOrEqual(0);
});

test('能否读取文章', async () => {
	let exceptedArticles = await mockSavedArticles();
	exceptedArticles.map(async (testArticle) =>
		expect(await mockArticleStore.get(testArticle.id)).toEqual(testArticle)
	);
});

// TODO
test('能否删除文章', async () => {
	let moeckedArticles = await mockSavedArticles();
});

// TODO
test('能否批量读文章', async () => {
	let moeckedArticles = await mockSavedArticles();
});
