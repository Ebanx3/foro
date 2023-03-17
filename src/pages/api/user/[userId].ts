import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '@/database/models/users'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET': {
            try {
                const { userId } = req.query;
                if (!userId) return res.status(404).json({ success: false, message: 'Body must have userId' });
                const user = await UserModel.findById(userId)
                const formatedUser = {
                    username: user.username,
                    rol: user.rol,
                    urlAvatar: user.urlAvatar,
                    id: user._id
                }
                return res.status(200).json({ success: true, formatedUser })
            }
            catch (err) {
                console.log(err)
            }
        }
        default: {
            return res.status(400).json({
                message: 'Undefined Path'
            })
        }
    }
}