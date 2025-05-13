// import { currency } from "../../admin/src/App.jsx";
import Order from "../models/orderModel.js"; // Import the Order model
import User from "../models/userModel.js"; // Import the User model
import Stripe from "stripe";

// Stripe setup
const currency = 'inr';
const deliveryCharge = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place an order function
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        console.log("🛒 Incoming items:", items);  // Log the incoming order items
        console.log("User ID:", userId);  // Log the user ID

        // Ensure user is authenticated
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create the order data object
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD", // Default payment method
            payment: false, // Payment not completed yet
            date: new Date(), // Current date
        };

        // Create a new order in the database
        const newOrder = await Order.create(orderData);
        console.log("New Order Created:", newOrder);  // Log the newly created order

        // Optionally, clear the user's cart data after placing the order
        await User.update({ cartData: {} }, { where: { id: userId } });
        console.log(`User's cart data cleared for user ${userId}`);  // Log cart data cleared

        res.json({ success: true, message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.log("Error placing order:", error);  // Log any errors
        res.json({ success: false, message: error.message });
    }
};

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        // Ensure user is authenticated
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Create the order data object
        const orderData = {
            userId,
            items: JSON.stringify(items), // Storing items as JSON string in SQL
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false, // Payment not completed yet
            date: new Date(), // Current date
        };

        // Create a new order in the database
        const newOrder = await Order.create(orderData);

        // Prepare line items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency, // Assuming USD, adjust as needed
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100), // Stripe needs amount in cents
            },
            quantity: item.quantity,
        }));

        // Adding Delivery Charges separately
        line_items.push({
            price_data: {
                currency: currency, // Assuming USD
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharge*100, // Example delivery charge in cents
            },
            quantity: 1,
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder.id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder.id}`,
            line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await Order.findAll(); // Get all orders
        console.log("All Orders fetched:", orders); // Log all fetched orders
        res.json({ success: true, orders });
    } catch (error) {
        console.log("Error fetching orders:", error); // Log any errors
        res.json({ success: false, message: error.message });
    }
};

// User order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.findAll({ where: { userId } }); // Get orders for a specific user
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Update the order status
        const updatedOrder = await Order.update({ status }, { where: { id: orderId } });

        if (updatedOrder[0] === 0) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Placing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {
    // Implementation for Razorpay payment can go here
};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, updateStatus, userOrders };



// import orderModel from "../models/orderModel.js"
// import userModel from "../models/userModel.js"

// const placeOrder = async (req, res) => {
//     try {
//         const { userId, items, amount, address} = req.body
//         const orderData = {
//             userId,
//             items,
//             amount,
//             paymentMethod: "COD",
//             payment: false,
//             date: Date.now()
//         }
//         const newOrder = new orderModel(orderData)
//         await newOrder.save()

//         await userModel.findByIdAndUpdate(userId, {cartData: {}})

//         res.json({success: true, message: "Order Placed"})
//     }
//     catch (error){
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// // Placing orders using stripe method
// const placeOrderStripe = async (req, res) => {

// }

// // Placing orders using Razorpay method
// const placeOrderRazorpay = async (req, res) => {

// }

// // All orders data for admin panel
// const allOrders = async (req, res) => {
//     try{
//         const orders = await orderModel.find({})
//         res.json({success: true, orders})
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// // User order data for frontend
// const userOrders = async (req, res) => {
//     try{
//         const {userId} = req.body
//         const orders = await orderModel.find({userId})
//         res.json({success: true, orders})
//     }
//     catch (error){
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// // Update order status
// const updateStatus = async (req, res) => {
//     try{
//         const {orderId, status} = req.body
//         await orderModel.findByIdAndUpdate(orderId, {status})
//         res.json({success: true, message: "Order Status Updated"})
//     }
//     catch (error){
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// export {placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, updateStatus, userOrders}

