class RolesRepository {
  constructor(rolesService, databaseService) {
    this.rolesService = rolesService;
    this.databaseService = databaseService;
  }

  async findByUserId(userId) {
    const query = 'SELECT * FROM "user".user_roles WHERE user_id = $1;';
    const result = await this.databaseService.query(query, [userId]);
    if (result.length === 0) {
      return null;
    }
    return {
      userId: userId,
      roles: result,
    };
  }

  async deleteByUserId(userId) {
    await this.databaseService.query(
      'DELETE FROM "user".user_roles WHERE user_id = $1',
      [userId]
    );
  }

  async create(userId, newRoles) {
    for (const newRole of newRoles) {
      const res = await this.databaseService.query(
        'INSERT INTO "user".user_roles (user_id, role_value) VALUES ($1, $2)',
        [userId, newRole]
      );
    }
  }
}

module.exports = { RolesRepository };
