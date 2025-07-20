import orderModel from "../models/orderModels.js"
import productModel from '../models/productModels.js'
import userModel from '../models/userModels.js'
import mongoose from "mongoose"
import Stripe from 'stripe'; 
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
const currency ="USD"
const deliveryCharge=12
const placeOrder = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const items = await Promise.all(
      Object.entries(userData.cartData).map(async ([itemId, quantity]) => {
        // ✅ Don't use res.json here — throw error instead
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
          throw new Error(`Invalid product ID: ${itemId}`);
        }

        const product = await productModel.findById(itemId);
        if (!product) {
          throw new Error(`Product not found for ID: ${itemId}`);
        }

        return {
          itemId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
        };
      })
    );

    if (items.length === 0) {
      return res.json({ success: false, message: "No item in cart" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: "false",
      status: "placed",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error(error);

    // Final error response
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};


const placeOrderStripe = async(req,res)=> {
try{
    const { userId, amount , address} =req.body;
    const {origin} = req.headers;
    
    const userData=await userModel.findById(userId)
    if(!userData){
        return res.json({success:false , message:"User not found"})
    }
    const items=  await Promise.all(
        Object.entries(userData.cartData).map(async([itemId, quantity])=>{
            const product = await productModel.findById(itemId);
            
            return{
                itemId, 
                name:product.name, 
                image:product.image,
                price:product.price,
                quantity
            }
            
        })
        )
        if(items.length==0){
            return res.json({success:false, message : "Cart is empty"})
        }
        
        const orderData={
            userId,
            items,
            amount , 
            address,
            paymentMethod:"Stripe",
            status:"processing",
            payment:false,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData);
        await newOrder.save()
        {/** 
        const line_items=[]
        line_items.push({
            price_data:{
                currency:currency,
            product_data: {name : "Delivery charge"},
            unit_amount : deliveryCharge*100
            
            }
            ,
            quantity:1
        })
       */}
      const line_items = [];

// ➤ Add cart items first
items.forEach((item) => {
  line_items.push({
    price_data: {
      currency: currency,
      product_data: {
        name: item.name,
        images: [item.image], // optional
      },
      unit_amount: item.price * 100, // amount in cents
    },
    quantity: item.quantity,
  });
});

// ➤ Add delivery charge as a separate item
line_items.push({
  price_data: {
    currency: currency,
    product_data: {
      name: "Delivery charge",
    },
    unit_amount: deliveryCharge * 100,
  },
  quantity: 1,
});
 
        const session= await stripe.checkout.sessions.create({
          success_url:`${origin}/verify?.success=true&orderId=${newOrder._id}`,
          cancel_url:`${origin}/verify?.success=false&orderId=${newOrder._id}`,
          line_items,
          mode:"payment"
        })

        res.json({success:true , session_url:session.url})
}catch(error){
    console.log(error)
}
}
const verifyStripe=async(req,res)=>{
    const{orderId, success,userId }=req.body;
    try{
        if(success=== "true"){
            await orderModel.findByIdAndUpdate(orderId , {payment:true})
            await userModel.findByIdAndDelete(userId,
            {cartData:{}})
            
            res.json({success:true})
            
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const allOrder =async(req,res)=>{
try{
  const order= await orderModel.find({})
  res.json({success:true , order})
}catch(error){
 console.error(error)
 res.json({success:false , message: 'could not fetch orders'})
}
}


const userOrder = async(req,res)=>{
try{
  const {userId} = req.body
  const orders = await orderModel.find({userId}).sort({date:-1})
  res.json({success:true , orders})
}catch(error){
 console.log(error)
 res.json({success:false , message : 'could not fetch user orders'})
}
}


const updateStatus = async(req,res)=>{
try{
 const {orderId , status} = req.body
 await orderModel.findByIdAndUpdate(orderId , {status})
 res.json({success:true , message :"Order Status Updated"})
}catch(error){
  console.log(error)
 res.json({success:false , message : error.message})
}
}
export  {placeOrder ,verifyStripe, placeOrderStripe , allOrder , userOrder , updateStatus}
