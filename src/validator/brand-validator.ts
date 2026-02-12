import {z} from 'zod';
import type {Request, Response, NextFunction} from 'express';

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
        const field = result.error.issues[0]?.path.join(', ');
        throw new Error(`Invalid value format enter in : ${field}`);
    }

    return result.data;
}

export {brandAddValidator};