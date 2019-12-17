import {Cities} from "./config/cities";
import {Weather, WeatherResponse} from "./weather/weather.model";
import {Repository} from "typeorm";

let myLogger = require("./config/winston");
let config = require("./config/config.json");
let requestPromise = require("request-promise");

export function fetchWeatherData (weatherRepository: Repository<Weather>)
{
    return () =>
    {
        for (let city in Cities)
        {
            if (!isNaN(Number(city)))
            {
                continue;
            }
            
            let uri = config.openweather.uri + "?q=" + city + "&units=metric&appid=" + config.openweather.appid;
            let options = {
                uri: uri,
                json: true
            };
            
            myLogger.info("requesting data from openweather API: " + uri);
            
            requestPromise(options)
                .then(async function (response: WeatherResponse)
                      {
                          if (response)
                          {
                              try
                              {
                                  await weatherRepository.save(weatherRepository.create({
                                                                                            city: city,
                                                                                            temp: response.main.temp,
                                                                                            humidity: response.main.humidity
                                                                                        }));
                              }
                              catch (e)
                              {
                                  myLogger.error("could not insert new Weather Entity into database." + e.stack);
                              }
                        
                          }
                      })
                .catch(function (err: any)
                       {
                           myLogger.error("error downloading data from openweather: " + err);
                       });
        }
    };
}