const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://176.96.241.177:8000',
      changeOrigin: true,
    })
  );
};