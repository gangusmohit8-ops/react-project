import user_model from '../model/user_model.js'
import { validateEmail, validateName, validatePassword } from '../validation/allvalidation.js'
import { sendOtpEmail } from '../mail/userOtp.js'

export const register = async (req, res) => {
    try {
        const data = req.body

        const { name, email, password, gender } = data
        if (!email) return res.status(400).send({ status: false, sucess: false, message: "Email is Required" })
        if (!validateEmail(email)) return res.status(400).send({ status: false, sucess: false, message: "Invalid Email Format" })

        const checkUser = await user_model.findOne({ email: email })
        
        if (checkUser) return res.status(400).send({ status: false, sucess: false, message: "User Already Present" })


        if (!name) return res.status(400).send({ status: false, sucess: false, message: "Name is Required" })
        if (!validateName(name)) return res.status(400).send({ status: false, sucess: false, message: "Name should only contain letters and spaces" })


        if (!password) return res.status(400).send({ status: false, sucess: false, message: "Password is Required" })
        if (!validatePassword(password)) return res.status(400).send({ status: false, sucess: false, message: "Password should contain at least 8 characters, including one letter and one number" })

        sendOtpEmail(email, name, 5678)

        const DB = await user_model.create(data)
        res.status(200).send({ status: true, sucess: true, message: "User Created Successfully", data: DB })
    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }); }
}

export const verify_otp = async (req, res) => {
    try {

    }
    catch (err) { console.log(err.message); }
}

export const loh_in = async (req, res) => {
    try {

    }
    catch (err) { console.log(err.message); }
}