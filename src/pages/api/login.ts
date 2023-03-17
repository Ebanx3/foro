import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/database/models/users";
import { generateAuthToken } from "@/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method != 'POST') return res.status(404).json({ sucess: false, message: 'Undefined path' })

        const { username, password } = req.body;

        if (!username || !password) return res.status(400).json({ success: false, message: 'Must have a body with username and password fields' })

        const user = await UserModel.findOne({ username });

        if (!user) return res.status(400).json({ success: false, message: 'Invalid username' })

        const isTheSamePass = await user.isValidPassword(password);
        if (!isTheSamePass) return res.status(400).json({ success: false, message: 'Invaild password' })

        const token = generateAuthToken(user);

        return res.status(200).setHeader('Set-Cookie', token).json({ sucess: true, message: 'ok', user: { username: user.username, userId: user._id, rol: user.rol, urlAvatar: user.urlAvatar } })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Error trying to login' })
    }


}