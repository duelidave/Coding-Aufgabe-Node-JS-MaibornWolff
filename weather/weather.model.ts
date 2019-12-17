import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {getTime} from "date-fns";

@Entity()
export class Weather extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    city: string;
    
    @Column()
    time: number;
    
    @Column()
    temp: number;
    
    @Column()
    humidity: number;
    
    constructor (city: string, temp: number, humidity: number)
    {
        super();
        this.city = city;
        this.temp = temp;
        this.humidity = humidity;
        this.time = getTime(Date.now());
    }
}

export interface WeatherResponse
{
    main: {
        temp: number;
        humidity: number;
    };
}
