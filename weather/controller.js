"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const cities_1 = require("../config/cities");
exports.controller = (weatherRepository) => {
    const weather = model_1.model(weatherRepository);
    let myLogger = require("./../config/winston");
    return {
        async getAction(req, res) {
            const { city, day, month } = req.query;
            myLogger.info("getAction for city " + city + " day = " + day + " month = " + month);
            if (!city) {
                res.status(400)
                    .send("Bad request");
                return;
            }
            if (!(city in cities_1.Cities)) {
                res.status(400)
                    .send("Bad request");
                return;
            }
            if (day != null &&
                day != "undefined" &&
                day.match(/^\d{4}-\d{2}-\d{2}$/) &&
                new Date(day).toString()
                    .toLowerCase() !== "invalid date") {
                let result = weather.getWeatherOfDay(new Date(day), city);
                res.json(result);
                return;
            }
            if (month != null &&
                month != "undefined" &&
                month.match(/^\d{4}-\d{2}$/) &&
                new Date(month).toString()
                    .toLowerCase() !== "invalid date") {
                let result = await weather.getWeatherOfMonth(new Date(month), city);
                res.json(result);
                return;
            }
            res.status(400)
                .send("Bad request");
        }
    };
};
