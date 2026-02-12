import express from 'express'; 
const brandRouter = express.Router();

//validators
import {brandAddValidator} from '../validator/brand-validator.js';

//controllers
import {brandAddController} from '../controller/brand-controller.js'

//add the brand
brandRouter.post('', brandAddValidator, brandAddController);

export default brandRouter;