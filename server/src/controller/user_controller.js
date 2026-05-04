import user_model from '../model/user_model.js'
import { sendOtpEmail } from '../mail/userOtp.js'
import { error } from '../error/error.js'
import crypto from 'crypto'

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

    }
    catch (err) { error(err.message) }
}

export const loh_in = async (req, res) => {
    try {

    }
    catch (err) { error(err.message) }
}