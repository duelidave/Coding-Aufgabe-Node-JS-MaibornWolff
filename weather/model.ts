import {Between, Repository} from "typeorm";
import {Weather} from "./weather.model";
import {endOfDay, endOfMonth, startOfDay, startOfMonth} from "date-fns";
import {logger} from "express-winston";

export const model = (weatherRepository: Repository<Weather>) => (
    {
        async getWeatherOfDay (day: Date, city: string)
        {
            try
            {
                let weathers: Weather[] = await weatherRepository.find(
                    {
                        city: city,
                        time: Between(startOfDay(day).getTime(), endOfDay(day).getTime())
                    });
                
                return calculateAvgWeather(weathers, city);
            }
            catch (_)
            {
                return [];
            }
        },
        
        async getWeatherOfMonth (month: Date, city: string)
        {
            try
            {
                let weathers: Weather[] = await weatherRepository.find(
                    {
                        city: city,
                        time: Between(startOfMonth(month).getTime(), endOfMonth(month).getTime())
                    });
                
                return calculateAvgWeather(weathers, city);
            }
            catch (_)
            {
                return [];
            }
        }
    });

function calculateAvgWeather (weathers: Weather[], city: string)
{
    if (weathers == null || weathers.length == 0)
    {
        return [];
    }
    
    try
    {
        const sumHumidity = weathers.reduce((prev, current) => prev + current.humidity, 0);
        const sumTemp = weathers.reduce((prev, curr) => prev + curr.temp, 0);
        const avgHumidity = (sumHumidity / weathers.length) || 0;
        const avgTemp = (sumTemp / weathers.length) || 0;
    
        return new Weather(city, avgTemp, avgHumidity);
    }
    catch (_)
    {
        return [];
    }
    
}
