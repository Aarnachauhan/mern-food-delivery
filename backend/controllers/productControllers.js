
import productModel from "../models/productModels.js";
import {v2 as cloudinary} from "cloudinary"

const addProduct= async(req,res)=>{
    try{
        const {name,price,description,category}=req.body;
        const image=req.file;
    //   let imageUrl="";
    //  if(image){
    //    let result=await cloudinary.uploader.upload(image.path,{resource_type:"image"})
     //    imageUrl=result.secure_url
     //   }
        
        
    //   else{
   //imageUrl="https://via.placeholder.com/150"
//}
      
       if(!image){
            return res.json({success:false,message:"Please upload an image"})
       }
        let result=await cloudinary.uploader.upload(image.path,{resource_type:"image"})
        const productData={
            name,description,category,price:Number(price),
           // image:imageUrl,
           image:result.secure_url,
            date:Date.now()

        }
        console.log(productData)
        const product=new productModel(productData) 
        await product.save();
        res.json({success:true,message:"product added successfully"})
        
    }catch(error){
        console.log(error);
        res.json({success:false,message:"could not add product"})
        
    }
}

const listProduct=async(req,res)=>{
    try{
        const products=await productModel.find({})
        res.json({success:true,products})
        
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

const removeProduct=async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body._id)
        res.json({success:true,message:"Product removed"})
        
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}
const singleProduct= async(req,res)=>{
    try{
        const {productId}=req.body;
        const product=await productModel.findById(productId)
        res.json({success:true,product})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export {addProduct,removeProduct,singleProduct,listProduct}