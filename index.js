// index.js

if (typeof window !== 'undefined') {
  window.analytics = require('./analytics');
  window.generateScriptTag = require('./generateScriptTag');
} else {
  module.exports = require('./analytics');
  module.exports = require('./generateScriptTag');
}
