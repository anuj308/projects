import foodModel from "../models/food.models.js";
import fs from "fs"


// add food item

const addFood = async(req,res)=>{
    
    try {
    let image_filename = `${req.file.filename}`;
    
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
        await food.save()
        res.json({success:true,message:"Food added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// add food list

const list_food = async(req,res)=>{
    try {
        const food = await foodModel.find({})
        res.json({success:true,data:food})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

// remove food item

const remove_food = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

export {addFood,list_food,remove_food}