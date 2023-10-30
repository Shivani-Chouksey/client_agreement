import mongoose from "mongoose";


const clientSchema=new mongoose.Schema({
name: {
    type:String,
    trim:true,
    required:true
},
number:{
    type:Number,
    trim:true,
    required:true

},
email:{
    type:String,
    trim:true,
    required:true
},
companyName:{
    type:String,
    trim:true,
    required:true
},
signature:{
    type:String,
    trim:true,
    required:true
}

},{
    timestamps: true
})

const Client=  mongoose.models.client ||  mongoose.model("client",clientSchema)
export default Client