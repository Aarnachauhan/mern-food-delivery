import React from 'react'
import { FoodContext } from '../../../frontend/src/context/FoodContext'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { backendUrl } from '../../../frontend/src/App'
import { useEffect } from 'react'

const Verify = () => {
    const {navigate , token , setCartItems} = useContext(FoodContext)
    const [searchParams , setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async()=>{
        try{
         if(!token){
            return null
         }
         const response = await axios.post(backendUrl + '/api/order/verifyStripe' , 
            {success , orderId } , {headers: {token}});

         if(response.data.success){
            setCartItems({
            })
            navigate('/orders')
            toast.success("Order Placed Successfully")
         }else{
            navigate('/cart')
            toast.error("Order Failed")
         }
         

        }catch(error){
          console.log(error);
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>Verify</div>
  )
}
 
export default Verify
