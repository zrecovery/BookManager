export default class Article {
	id?: number;
	title: string;
	book: string;
	author: string;
	content: string;
	serial: number;

	constructor(title: string, book: string, author: string, content: string, serial: number) {
		this.title = title;
		this.book = book;
		this.author = author;
		this.content = content;
		this.serial = serial;
	}
}
