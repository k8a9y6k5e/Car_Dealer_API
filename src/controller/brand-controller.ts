import type {Request, Response, NextFunction} from 'express';

function brandAddController(req:Request, res:Response, next:NextFunction){
    try{
        const result = _insertBrand();

        res.status(201).json({work:true,data:result});
    }
    catch(err){next(err);}
}

function _insertBrand(){
    return 
}