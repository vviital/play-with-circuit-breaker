const got = require('got');
const Brakes = require('brakes');

const usersFallback = {
  type: 'Users',
}
const assetsFallback = {
  type: 'Assets',
}
const emptyObject = {};

class RestApi {
  constructor(options = {}) {
    this.usersEndpoint = options.usersEndpoint;
    this.assetsEndpoint = options.assetsEndpoint;

    this._brakes = new Brakes({
      timeout: options.timeout,
      group: 'rest-api',
      snapshot: 1000,
      fallback: () => emptyObject,
    });

    const getAssetsSlave = this._brakes.slaveCircuit(this.getAssets.bind(this), () => usersFallback, { name: 'get-users'})
    const getUsersSlave = this._brakes.slaveCircuit(this.getUsers.bind(this), () => assetsFallback, { name: 'get-asset' });

    this.getAssets = getAssetsSlave.exec.bind(getAssetsSlave) 
    this.getUsers = getUsersSlave.exec.bind(getUsersSlave) 
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
