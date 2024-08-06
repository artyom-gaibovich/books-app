class BookService {
  constructor(bookRepository) {
    this.bookRepository = bookRepository;
  }

  async createBook({ title, author, publicationDate, genres }) {
    const newBook = { title, author, publicationDate, genres };
    return this.bookRepository.addBook(newBook);
  }

  async getBooks() {
    return this.bookRepository.getBooks();
  }

  async getBookById(id) {
    return this.bookRepository.getBookById(id);
  }

  async updateBook(id, bookUpdates) {
    return this.bookRepository.updateBook(id, bookUpdates);
  }

  async deleteBook(id) {
    return await this.bookRepository.deleteBook(id);
  }
}

module.exports = { BookService };
