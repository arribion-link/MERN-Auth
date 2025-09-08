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

// routes
import authRouter from './routes/auth.Route.js';

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// path
app.get('/', (req, res) => {
    res.send('api working')
});

app.use('/api/auth', authRouter);


app.listen(port, () => {
    console.log(`http://loacalhost:${port}`);
})