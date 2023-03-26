// index.js

const analytics = require('./analytics');
const { generateScriptTag } = require('./generateScriptTag');

if (typeof window !== 'undefined') {
  window.analytics = analytics;
  window.generateScriptTag = generateScriptTag;
} else {
  module.exports = { analytics, generateScriptTag };
}

