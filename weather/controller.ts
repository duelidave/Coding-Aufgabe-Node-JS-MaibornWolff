import express from "express";
import {model} from "./model";
import {Repository} from "typeorm";
import {Weather} from "./weather.model";
import {Cities} from "../config/cities";

export const controller = (weatherRepository: Repository<Weather>) =>
{
    let myLogger = require("./../config/winston");
    let weather = model(weatherRepository);
    
    return {
        async getAction (req: express.Request, res: express.Response)
        {
            const {city, day, month} = req.query;
            myLogger.info("getAction for city " + city + " day = " + day + " month = " + month);
            
            if (!city)
            {
                res.status(400)
                   .send("Bad request");
                return;
            }
            
            if (!(city in Cities))
            {
                res.status(400)
                   .send("Bad request");
                return;
            }
            
            if (
                day != null &&
                day != "undefined" &&
                day.match(/^\d{4}-\d{2}-\d{2}$/) &&
                new Date(day).toString()
                             .toLowerCase() !== "invalid date")
            {
                let result = weather.getWeatherOfDay(new Date(day), city);
                res.json(result);
                return;
            }
            
            if (
                month != null &&
                month != "undefined" &&
                month.match(/^\d{4}-\d{2}$/) &&
                new Date(month).toString()
                               .toLowerCase() !== "invalid date")
            {
                let result = await weather.getWeatherOfMonth(new Date(month), city);
                res.json(result);
                return;
            }
            
            res.status(400)
               .send("Bad request");
        }
    };
};
