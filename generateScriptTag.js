// generateScriptTag.js

export function generateScriptTag(siteName, clientId) {
  return `
    <script>
      (function() {
        var siteName = '${siteName}';
        var clientId = '${clientId}';
        var script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/analytics-benson@1.0.1/analytics.min.js';
        script.async = true;
        script.onload = function() {
          analytics(siteName, clientId);
        };
        document.body.appendChild(script);
      })();
    </script>
  `;
}
