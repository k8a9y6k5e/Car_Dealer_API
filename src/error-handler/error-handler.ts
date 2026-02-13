import type { Request, Response, NextFunction } from "express";

import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import fs from 'fs';

if(!fs.existsSync('logs/error')) fs.mkdirSync('logs/error', {recursive:true});

const _errorTransport = new DailyRotateFile({
    level : 'error',
    dirname : 'logs/error',
    filename: 'error-%DATE%.log',
    datePattern : 'YYYY-MM-DD',
    maxFiles : '15d'
});

const _errorLogger = winston.createLogger({
    level : 'error',
    format : winston.format.json(),
    transports : [_errorTransport]
});

export default function (err:BaseError, req:Request, res:Response, next:NextFunction){
    const data = {
        work:false, 
        error:err.message,
        data:err.data
    };

    _errorLogger.error(data);

    res.status(err.statusCode ?? 500).json(data);
}

export class BaseError extends Error{
    statusCode : number;
    data : Array<string> | object;

    constructor(message:string, statusCode:number, data:Array<string>|object){
        super(message);
        this.statusCode  = statusCode;
        this.data = data;
        this.name = this.constructor.name;
    }
}