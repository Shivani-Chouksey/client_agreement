import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
    },
    token: {
        type: String,
        trim: true,
    }
})


const Admin = mongoose.models.admin || mongoose.model('admin', adminSchema);
export default Admin;