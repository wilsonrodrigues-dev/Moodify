const mongoose=require("mongoose")

const blackelistSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required for blacklisting"],

    },

},{timestamps:true})

const blacklistModel=mongoose.model("blacklists",blackelistSchema)


module.exports=blacklistModel
