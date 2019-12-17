let appRoot = require('app-root-path');
let winston = require('winston');

let accessLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: `${appRoot}/logs/access.log` })
    ]
});

accessLogger.stream = {
   write: function (message, _) {
        accessLogger.info(message);
    }
};

module.exports = accessLogger;