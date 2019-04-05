const got = require('got');
const Promise = require('bluebird');
const _  = require('lodash');
const moment = require('moment');

const hasUsers = (object = {}) => {
  return _.get(object, 'users.type') === 'Users' && _.has(object, 'users.array');
}

const hasAssets = (object = {}) => {
  return _.get(object, 'assets.type') === 'Assets' && _.has(object, 'assets.array');
}

const main = async () => {
  const doRequest = async () => {
    const endpoint = process.env.ENDPOINT;
    const start = moment.now();
    const { body } = await got(endpoint, { json: true, timeout: 30000 });
    const end = moment.now();

    console.log('request took:', end - start, 'has users', hasUsers(body), 'has assets', hasAssets(body));
  };

  while (true) {
    console.log('next iteration');

    for (let i = 0; i < 30; i += 1) {
      // do request and not wait
      doRequest();
    }

    await Promise.delay(1000);
  }
};

main().catch(console.error);
