import express from 'express'
import { register, verify_otp, log_in, resend_otp } from '../controller/user_controller.js'

const route = express.Router()


route.post('/user/register', register)
route.post('/user/verify_otp', verify_otp)
route.post('/user/resend_otp', resend_otp)
route.post('/user/log_in', log_in)



export default route