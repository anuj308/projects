import express from "express"
import cors from "cors"
import  connectDB  from "./config/db.js"
import 'dotenv/config'

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())//the request will be parsed in json
app.use(cors())

// db connection
connectDB()


import foodRouter from "./routes/food.routes.js"
import userRouter from "./routes/user.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"
// api endpoints

app.use("/api/food",foodRouter);
app.use("/api/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Workking")
})


app.listen(port,()=>{
    console.log(`server is runing at port http://localhost:${port}`)
})