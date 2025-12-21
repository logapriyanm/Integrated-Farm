import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['user', 'admin',], // Add more roles as needed
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    cartData: {
        type: Object, 
        default: {}
    }
}, { minimize: false, timestamps: true });

const UserModel = mongoose.models.user || mongoose.model('User', userSchema);

export default UserModel;