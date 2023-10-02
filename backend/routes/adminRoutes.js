import express from "express";
import { 
    authAdmin,
    logoutAdmin,
    getAllUsers,
    updateUser,
    deleteUser,getUserProfile } from "../controllers/adminController.js";





const router = express.Router();


router.post('/login',authAdmin)
router.post('/logout',logoutAdmin)
router.get('/adminHome',getAllUsers)
router.post('/delete-user',deleteUser)
router.put('/update-user',updateUser)
router.get('/user-profile/:userId', getUserProfile);




export default router;



