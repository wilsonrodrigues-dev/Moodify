const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username required"],
        unique:[true,"username must be unique"]
    },
    email:{
        type:String,
        required:[true,"email required"],
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        required:[true,"password required"],
        select:false
    }
})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel