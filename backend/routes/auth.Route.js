import express from 'express';
const authRouter = express.Router();

// controller
import authController from '../controllers/auth.Controller.js';

authRouter
    .post('/register', authController.register)
    .post('/login', authController.login)

export default authRouter;