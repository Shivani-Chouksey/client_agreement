import mongoose from "mongoose";


const brandInfoModel=new mongoose.Schema({
name: {
    type:String,
    trim:true,
},
number:{
    type:Number,
    trim:true,
}
,
email:{
    type:String,
    trim:true,
},
companyName:{
    type:String,
    trim:true,
    
},
signature:{
    type:String,
    trim:true,
    
},
address:{
    type:String,
    trim:true,
}

},{
    timestamps: true
})

const Brandinformation=  mongoose.models.brandinfo ||  mongoose.model("brandinfo",brandInfoModel)
export default Brandinformation