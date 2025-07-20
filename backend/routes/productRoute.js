import express from "express"

import{addProduct,removeProduct,singleProduct,listProduct} from '../controllers/productControllers.js'
import adminAuth from "../middleware/adminAuth.js";
const productRouter=express.Router();
import upload from "../middleware/multer.js";

//productRouter.post('/add',upload.single("image"),addProduct)
productRouter.post('/add',upload.single("image"),adminAuth,addProduct)
productRouter.get('/list',listProduct)
//productRouter.post('/remove',removeProduct)
productRouter.post('/remove',adminAuth,removeProduct)

productRouter.get('/single/:id',singleProduct)

export default productRouter
