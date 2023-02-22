import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { NextMiddleware } from "next/server";
import users from "./database/models/users";

export const generateAuthToken = (user: any) => {
    const data = {
        username: user.username,
        userId: user._id,
        rol: user.rol,
    }

    const token = jwt.sign(data, process.env.TOKEN_SECRET_KEY || '', { expiresIn: '15 days' });
    return token;
}

// export const checkAuth = async (req: NextRequest) => {
//     const { cookies } = req;

//     const token = req.get('auth-token');

    
//     if (!token) return res.status(401).json({ msg: 'error', data: 'Unatuhorized' });

//     try {
//         const decode: any = jwt.verify(token, config.TOKEN_SECRET_KEY || ' ');
//         const user = await UserModel.findById(decode.userId);
//         if (!user) return res.status(400).json({ msg: 'error', data: 'Unauthorized' })

//         next()
//     }
//     catch (err) {
//         return res.status(500).json({ msg: 'error', data: 'can´t verify the token' })
//     }
// }