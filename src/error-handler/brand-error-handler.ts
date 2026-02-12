import {BaseError} from './error-handler.js';

export class BrandError extends BaseError{
    constructor(message:string, statusCode:number, data:Array<string>){
        super(message,statusCode,data);
    }
}