import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import { AnyARecord } from 'node:dns';

export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {
        //create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10,)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "434d64a7581e9e",
                pass: "****cc7e"
            }
        });
        const mailOptions = {
            from: 'siddharthmohapatra2004@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email " : "Reset your password",
            html: `<p> Click <a href=${process.env.domain}/ verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.domain}/verifyemail?token=${hashedToken}
            
            </p>`
        }
        const mailResponse = await transport.sendMail(mailOptions)
        return mailOptions

    } catch (error: any) {
        throw new Error(error.message)
    }

}