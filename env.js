const { APP_PORT = '3000' } = process.env;

const APP_URL = 'http://localhost:' + APP_PORT;

module.exports = { APP_PORT, APP_URL };
