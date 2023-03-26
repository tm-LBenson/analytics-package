# Analytics Benson

Analytics Benson is a lightweight and easy-to-use JavaScript library that allows developers to keep track of their website's analytics and statistics. It supports various web app types, including React, Express, and EJS templates.

## [Visit the tracking site to sign up for free!](https://portfolio-analytics.netlify.app/)

## Features

Analytics Benson allows you to track various aspects of user behavior on your website, including:

Device type (mobile, tablet, or desktop)
Screen size (width and height)
General Location for a map
Timestamp of the visit
Track multiple visits (1 per hour)

## Installation

To install the package, run the following command in your project directory:

`npm install analytics-benson`

## Usage

### React and other JavaScript projects

1. Import the `analytics` function from the package:

```js
import { analytics } from 'analytics-benson';
```

Call the analytics function, passing in your siteName and clientId:

```js
analytics('Your Site Name', 'your-client-id');
```

Place the function call in a suitable location in your app, such as in the root component or a layout component.

## Express apps with EJS templates

Install the package as mentioned above.

Import the generateScriptTag function from the package:

```js
const { generateScriptTag } = require('analytics-benson/generateScriptTag');
```

Generate the script tag and pass it to your EJS template:

```js
app.get('/', (req, res) => {
  const scriptTag = generateScriptTag('Your Site Name', 'your-client-id');
  res.render('index', { scriptTag });
});
```

Add the script tag to your EJS template:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->

    <%- scriptTag %>
  </body>
</html>
```

## CDN

If you prefer to use a CDN instead of installing the package, you can use jsDelivr:

Add the following script tags to your HTML file, replacing 'yourSiteName' and 'yourClientId' with the appropriate values:

```html
<script src="https://cdn.jsdelivr.net/npm/analytics-benson@1.0.17/analytics.min.js"></script>
<script>
  analytics('yourSiteName', 'yourClientId');
</script>
```

## License

This package is released under the MIT License.
