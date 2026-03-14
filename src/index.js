/**
 * Hello World HTTP Server
 * 用于 CI/CD 实验的简单服务
 */

const http = require('http');

const PORT = process.env.PORT || 3000;

/**
 * 创建 HTTP 服务器
 * @returns {http.Server}
 */
function createServer() {
  return http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Hello World',
        version: process.env.npm_package_version || '1.0.0',
        timestamp: new Date().toISOString()
      }));
    } else if (url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  });
}

/**
 * 启动服务器
 * @param {number} port
 * @returns {http.Server}
 */
function start(port = PORT) {
  const server = createServer();
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  return server;
}

module.exports = { createServer, start };