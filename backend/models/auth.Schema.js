import mongoose from "mongoose";


const authSchema = mongoose.Schema({
    username: {
        type: String,
        required: [
            true, "Please provide the username"
        ],
        uniqiue: false
    },
    email: {
        type: String,
        required: [
            true,
            "Please provide the email"
        ],
        uniqiue: true
    },
    password: {
        type: String,
        required: [
            true,
            "Please provide the password"
        ],
        uniqiue: false
    }
});

export const authModel = mongoose.model('user', authSchema)