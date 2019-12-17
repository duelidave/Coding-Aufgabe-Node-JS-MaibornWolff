let appRoot = require('app-root-path');
let winston = require('winston');

let logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: `${appRoot}/logs/error.log`, level: 'error' }),
        new winston.transports.File({ filename: `${appRoot}/logs/app.log` })
    ]
});

module.exports = logger;