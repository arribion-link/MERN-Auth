import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
const app = express()
const port = process.env.PORT;
if (!port) {
    process.exit(1);
}

import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// routes
import authRouter from './routes/auth.Route.js';
import connectDB from './config/db.js';

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// path
app.get('/', (req, res) => {
    res.send('api working')
});

app.use('/api/auth', authRouter);


const initApp = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`http://loacalhost:${port}`);
    });
}

initApp()