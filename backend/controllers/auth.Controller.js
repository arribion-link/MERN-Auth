import { authModel } from "../models/auth.Schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    process.exit(1);
}

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const userExist = await authModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({
              message: "The user you're registering already exists",
            });
        }
 
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAuthData = {
            username,
            email,
            password:hashedPassword
        }

        const newUser = new authModel(newAuthData);
        await newUser.save();

        const payload = {
            email,
            user: newUser._id
        }

        const jwtExpiry = {
            expiresIn: "1h"
        }

        const jwtToken =  await jwt.sign(payload , JWT_SECRET,jwtExpiry)

        res.status(201).json({
            jwtToken,
            success: true,
            message: "New user registered successfully"
        });
       
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "something went wrong registering the user",
        });
   }
}


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
            message: "all fields are required",
            });
        }
    } catch {
        res.status(500).json({
            message: "something went wrong logging in the user"
        });
    }
};

export default {
    register,
    login
}