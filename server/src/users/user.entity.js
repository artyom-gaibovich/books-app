const { compare, hash } = require('bcryptjs');

class User {
  constructor(_email, _username, passwordHash) {
    if (passwordHash) {
      this._password = passwordHash;
    }
    this._email = _email;
    this._username = _email;
  }

  get email() {
    return this._email;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  async setPassword(pass, salt) {
    this._password = await hash(pass, salt);
  }

  async comparePassword(pass) {
    return compare(pass, this._password);
  }
}

module.exports = { User };
