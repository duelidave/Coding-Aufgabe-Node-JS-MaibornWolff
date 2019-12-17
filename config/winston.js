let appRoot = require('app-root-path');
let winston = require('winston');

let options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/access.log`,
        handleExceptions: true,
        prettyPrint: true,
        json: false,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    },
};

let logger = new winston.createLogger({
    transports: [
        new winston.transports.Console(options.console),
        new winston.transports.File(options.file)
    ],
    exitOnError: false
});

logger.stream = {
    write: function (message, _) {
        logger.info(message);
    }
};

module.exports = logger;