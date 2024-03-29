import { addSubCategory } from '@/database/controllers/categories';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'PUT': {
            return addSubCategory(req, res);
        }
        default: {
            return res.status(400).json({
                message: 'Undefined Path'
            })
        }
    }
}