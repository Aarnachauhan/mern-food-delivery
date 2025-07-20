import express from 'express'
import { addToCart, updateCart , getUserCart} from '../controllers/CartControllers.js'
import authUser from '../middleware/auth.js'
import userModel from '../models/userModels.js'
const cartRouter = express.Router()

cartRouter.post('/add' , authUser, addToCart)
cartRouter.post('/get',authUser, getUserCart)
cartRouter.post('/update',authUser, updateCart)

export default cartRouter