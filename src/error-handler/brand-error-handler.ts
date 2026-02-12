import {BaseError} from './error-handler.js';

export class BrandError extends BaseError{
    constructor(message:string, statusCode:number, data:Array<string>|object){
        super(message,statusCode,data);
    }
}