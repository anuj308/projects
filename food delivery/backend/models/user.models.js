import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,required:true
    }
    ,email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },cartData:{
        type:Object,
        default:{}
    }
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)
// in left if model is created it will be used and in right if model is not there it will create the model

export default userModel;