import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: process.env.User_name,
        pass: process.env.User_password,
    },
});


export const sendOtpEmail = async (email, name, otp) => {
    try {
        const info = await transporter.sendMail({
            from: 'gangusmohit8@gmail.com',
            to: email,
            subject: "Hello",
            text: "Hello world?",
            html: `<b>Hello world? ${name}  ${otp}</b>`
        })
    }

    catch (err) { console.log(err.message); }

}