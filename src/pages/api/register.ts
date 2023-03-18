import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/database/models/users";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method != 'POST') return res.status(404).json({ sucess: false, message: 'Undefined path' })

        const { username, password, email } = req.body;

        if (!username || !password || !email) return res.status(400).json({ success: false, message: 'Must have username, password and email fields' })

        const query = { $or: [{ username: username }, { email: email }] };

        const user = await UserModel.findOne(query);

        if (user) return res.status(400).json({ success: false, message: 'username or email already in use' });

        const userData = { username, email, password };

        await UserModel.create(userData);

        return res.status(200).json({ success: true, message: 'ok' })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Error trying to register', error })
    }


}