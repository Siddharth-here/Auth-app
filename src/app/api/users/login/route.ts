import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'


connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log('Request Body:', reqBody)

        // Check if the user exists
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 })
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 400 })
        }

        //Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create a token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: 'Login successful',
            success: true,

        })
        response.cookies.set('token', token, {
            httpOnly: true,
        })
        return response


    } catch (error) {
        console.error("Login failed", error);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}