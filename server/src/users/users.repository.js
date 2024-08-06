class UsersRepository {
  constructor(databaseService) {
    this.databaseService = databaseService;
  }

  async create({ email, password, username }) {
    const query =
      'INSERT INTO "user".users (email, password, username) VALUES ($1, $2, $3) RETURNING *;';
    const result = await this.databaseService.query(query, [
      email,
      password,
      username,
    ]);
    const user = result[0];
    return user;
  }

  async find(username, email) {
    const query =
      'SELECT * FROM "user".users WHERE username = $1 OR email = $2;';
    const result = await this.databaseService.query(query, [username, email]);
    if (!result) {
      return null;
    }
    const user = result[0];
    return user;
  }

  async findAll() {
      const query = 'SELECT * FROM "user".users;';
      return await this.databaseService.query(query);
  }

}

module.exports = { UsersRepository };
