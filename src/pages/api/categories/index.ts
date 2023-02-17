import { createCategory, getAllCategories } from '@/database/controllers/mongo'
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.method)
    switch (req.method) {
        case 'GET': {
            return getAllCategories(req, res);
        }
        case 'POST': {
            return createCategory(req, res);
        }
        default: {
            return res.status(400).json({
                message: 'Undefined Path'
            })
        }
    }
}