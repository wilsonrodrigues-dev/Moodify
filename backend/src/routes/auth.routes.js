const {Router}=require("express")
const usercontroller=require("../controllers/auth.controllers")
const authMiddleware=require("../middleware/auth.middleware")
const router=Router()



router.post("/rigister",usercontroller.register)
router.post("/login",usercontroller.login)

router.get("/get-me",authMiddleware.authUser,usercontroller.getMe)
router.post("/logout",authMiddleware.authUser,usercontroller.logoutUser)
module.exports=router