import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {email, password} = await request.json();
    await connectMongo();
    try {
        const user = await User.findOne({email});
        // Verificação de Usuario e Senha
        if (user && (await user.comparePassword(password))) {
            const token = jwt.sign({userId: user._id}, 
                process.env.JWY_SECRET, { expiresIn: '1h'});
                return NextResponse.json({ token });
        } else {
            return NextResponse.json({succes:false}, {status:400});
        }
    } catch (error) {
        return NextResponse.json({succes:false}, {status:400});
    }
}