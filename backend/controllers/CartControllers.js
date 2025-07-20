
import userModel from '../models/userModels.js'
{/** 
const addToCart = async(req,res)=>{
 try{
    const {userId , itemId} = req.body
    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    if(!userData){
        return res.json({success: false , message : 'user not found '})
    } 
    if(cartData[itemId]){ //if item already exists in the cart
        cartData[itemId].quantity +=1
    }else {
        cartData[itemId] +=1 //doesnt exist , add 
    }
    await userModel.findByIdAndUpdate(userId, {cartData});
    res.json({success: true , message : 'Product added to cart '})
}catch(error){
    console.log(error);
    res.json({success : false , message : error.message})
}
}
*/}
import mongoose from 'mongoose'

const addToCart = async(req,res)=>{
  try {
    const { userId, itemId } = req.body;

    // ✅ Validate itemId
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID',
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData;

    if (cartData[itemId]) {
      // ✅ if already in cart, just increase
      cartData[itemId] += 1;
    } else {
      // ✅ add with initial quantity = 1
      cartData[itemId] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: 'Product added to cart' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async(req,res)=>{
  try{
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
  return res.status(400).json({
    success: false,
    message: 'Invalid product ID',
  });
}

        const {userId,itemId , quantity} =req.body
        const userData=await userModel.findById(userId);
        let cartData = await userData.cartData
        cartData[itemId]= quantity
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true , message : 'Cart updated'})
    }catch(error){
         console.log(error);
    res.json({success : false , message : error.message})
    }
}
const getUserCart= async(req,res)=>{
  try{
        const {userId}=req.body
        const userData=await userModel.findById(userId);
        if(!userData){
            return res.json({success:false ,message:'user not found' })
        }
        const cartData=userData.cartData
        res.json({success:true ,cartData})
        
       
    }catch(error){
        console.log(error);
    res.json({success : false , message : error.message})
    }
}
export { addToCart, updateCart , getUserCart}