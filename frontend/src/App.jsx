import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login'
import Checkout from './pages/Checkout/Checkout'
import Order from './pages/Order/Order'
import Footer from './components/Footer/Footer'
import {Routes,Route} from 'react-router-dom'

export const backendUrl ='http://localhost:4000'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route  path='/login' element={<Login/>}/>
        <Route path='/cart' element ={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/orders' element ={<Order/>} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App