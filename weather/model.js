"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const weather_model_1 = require("./weather.model");
const date_fns_1 = require("date-fns");
exports.model = (weatherRepository) => ({
    async getWeatherOfDay(day, city) {
        try {
            let weathers = await weatherRepository.find({
                city: city,
                time: typeorm_1.Between(date_fns_1.startOfDay(day).getTime(), date_fns_1.endOfDay(day).getTime())
            });
            return calculateAvgWeather(weathers, city);
        }
        catch (_) {
            return [];
        }
    },
    async getWeatherOfMonth(month, city) {
        try {
            let weathers = await weatherRepository.find({
                city: city,
                time: typeorm_1.Between(date_fns_1.startOfMonth(month).getTime(), date_fns_1.endOfMonth(month).getTime())
            });
            return calculateAvgWeather(weathers, city);
        }
        catch (_) {
            return [];
        }
    }
});
function calculateAvgWeather(weathers, city) {
    if (weathers != null && weathers.length == 0) {
        return [];
    }
    const sumHumidity = weathers.reduce((prev, current) => prev + current.humidity, 0);
    const sumTemp = weathers.reduce((prev, curr) => prev + curr.temp, 0);
    const avgHumidity = (sumHumidity / weathers.length) || 0;
    const avgTemp = (sumTemp / weathers.length) || 0;
    return new weather_model_1.Weather(city, avgTemp, avgHumidity);
}
