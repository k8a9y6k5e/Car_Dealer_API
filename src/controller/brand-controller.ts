import type{Request, Response, NextFunction}from'express';
import{ knex as db}from'../../database/knex-connection.js';

interface BrandBody{
    name :string;
    nacionality :string;
}

async function brandAddController(req:Request,res:Response,next:NextFunction){
    try{
        const result =await _insertBrand(req.body as BrandBody);

        res.status(201).json({work:true,data:result});
    }
    catch(err){next(err);}
}

async function _insertBrand(informations: BrandBody){
    const[id]=await db('brand').insert({
        brand_name :informations.name,
        brand_nacionality :informations.nacionality
    });

    return{id : id, name :informations.name, nacionality :informations.nacionality};
}

export {brandAddController};