import morgan from 'morgan';
import winston from 'winston';
import WDR from 'winston-daily-rotate-file';

import type {Request, Response, NextFunction} from 'express';

import fs from 'fs';

if(!fs.existsSync('logs/http')) fs.mkdirSync('logs/http', {recursive:true})

const _httpTransport = new WDR({
    level : 'http',
    dirname : 'logs/http',
    filename : 'http-request-%DATE%.log',
    datePattern : 'YYYY-MM-DD',
    maxFiles : '15d'
});

const _httpLogger = winston.createLogger({
    level : 'http',
    format : winston.format.json(),
    transports : [_httpTransport]
});

function _logHttp(message : string){
    _httpLogger.http(message.trim());
}

export default morgan('combined', {
    stream : { write : _logHttp}
})