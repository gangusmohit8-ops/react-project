import user_model from '../model/user_model.js'
import { sendOtpEmail } from '../mail/userOtp.js'
import { error } from '../error/error.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const data = req.body

        const { name, email, password, gender } = data
        const randomOtp = crypto.randomInt(1000, 9999)
        const expirtTime = new Date.now() + 1000 * 60 * 5


        const checkUser = await user_model.findOneAndUpdate(
            { email: email },
            { $set: { "verification.user.otp": randomOtp, "verification.user.otpExpireTime": expirtTime } },
            // { new: true }
        );

        if (checkUser) return res.status(200).send({ status: true, msg: "resent Otp Send" })

        const DBData = {
            name, email, password, gender, verification: { user: { otp: randomOtp, otpExpireTime: expirtTime } }
        }

        const DB = await user_model.create(data)
        sendOtpEmail(email, name, randomOtp)
        res.status(200).send({ status: true, sucess: true, message: "User Created Successfully", data: DB })
    }
    catch (err) { error(err.message) }
}

export const verify_otp = async (req, res) => {
    try {
        const {id}=req.params
        const {userotp}=req.body

        if (!userotp) return res.status(404).send({ status: false, msg: 'pls provide otp' })
            
        const checkUser = await user_model.findById(id)
        if (!checkUser) return res.status(404).send({ status: false, msg: "user not found" })

        const { otp, otpExpireTime } = checkUser.verification.user

        if (!(Date.now() <= otpExpireTime)) return res.status(400).send({ status: false, msg: "otp Expire" })

        if (otp != userotp) return res.status(400).send({ status: false, msg: "wrong otp" })

        await user_model.findByIdAndUpdate(id, { $set: { 'verification.user.isVerify': true } })

        res.status(200).send({ status: true, msg: 'Otp Verify Sucessfully' })

    }
    catch (err) { error(err.message) }
}

export const resend_otp = async (req, res) => {
    try {
        const { id } = req.params

        const expirtTime = Date.now() + 1000 * 60 * 5
        const randomOtp = crypto.randomInt(1000, 9999)

        const updatedOtp = await user_model.findOneAndUpdate({ _id: id, 'verification.user.isVerify': false },
            { $set: { 'verification.user.otp': randomOtp, 'verification.user.otpExpireTime': expirtTime } }
        )
        if (!updatedOtp) return res.status(404).send({ status: false, msg: 'user not found' })
        user_resend_otp(updatedOtp.email, updatedOtp.name, randomOtp)
        res.status(200).send({ status: true, msg: 'resend otp send' })
    }
    catch (err) { error(err.message) }
}

export const log_in = async (req, res) => {
    try {
        const {email, password}=req.body

        const checkUser= await user_model.findOne({email:email})
        if(!checkUser) return res.status(404).send({status:false, msg:'user not found'})
        
        if (checkUser){
            const {isVerify, isDelete, block}=checkUser.verification.user
            if(!isVerify) return res.status(404).send({status:false, msg:'pls verify otp'})
            if(isDelete) return res.status(404).send({status:false, msg:'Account is Delete'})
            if(block) return res.status(404).send({status:false, msg:'your Account is block by Admin'})
        }
        const checkPass = await bcrypt.compare(password, checkUser.password)
        if(!checkPass) return res.status(404).send({status:false, msg:'wrong password'})
            const token= jwt.sign({id:checkUser._id}, process.env.SECRET_KEY, {expiresIn:'1d'})
        res.status(200).send({status:true, msg:'login successfully'})
    }
    catch (err) { error(err.message) }
}