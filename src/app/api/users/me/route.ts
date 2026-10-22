import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest) {
    try {

        const userId = await getDataFromToken(request);
        const user = await User.findById({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User data fetched successfully",
            data: user
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message || "An error occurred while fetching user data" }, { status: 400 });
    }
}