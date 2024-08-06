const { ErrorCodes } = require('../constants/error.constants');
const { BaseController } = require('../common/base.controller');

class BookController extends BaseController {
  constructor(loggerService, bookService, rolesService) {
    super(loggerService, 'books');
    this.bindRoutes([
      {
        path: '',
        method: 'post',
        func: this.create,
        middlewares: [],
      },
      {
        path: '',
        method: 'get',
        func: this.findAll,
        middlewares: [],
      },
      {
        path: '/:id',
        method: 'get',
        func: this.findById,
        middlewares: [],
      },
      {
        path: '/:id',
        method: 'put',
        func: this.update,
        middlewares: [],
      },
      {
        path: '/:id',
        method: 'delete',
        func: this.delete,
        middlewares: [],
      },
    ]);
    this.bookService = bookService;
    this.rolesService = rolesService;
  }

  async create(req, res, _) {
    const { title, author, publicationDate, genres } = req.body;
    const result = await this.bookService.createBook({
      title,
      author,
      publicationDate,
      genres,
    });
    this.ok(res, result);
    this.loggerService.log(`Create book: ${JSON.stringify(result)}`);
  }

  async delete(req, res, _) {
    const { id } = req.params;
    const result = await this.bookService.deleteBook(id);
    if (result.deletedCount === 0) {
      this.loggerService.error(` Book : ID ${id} doesnt exists`);
      this.send(res, ErrorCodes.NotFound, {
        status: ErrorCodes.NotFound,
        message: 'Book doesnt exists',
      });
    } else {
      this.ok(res, result);
      this.loggerService.log(`Delete book: ID ${id}`);
    }
  }

  async findAll(_, res, __) {
    const books = await this.bookService.getBooks();
    this.ok(res, { books });
    this.loggerService.log(
      `Find all books: ${books?.length ? books?.length : 0} found`
    );
  }

  async findById(req, res, _) {
    const { id } = req.params;
    const result = await this.bookService.getBookById(id);
    if (!result) {
      this.loggerService.error(` Book with id ${id} not found`);
      this.send(res, ErrorCodes.NotFound, {
        status: ErrorCodes.NotFound,
        message: ` Book with id ${id} not found`,
      });
    } else {
      this.ok(res, result);
      this.loggerService.log(
        `Find book by ID: ${id}, Result: ${JSON.stringify(result)}`
      );
    }
  }

  async update(req, res, _) {
    const { id } = req.params;
    const { title, author, publicationDate, genres } = req.body;
    const result = await this.bookService.updateBook(id, {
      title,
      author,
      publicationDate,
      genres,
    });
    if (!result) {
      this.loggerService.error(` Book with id ${id} not found`);
      this.send(res, ErrorCodes.NotFound, {
        status: ErrorCodes.NotFound,
        message: ` Book with id ${id} not found`,
      });
    } else {
      this.ok(res, result);
      this.loggerService.log(
        `Update book: ID ${id}, Data: ${JSON.stringify(req.body)}`
      );
    }
  }
}

module.exports = { BookController };
