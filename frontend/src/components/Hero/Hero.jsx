import React from 'react'
import './Hero.css'
import hero_img from '../../assets/pasta2.png'
import { FaShippingFast } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { BiSupport } from 'react-icons/bi'
import { MdPayment } from 'react-icons/md'

const Hero = () => {
  return (
    <div>
        <div className='hero'>
            <div className="hero_top">
                <div className="hero_left">
                    <h2>"Relish every bite of your delightful feast!"</h2>
                    <h1>Discover delicious healthy meal that nourishes you</h1>
                    <p></p>
                    <button>Explore our menu</button>
                </div>
                <div className="hero_right">
                    <img src={hero_img} alt="" className='hero-img'/>
                </div>
            </div>
            <div className="hero_bottom">
                <div className="hero_content"> 
                    <div className="info_icon"><FaShippingFast className='hero_icon'/></div>
                    <div className='detail'>
                        <h3>Free Shipping</h3>
                        <p>Free shipping on order</p>
                    </div>
                </div>
                 <div className="hero_content">
                    <div className="info_icon"><FiSend className='hero_icon'/></div>
                    <div className='detail'>
                        <h3>Worldwide Delivery</h3>
                        <p>We deliver to all countries</p>
                    </div>    
                 </div>
                  <div className="hero_content">
                    <div className="info_icon"><BiSupport className='hero_icon'/></div>
                    <div className='detail'>
                        <h3>24/7 support</h3>
                        <p>Full support on process </p>
                    </div>
                  </div>

                  <div className="hero_content">
                    <div className="info_icon"><MdPayment className='hero_icon'/></div>
                    <div className='detail'>
                        <h3>Secure Payment</h3>
                        <p>Your payment is secure!</p>
                    </div>
                  </div>

            </div>
        </div>
    </div>
  )
}

export default Hero