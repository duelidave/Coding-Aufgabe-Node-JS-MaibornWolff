import express from "express";
import {controller} from "./controller";
import {Repository} from "typeorm";
import {Weather} from "./weather.model";

export const router = (weatherRepository: Repository<Weather>) =>
{
    const router = express.Router();
    const ctr = controller(weatherRepository);
    
    router.get("/", ctr.getAction);
    
    return router;
};
