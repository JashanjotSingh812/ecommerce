
import User from "../models/userModel.js";  // Import the User model

// Add products to the user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        
        // Find the user by ID using Sequelize's findByPk (primary key)
        const user = await User.findByPk(userId); 
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {}; // Get existing cart data, or an empty object if not available

        // Check if the item already exists in the cart
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;  // Increment quantity if item exists with the same size
            } else {
                cartData[itemId][size] = 1;  // Add size with quantity 1 if not found
            }
        } else {
            cartData[itemId] = { [size]: 1 }; // Add new item and size with quantity 1
        }

        // Update the user's cartData
        user.cartData = cartData;
        await user.save(); // Save the updated user object with cart data

        res.json({ success: true, message: "Product added to cart successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update the user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Find the user by ID using Sequelize's findByPk (primary key)
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData || {}; // Get existing cart data, or an empty object if not available

        // Check if the item exists in the cart and update its quantity
        if (cartData[itemId] && cartData[itemId][size]) {
            cartData[itemId][size] = quantity; // Update the quantity of the specific item and size
            user.cartData = cartData;
            await user.save();  // Save the updated cart data

            res.json({ success: true, message: "Cart updated successfully" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get the user's cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user by ID using Sequelize's findByPk (primary key)
        const user = await User.findByPk(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = user.cartData || {}; // Get existing cart data, or an empty object if not available
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };




// import userModel from "../models/userModel.js";


// // add products to user cart
// const addToCart = async (req, res) => {
//     try{
//         const { userId, itemId, size } = req.body;
//         const userData = await userModel.findById(userId);
//         let cartData = await userData.cartData;
//         if(cartData[itemId]){
//             if(cartData[itemId][size]){
//                 cartData[itemId][size] += 1;
//             }
//             else{
//                 cartData[itemId][size] = 1;
//             }
//         }
//         else{
//             cartData[itemId] = {};
//             cartData[itemId][size] = 1;
//         }
//         await userModel.findByIdAndUpdate(userId, {cartData})
//         res.json({success: true, message: "Product added to cart successfully"});
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message});
//     }
// }


// // update user cart
// const updateCart = async (req, res) => {
//     try{
//         const { userId, itemId, size, quantity } = req.body
//         const userData = await userModel.findById(userId);
//         let cartData = await userData.cartData;

//         cartData[itemId][size] = quantity
//         await userModel.findByIdAndUpdate(userId, {cartData})
//         res.json({success: true, message: "Cart updated successfully"});
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message});
//     }
// }

// // get user cart
// const getUserCart = async (req, res) => {
//     try{
//         const { userId } = req.body;
//         const userData = await userModel.findById(userId);
//         let cartData = await userData.cartData;
//         res.json({success: true, message: cartData});
//     }
//     catch(error){
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }

// export { addToCart, updateCart, getUserCart }



