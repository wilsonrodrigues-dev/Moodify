const express=require("express")
const cookieparser=require("cookie-parser")
const app=express()
const cors=require("cors")
const authrouter=require("./routes/auth.routes")
const songRouter=require("./routes/song.routes")

app.use(cookieparser())

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authrouter)
app.use("/api/songs",songRouter)


module.exports=app