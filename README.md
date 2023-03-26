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
import analytics from 'analytics-benson';
```

Call the analytics function, passing in your siteName and clientId:

```js
analytics('Your Site Name', 'your-client-id');
```

Place the function call in a suitable location in your app, such as in the root component or a layout component. In a React app, you can place the function call inside of a useEffect hook to ensure the function fires on page load.

## CDN

If you prefer to use a CDN instead of installing the package, you can use jsDelivr:

Add the following script tags to your HTML file, replacing 'yourSiteName' and 'yourClientId' with the appropriate values:

```html
<script src="https://cdn.jsdelivr.net/npm/analytics-benson@1.1.0/analytics.min.js"></script>
<script>
  analytics('yourSiteName', 'yourClientId');
</script>
```

## License

This package is released under the MIT License.
