"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const weather_model_1 = require("./weather/weather.model");
const weather_1 = require("./weather");
const get_weather_data_1 = require("./get-weather-data");
(async function main() {
    let config = require("./config/config.json");
    let myLogger = require("./config/winston");
    let winston = require("winston");
    let expressWinston = require("express-winston");
    let options = {
        type: config.db.type,
        database: config.db.database,
        entities: [weather_model_1.Weather],
        logging: true
    };
    const connection = await typeorm_1.createConnection(options);
    const weatherRepository = connection.getRepository(weather_model_1.Weather);
    if (config.app.download_weather_data) {
        myLogger.info("setting interval");
        setInterval(get_weather_data_1.fetchWeatherData(weatherRepository), config.app.interval);
    }
    const app = express_1.default();
    app.use(require("morgan")("combined", { stream: myLogger.stream }));
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
    app.listen(config.app.port, function () {
        myLogger.info("Express server started on port " + config.app.port);
    });
})();
