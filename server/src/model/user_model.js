import mongoose from "mongoose";
import {validateEmail,validateGender,validateName,validatePassword} from '../validation/allvalidation.js'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    profileImg: { type: Object, required: false },
    name: { type: String, required: [true, 'Name is required'],
        validate: [validateName, 'Please enter a valid name'],trim: true },
    email: { type: String, required: [true, 'Email is required'],
        validate: [validateEmail, 'Please enter a valid email'],trim: true, unique: true, lowercase: true },
    password: { type: String, required: [true, 'Password is required'],
        validate: [validatePassword, 'Please enter a valid password'],trim: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: [true, 'Gender is required'],
        validate: [validateGender, 'Please enter a valid gender'],trim: true },
    verification: { 
        user: {
            isVerify:{type: Boolean, default: false},
            otpExpireTime:{type: Number, default: null},
            otp:{type:Number, default: null},
            block:{type: Boolean, default: false},
            blockStatus:{type: String, default: null,enum:[]},
            isDelete:{type: Boolean, default: false},
        },
        admin: {
            otp:{type: Number, default: null},
            isVerify:{type: Boolean, default: false},           
        }
    }
})
UserSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10)
})

export default mongoose.model('User', UserSchema)