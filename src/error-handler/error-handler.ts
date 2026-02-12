import type { Request, Response } from "express";

import DailyRotateFile from 'winston-daily-rotate-file';

import fs from 'fs';

const errorLogger = new DailyRotateFile({
    level : 'error',
    dirname : 'logs/error',
    filename: 'error-%DATE%.log',
    datePattern : 'YYYY-MM-DD',
    maxFiles : '15d'
});

export default function (err:BaseError, req:Request, res:Response){
    if(!fs.existsSync('logs/error')) fs.mkdirSync('logs/error', {recursive:true});

    res.status(err.statusCode | 500).json({
        work:false, 
        error:err.message,
        data:err.data
    });
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