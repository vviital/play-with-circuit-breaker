const assert = require('assert').strict;

const object = {
  iter: 0,
  minTime: 500,
  interval: +process.env.RELEASE_INTERVAL,
  slowdown: +process.env.SLOWDOWN,
  calculateResponseTime: function() {
    console.log('--- this.minTime + Math.sqrt(this.iter) / this.slowdown * this.minTime ---', this.minTime + Math.sqrt(this.iter) / this.slowdown * this.minTime);
    return this.minTime + Math.sqrt(this.iter) / this.slowdown * this.minTime;
  },
};

assert.notStrictEqual(object.interval, NaN, 'Interval value should be specified')
assert.notStrictEqual(object.slowdown, NaN, 'Slowdown value should be specified')

setInterval(() => {
  object.iter = Math.max(object.iter - 1, 0);
  console.log('next value for iter', object.iter);
}, object.interval)

module.exports = object;
