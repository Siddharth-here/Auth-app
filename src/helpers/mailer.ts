import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 3600000),
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
            });
        }

        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
            port: Number(process.env.SMTP_PORT) || 2525,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const domain = process.env.DOMAIN || 'http://localhost:3000';
        const actionText = emailType === "VERIFY" ? "verify your email" : "reset your password";
        const verificationUrl = `${domain}/verifyemail?token=${encodeURIComponent(hashedToken)}`;

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'siddharthmohapatra2004@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <p>Click <a href="${verificationUrl}">here</a> to ${actionText}.</p>
                <p>Or copy and paste the link below into your browser:</p>
                <p>${verificationUrl}</p>
            `,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};