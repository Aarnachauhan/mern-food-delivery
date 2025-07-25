import React from 'react'
import './Sidebar.css'
import { IoIosLogOut, IoMdAddCircleOutline } from 'react-icons/io'
import { MdAddShoppingCart, MdFormatListBulletedAdd } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
const Sidebar = ({setToken}) => {
  return (
    <div className='sidebar-container'>
      <div className="sidebar-header">
         <h2>DoorStep</h2>
      </div>
      <div className="sidebar-links">
        <NavLink className="sidebar-link" to='/add'>
          <IoMdAddCircleOutline className="sidebar-icon"/>
          <p className="sidebar-text">
            Add Product
          </p>
        </NavLink>

        <NavLink className="sidebar-link" to='/list'>
          <MdFormatListBulletedAdd className='sidebar-icon'/>
          <p className="sidebar-text">List Product</p>
        </NavLink>
        <NavLink className="sidebar-link" to='/orders'>
          <MdAddShoppingCart className='sidebar-icon'/>
          <p className="sidebar-text">Orders</p>
        </NavLink>
        <button  onClick={()=>setToken("")}
        className="sidebar-link">
          <IoIosLogOut className='sidebar-icon'/>
          <p className="sidebar-text">LogOut</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar