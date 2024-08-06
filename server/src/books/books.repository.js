class BookRepository {
  constructor(dataBaseService) {
    this.dataBaseService = dataBaseService;
  }

  async addBook(book) {
    const query =
      'INSERT INTO books (title, author, user_id) VALUES ($1, $2, $3) RETURNING *;';
    const values = [book.title, book.author, book.user_id];
    const result = await this.dataBaseService.query(query, values);
    return result[0];
  }

  async getBooks() {
    const query = 'SELECT * FROM books;';
    return await this.dataBaseService.query(query);
  }

  async getBookById(id) {
    const query = 'SELECT * FROM books WHERE id = $1;';
    const values = [id];
    const result = await this.dataBaseService.query(query, values);
    return result[0];
  }

  async updateBook(id, bookUpdates) {
    const query =
      'UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *;';
    const values = [bookUpdates.title, bookUpdates.author, id];
    const result = await this.dataBaseService.query(query, values);
    return result[0];
  }

  async deleteBook(id) {
    const query = 'DELETE FROM books WHERE id = $1 RETURNING *;';
    const values = [id];
    const result = await this.dataBaseService.query(query, values);
    return result.rowCount > 0;
  }
}

module.exports = { BookRepository };
