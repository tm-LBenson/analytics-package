// index.js
// index.js
import analytics from './analytics';

if (typeof window !== 'undefined') {
  window.analytics = analytics;
}
if (typeof module !== 'undefined') {
  module.exports = analytics;
}
