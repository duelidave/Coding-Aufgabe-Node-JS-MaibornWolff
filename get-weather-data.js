"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cities_1 = require("./config/cities");
let myLogger = require("./config/winston");
let config = require("./config/config.json");
let requestPromise = require("request-promise");
function fetchWeatherData(weatherRepository) {
    return () => {
        for (let city in cities_1.Cities) {
            if (!isNaN(Number(city))) {
                continue;
            }
            let uri = config.openweather.uri + "?q=" + city + "&units=metric&appid=" + config.openweather.appid;
            let options = {
                uri: uri,
                json: true
            };
            myLogger.info("requesting data from openweather API: " + uri);
            requestPromise(options)
                .then(async function (response) {
                if (response) {
                    try {
                        await weatherRepository.save(weatherRepository.create({
                            city: city,
                            temp: response.main.temp,
                            humidity: response.main.humidity
                        }));
                    }
                    catch (e) {
                        myLogger.error("could not insert new Weather Entity into database." + e.stack);
                    }
                }
            })
                .catch(function (err) {
                myLogger.error("error downloading data from openweather: " + err);
            });
        }
    };
}
exports.fetchWeatherData = fetchWeatherData;
