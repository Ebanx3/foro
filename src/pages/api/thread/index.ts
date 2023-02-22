import { createThread } from '@/database/controllers/threads';
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.method)
    switch (req.method) {
        case 'POST': {
            return createThread(req, res);
        }
        default: {
            return res.status(400).json({
                message: 'Undefined Path'
            })
        }
    }
}