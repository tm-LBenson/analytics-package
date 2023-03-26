import analytics from './analytics';

if (typeof window !== 'undefined') {
  window.analytics = analytics;
}

export default analytics;
