const got = require('got');

class RestApi {
  constructor(options = {}) {
    this.timeout = options.timeout || 1000;
    this.usersEndpoint = options.usersEndpoint;
    this.assetsEndpoint = options.assetsEndpoint;
  }

  async getUsers() {
    const result = await got(`${this.usersEndpoint}/collection`, {
      timeout: this.timeout,
      json: true,
    });

    return result.body;
  }

  async getAssets() {
    const result = await got(`${this.assetsEndpoint}/collection`, {
      timeout: this.timeout,
      json: true,
    });

    return result.body;
  }
}

module.exports = RestApi;
