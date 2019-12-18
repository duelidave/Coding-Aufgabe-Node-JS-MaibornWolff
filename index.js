"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const weather_model_1 = require("./weather/weather.model");
const weather_1 = require("./weather");
const get_weather_data_1 = require("./get-weather-data");
const fs = __importStar(require("fs"));
(async function main() {
    let config = require("./config/config.json");
    let logger = require("./logger/app");
    let winston = require("winston");
    let https = require('https');
    let expressWinston = require("express-winston");
    let options = {
        type: config.db.type,
        database: config.db.database,
        entities: [weather_model_1.Weather],
        logging: true
    };
    let connection = await typeorm_1.createConnection(options);
    const weatherRepository = connection.getRepository(weather_model_1.Weather);
    if (config.app.download_weather_data) {
        logger.error("setting interval = " + config.app.interval);
        setInterval(get_weather_data_1.fetchWeatherData(weatherRepository), config.app.interval);
    }
    const app = express_1.default();
    app.use(require("morgan")("combined", { stream: require("./logger/access").stream }));
    app.use("/weather", weather_1.router(weatherRepository));
    app.use(expressWinston.errorLogger({
        transports: [
            new winston.transports.File({
                level: "error",
                filename: "./logs/error.log",
                handleExceptions: true,
                json: true
            })
        ]
    }));
    //TODO: David Mueller - http2 Server
    https.createServer({
        key: fs.readFileSync('cert/privateKey.key'),
        cert: fs.readFileSync('cert/certificate.crt')
    }, app)
        .listen(config.app.port, function () {
        logger.info("Express server started on port " + config.app.port);
    });
})();
