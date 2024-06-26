import userModel from "../models/user.models.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user

const loginUser = async (req,res)=>{
    const {email,password}= req.body

    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false,message:"User Doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id);

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        re.json({success:false,message:"Error"})
    }
}   


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user

const registerUser = async (req,res)=>{
    const {name,email,password} = req.body

    try {// checking user already exixts
        const exist = await userModel.findOne({email});
        if (exist) {
            return res.json({success:false,message:"User already exists"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            res.json({success:false,message:"Please enter a strong password"})
        }

        // hasing user password

        const salt = await bcrypt.genSalt(10)// number is between 0 to 15 the higher the number strongest the password
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,email:email,password:hashedPassword 
        })

        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error);

        res.json({success:false,message:"Error"})        
    }
}


export {loginUser,registerUser}