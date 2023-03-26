// index.js

const analytics = require('./analytics');

if (typeof window !== 'undefined') {
  window.analytics = analytics;
}
if (module) {
  module.exports = analytics;
}
