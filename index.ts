import {ConnectionOptions, createConnection} from "typeorm";
import express from "express";
import {Weather} from "./weather/weather.model";
import {router as weatherRouter} from "./weather";
import {fetchWeatherData} from "./get-weather-data";
import * as fs from "fs";

(async function main ()
{
    let config = require("./config/config.json");
    let myLogger = require("./config/winston");
    let winston = require("winston");
    let https = require('https')
    let expressWinston = require("express-winston");
    
    let options: ConnectionOptions = {
        type: config.db.type,
        database: config.db.database,
        entities: [Weather],
        logging: true
    };
    
    const connection = await createConnection(options);
    const weatherRepository = connection.getRepository(Weather);
    
    if (config.app.download_weather_data)
    {
        myLogger.info("setting interval");
        setInterval(fetchWeatherData(weatherRepository), config.app.interval);
    }
    
    const app: express.Application = express();
    
    app.use(require("morgan")("combined", {stream: myLogger.stream}));
    app.use("/weather", weatherRouter(weatherRepository));
    
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
         .listen(config.app.port, function ()
    {
        myLogger.info("Express server started on port " + config.app.port);
    });
})();
