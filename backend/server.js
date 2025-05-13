import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './config/mysql.js'; // ✅ Sequelize DB
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

// ✅ Connect to SQL (Sequelize)
   sequelize.sync()
  .then(() => console.log('✅ Connected to SQL Database'))
  .catch(err => console.log('❌ SQL Connection Error:', err));

// ✅ Connect to Cloudinary
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter); 

// ✅ Test route for debugging
app.get('/api/test', (req, res) => {
    res.json({ success: true, message: "API is working!" });
});

// Log every request to /api/order
app.use('/api/order', (req, res, next) => {
    console.log('Hit /api/order endpoint'); // Log for debugging
    next();  // Pass the request to the next middleware
});

// Root route
app.get('/', (req, res) => {
    res.send("API is working!");
});

// 404 fallback for unknown routes
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.originalUrl}`,
        method: req.method
    });
});

// Start server
app.listen(port, () => console.log(`🚀 Server started on port: ${port}`));
