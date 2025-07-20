import React, { useContext , useState } from 'react'
import './Navbar.css'
import { BiCart, BiUser } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { FoodContext } from '../../context/FoodContext'
import { FaCentos } from 'react-icons/fa'

const Navbar = () => {
  const [Loading , setLoading] = useState(false)
  const navigate = useNavigate()
  
  const logout = () =>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken("")
  }
  const handleNavigation = (path) =>{
   setLoading(true);
   setTimeout(()=>{
    setLoading(false)
   },2000)
   navigate(path)
  }
  const {getCartCount,token,setToken} = useContext(FoodContext)

  
  return (
    <div>
      {
        Loading && (
          <div className='loader-container'>
            <div className="loader">
              <FaCentos className="loader-icon"/>
            </div>
            </div>
        )
      }
      <nav className="navbar">
        <div>
          <Link to='/'>
          <h2>DoorStep</h2>
          </Link>
        </div> {/*logo , search , icon*/}

        <div className='search-bar'> 
        <input className='search-input' type='text' placeholder='Search for products....'/>
        <button className='search-btn'>Search</button>
        </div>

        <div className='icons'>
          <div className='profile-group'>
            <BiUser className='icon' />
            <div className='dropdown-menu'>
              <Link className='dropdown-item' to='/login'> Login / Sign Up</Link>
              <Link className='dropdown-item' to='/orders'><p>Orders</p></Link>

              <p onClick={logout}
              className='dropdown-item' >Logout</p>

            </div>
          </div>
          <button className='cart-icon' onClick={()=> handleNavigation('/cart')}>
            <BiCart className='icon'/>
          <span className='cart-qty'>{getCartCount()}</span>
          </button>
          
        </div>
      </nav>
    </div>
  )
}

export default Navbar