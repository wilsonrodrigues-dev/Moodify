const Redis=require("ioredis").default


const redis=new Redis({
    host:process.env.REDIES_HOST,
    port:process.env.REDIES_PORT,
    password:process.env.REDIES_PASSWORD
})

redis.on("connect",()=>{
    console.log("server is connected to redis")
})

module.exports=redis