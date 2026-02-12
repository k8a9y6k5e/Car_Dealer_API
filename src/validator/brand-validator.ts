import {z} from 'zod';
import type {Request, Response, NextFunction} from 'express';
import {BrandError} from '../error-handler/brand-error-handler.js';
import {knex as db} from '../../database/knex-connection.js';

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

interface brandBody{
    name : string;
    nacionality : string;
}

async function brandAddValidator(req:Request, res:Response, next:NextFunction){
    try{
        const result = _addValidator(req.body);

        _alreadyExistValidator(result);

        req.validatedBody = result;

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

async function _alreadyExistValidator(body:brandBody){
    const existVerification = await db('brand')
        .where({brand_name : body.name})
        .select('id');

    if(existVerification) throw new BrandError('brand already added', 400, body);
}

export {brandAddValidator};