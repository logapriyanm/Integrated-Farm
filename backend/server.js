import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import adminRouter from "./routes/adminRoutes.js";

const app = express();
const port = process.env.PORT || 4000

connectDB();
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))

// Public routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

// Protected routes (require authentication)
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

// Admin routes (require admin role)
app.use("/api/admin", adminRouter);

// Test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Integrated Farm API is working!',
        version: '1.0.0',
        features: ['Role-based Authentication', 'Real-time Updates']
    });
});

// Start server
app.listen(port, () => {
    console.log("🔥 REAL BACKEND SERVER IS RUNNING FROM HERE");

    console.log(`✅ Server is running on port ${port}`);
    console.log(`🔗 http://localhost:${port}`);
});