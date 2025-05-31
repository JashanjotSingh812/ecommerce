import express from 'express'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, allOrders, userOrders, verifyStripe, verifyRazorPay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin features
orderRouter.post('/list',allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// User features
orderRouter.post('/userorders', authUser, userOrders)

// 
orderRouter.use((req, res, next) => {
  console.log(`📦 orderRouter hit at ${req.method} ${req.originalUrl}`);
  next();
});

orderRouter.post('/verifyStripe', authUser, (req, res, next) => {
  console.log('✅ verifyStripe route hit');
  next(); // Let it move to the controller
});

orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorPay)

export default orderRouter;