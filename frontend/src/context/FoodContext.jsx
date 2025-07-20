import React, { useEffect } from 'react'
import  {createContext} from 'react'
import { toast } from 'react-toastify';
import {product} from '../assets/assets'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  axios from 'axios';
import { backendUrl } from '../App';
export const FoodContext = createContext();

const FoodContextProvider = ({children}) =>{

    const delivery_fee=12;
    const currency= "$"

    const[products , setProducts] = useState(product);
    const[cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart= async(itemId) =>{
        const updatedCart = {...cartItems};
        updatedCart[itemId] = (updatedCart[itemId] || 0) +1;
        setCartItems(updatedCart);

        toast.success(`Added to cart`);
   if(token){
    try{
        await axios.post(`${backendUrl}/api/cart/add` , {itemId},{headers :{token}})
    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
}

    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, quantity)=> total + quantity,0);
    }
    const updateQuantity = async(itemId, quantity)=>{
        let cartData = {...cartItems};
        cartData[itemId] = quantity;
        setCartItems(cartData);
    if(token){
    try{
        await axios.post(`${backendUrl}/api/cart/update` , {itemId,quantity},{headers :{token}})
    }catch(error){
        console.log(error)
        toast.error(error.message)
    }
}
    }

    const getCartAmount =() => {
        return Object.entries(cartItems).reduce((totalAmount , [itemId, quantity])=>{
            const itemInfo = products.find((product)=> product._id === itemId)
            return itemInfo ? totalAmount + itemInfo.price * quantity : totalAmount 
        } , 0
    )
    }
 const getProductsData=async()=>{
    try{
    const response=await axios.get(`${backendUrl}/api/product/list`)
    console.log(response.data)

    if(response.data.success){
        setProducts(response.data.products)
    }else{
        toast.error(response.data.message)
    }
    }catch(error){
     console.log('error')
     toast.error(error.message)

    }
 }
 const getUserCart= async(token)=>{
   try{
    const response = await axios.post(`${backendUrl}/api/cart/get`, {},{headers:{token}})
    if(response.data.success){
        setCartItems(response.data.cartData)
    }
   }catch(error){
   console.log('error')
    toast.error(error.message)
   }
 }

 useEffect(()=>{
    getProductsData()
 },[])

 useEffect(()=>{
    if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
        getUserCart(localStorage.getItem('token'))
    }
 },[])
    return (
        <FoodContext.Provider value={{products,setCartItems ,getUserCart,navigate,cartItems , currency,token,setToken, addToCart , delivery_fee , getCartCount , updateQuantity , getCartAmount}} >
            {children}
        </FoodContext.Provider>
    )
}


export default FoodContextProvider