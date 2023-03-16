import { updateMessage, deleteMessage } from '@/database/controllers/messages';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT': {
            return updateMessage(req, res);
        }
        case 'DELETE': {
            return deleteMessage(req, res);
        }
        default: {
            return res.status(400).json({
                message: 'Undefined Path'
            })
        }
    }
}