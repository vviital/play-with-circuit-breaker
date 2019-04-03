const Promise = require('bluebird');
const express = require('express');
const _ = require('lodash')
const common = require('../common');

const app = express();

const Assets = {
  type: 'Assets',
  offset: 0,
  limit: 10,
  array: _.times(10, (index) => ({ value: `asset ${index + 1}`, created: new Date().getTime() })),
}

app.get('/collection', async (req, res) => {
  common.iter += 1;

  const timeToWait = common.calculateResponseTime();
  await Promise.delay(timeToWait);

  return res.send(JSON.stringify(Assets));
});

app.listen(+process.env.PORT || 8080);
