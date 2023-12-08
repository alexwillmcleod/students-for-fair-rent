import express from 'express';
import { config } from 'dotenv';
import { connect } from 'mongoose';
import { User } from './db/models/user';
// Get environment variables from .env
config();
const app = express();
// Connect to mongodb database
const databaseUrl = process.env.DATABASE_URL;
await connect(databaseUrl);
app.get('/', async (req, res) => {
    return res.status(200).send('Hello, from SFR!');
});
const Doy = await new User({
    firstName: 'Doy',
    lastName: 'Stoy',
    emailAddress: 'doy@gmail.com',
    upi: 'dsto145',
    studentId: '507036952',
}).save();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
