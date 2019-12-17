"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
let Weather = class Weather extends typeorm_1.BaseEntity {
    constructor(city, temp, humidity) {
        super();
        this.city = city;
        this.temp = temp;
        this.humidity = humidity;
        this.time = date_fns_1.getTime(Date.now());
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Weather.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Weather.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Weather.prototype, "time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Weather.prototype, "temp", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Weather.prototype, "humidity", void 0);
Weather = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, Number, Number])
], Weather);
exports.Weather = Weather;
