import mongoose from "mongoose";


const agreeMentSchema = new mongoose.Schema({
    adminData: {
        agreementName:{
            type: String,
            trim: true,
        
        },
        name: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        email:{
            type: String,
            trim: true 
        },
        number:{
            type: Number,
            trim: true 
        },
        companyName:{
            type: String,
            trim: true 
        },
        signature:{
            type: String,
            trim: true 
        },
        date:{
            type:Date,
            trim: true 
        },
        address:{
            type: String,
            trim: true 
        },
        clientName:{
            type: String,
            trim: true 
        },
        location:{
            latitude:{
                type: String,
                trim: true 
            },
            longitude:{
                type: String,
                trim: true 
            }
        },
        ip:{
            type: String,
            trim: true 
        }
       
    },
    clientData: {
        name: {
            type: String,
            trim: true
        },
        email:{
            type: String,
            trim: true 
        },
        number:{
            type: Number,
            trim: true 
        },
        companyName:{
            type: String,
            trim: true 
        },
        signature:{
            type: String,
            trim: true 
        },
        address:{
            type: String,
            trim: true 
        },
        location:{
            latitude:{
                type: String,
                trim: true 
            },
            longitude:{
                type: String,
                trim: true 
            }
        },
        ip:{
            type: String,
            trim: true 
        }

    },
}, {
    timestamps: true
})

const Agreement = mongoose.models.agreement || mongoose.model("agreement", agreeMentSchema)
export default Agreement;