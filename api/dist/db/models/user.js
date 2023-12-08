import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    upi: String,
    studentId: String,
});
export const User = model('User', userSchema);
