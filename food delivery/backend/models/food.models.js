import mongoose from "mongoose";


const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },image:{
        type:String,
        require:true
    },
    category: {
        type:String,
        require:true
    }
},{timestamps:true})

const foodModel =  mongoose.models.foodModel || mongoose.model("foodModel",foodSchema)

export default foodModel;