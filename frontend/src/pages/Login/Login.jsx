import React, { useState, useContext ,  useEffect } from 'react'
import './Login.css'
import { backendUrl } from '../../App'
import { FoodContext } from '../../context/FoodContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
const Login = () => {
  const [currentState , setCurrentState] = useState('Login')
  const {token,setToken , navigate} = useContext(FoodContext)
  const [name,setName] = useState('')
  const [email , setEmail] = useState('')
  const [password, setPassword] = useState('')

 

  const onSubmitHandler = async(event) =>{
    event.preventDefault()

    try{
     if(currentState=== 'Sign Up'){
      console.log("REGISTER PAYLOAD", { name, email, password });
      const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
      if(response.data.success){
        setToken(response.data.token)
        toast.success(response.data.message)
        localStorage.setItem('token', response.data.token)
      }
      else{
        toast.error(response.data.message)
      }
     }else{
      const response = await axios.post(backendUrl + '/api/user/login' , {email,password})
      if(response.data.success){
        setToken(response.data.token)
        toast.success(response.data.message)
        localStorage.setItem('token', response.data.token)
      }
      else{
        toast.error(response.data.message)
      }
     }
     
    }catch(error){
       
      console.log(error)
      toast.error(error.message)
    }
  }
  
   useEffect(()=>{
      if(token){
        navigate('/')
      }
     },[token])
  return (
    <div>
      <form onSubmit={onSubmitHandler}  className="auth-form">
        <div className="form-header">
          <p className="form-title">{currentState}</p>
        </div>
       {
        currentState === 'Login' ? null :(
           <input type="text"  onChange={(e)=>setName(e.target.value)} value={name}
           className='form-input' placeholder='Full Name' required/>
        )
       }
        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}
        className='form-input' placeholder='Email' required />
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}
         className='form-input' placeholder='Password' required />
        <div className='form-footer'>
          <p className='fgt-password'>Forget Password?</p>
      {
        currentState ==='Login' ? (<p className='toggle-auth-state' onClick={()=>setCurrentState('Sign Up')}
        >Create Account</p>) : (<p onClick={()=>setCurrentState('Login')} className='toggle-auth-state'>Login Here</p>)
      }
     
        </div>
        <button className='form-button'>
       {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login