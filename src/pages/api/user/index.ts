import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '@/database/models/users'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT': {
            try {
                const { userId, urlAvatar } = req.body;
                if (!userId || !urlAvatar) return res.status(404).json({ success: false, message: 'Body must have userId and urlAvatar' });
                await UserModel.findByIdAndUpdate(userId, { urlAvatar })
                return res.status(200).json({ success: true, message: 'urlAvatar added' })
            }
            catch (error) {
                return res.status(500).json({ success: false, message: "Error trying to update that user", error })
            }
        }
        default: {
            return res.status(400).json({
                message: 'Undefined Path'
            })
        }
    }
}