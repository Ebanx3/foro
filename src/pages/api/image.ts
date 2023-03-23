import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "@/auth";
import cloudinary from "@/cloudinary";
import UserModel from "@/database/models/users";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tokenAuth } = req.cookies;
    if (!tokenAuth || !checkAuth(tokenAuth)) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    try {
        const { userId, image } = req.body;
        const result = await cloudinary.uploader.upload(image, { folder: "avatars", width: 300, height: 300, crop: "thumb" });
        await UserModel.findByIdAndUpdate(userId, { urlAvatar: result.secure_url });
        res.json({ success: true, userId, urlAvatar: result.secure_url })
    }
    catch (error) {
        console.log(error)
        res.json({ success: true })

    }
}
