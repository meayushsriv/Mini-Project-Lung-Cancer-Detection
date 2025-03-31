import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, login, payOnline, registerUser, updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post("/register", registerUser);
userRouter.post("/login", login);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update", upload.single('image'), authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment)
userRouter.post('/cancel', authUser, cancelAppointment);
userRouter.post("/pay-online",authUser,payOnline);


export default userRouter;