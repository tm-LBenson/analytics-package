// index.js

if (typeof window !== 'undefined') {
  window.analytics = require('./analytics');
} else {
  module.exports = require('./analytics');
}
