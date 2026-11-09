const httpPkg = require('http');
const httpsPkg = require('https');

const pack = require('./package.json');
const { APP_URL, APP_PORT } = require('./env.js');

const ee = new require('events').EventEmitter();

const pkg = (APP_URL.startsWith('http://') ? httpPkg : httpsPkg);

pkg.createServer((req, res) => {
  let body = '';

  req.on('data', (chunk) => { body += chunk; });

  req.on('end', () => {
    try {
      const { event, data } = JSON.parse(body);
      ee.emit(event, data);
    } catch (e) {
      console.error('Error parsing request body:', e);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ name: pack.name, version: pack.version }));
  });
}).listen(APP_PORT, () => console.log(`Server running at ${APP_URL}`))

module.exports = ee;
