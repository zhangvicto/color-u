const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/upload',  // Specify the URL path you want to proxy
    createProxyMiddleware({
      target: 'http://127.0.0.1:3000',  // Your Flask app's URL
      changeOrigin: true,
    })
  );
};
