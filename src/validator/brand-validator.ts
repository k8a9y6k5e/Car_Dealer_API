import {z} from 'zod';
import type {Request, Response, NextFunction} from 'express';
import {BrandError} from '../error-handler/brand-error-handler.js';

declare global{
    namespace Express{
        interface Request{
            validatedBody:{
                name : string,
                nacionality : string
            }
        }
    }
}

function brandAddValidator(req:Request, res:Response, next:NextFunction){
    try{
        req.validatedBody = _addValidator(req.body);

        next();
    }
    catch (err){next(err);}
}

const _addSchema = z.object({
    name : z.string().trim().min(1),
    nacionality : z.string().trim().min(1)
});

function _addValidator(body:object){
    const result = _addSchema.safeParse(body);

    if(!result.success) {
        const fields = result.error.issues.map(issue => issue.message);
        throw new BrandError('Invalid value format enter', 400, fields);
    }

    return result.data;
}

export {brandAddValidator};