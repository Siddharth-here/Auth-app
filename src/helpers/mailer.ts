import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // 1. Create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        // 2. Update user document based on email type
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, // 1 hour
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        // 3. Configure Nodemailer transporter using environment variables
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
        const verificationUrl = `${domain}/verifyemail?token=${hashedToken}`;

        // 4. Define mail options with fixed HTML template syntax
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

        // 5. Send email
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
};