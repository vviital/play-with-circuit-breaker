const Promise = require('bluebird');
const express = require('express');

const RestApi = require('./resource');

const resourceEndpoint = process.env.RESOURCE_ENDPOINT;

const app = express();

const api = new RestApi({
  timeout: +process.env.TIMEOUT,
  usersEndpoint: process.env.USERS_ENDPOINT,
  assetsEndpoint: process.env.ASSETS_ENDPOINT,
});

app.get('/resource', async (req, res) => {
  let object = {};
  try {
    const [users, assets] = await Promise.all([
      api.getUsers(),
      api.getAssets(),
    ]);
  
    object = {
      [users.type.toLowerCase()]: users,
      [assets.type.toLowerCase()]: assets,
    };
  } catch (error) {
    console.error(error);
  }

  res.json(object);
});

app.listen(+process.env.PORT || 8080);
