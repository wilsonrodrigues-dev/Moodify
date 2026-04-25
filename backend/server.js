require("dotenv").config()
const app=require("./src/app")
const connectDB=require("./src/config/databse")


connectDB()
app.listen(3000,()=>{
    console.log("running on 3000")
})
