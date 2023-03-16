import ThreadModel from "../models/thread";
import MessageModel from "../models/message";
import type { NextApiRequest, NextApiResponse } from "next";
import { checkAuth } from "@/auth";

const createThread = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { tokenAuth } = req.cookies;
        if (!tokenAuth || !checkAuth(tokenAuth)) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        const { title, ownerInfo, content, category, type } = req.body;

        if (!title || !ownerInfo || !content || !category || !type) {
            return res.status(400).json({
                success: false, message: 'Body must have title, ownerInfo, content, category and type fields'
            })
        }

        const newMessage = {
            userInfo: ownerInfo,
            content,
        }

        const newMessageAtDB = await MessageModel.create(newMessage);

        const newThread = {
            title,
            ownerInfo,
            messages: [newMessageAtDB._id.toString()],
            lastCommenter: ownerInfo.name,
            category,
            type
        }

        const newThreadAtDB = await ThreadModel.create(newThread);

        await MessageModel.findByIdAndUpdate(newMessageAtDB._id.toString(), { threadId: newThreadAtDB._id.toString() })

        return res.status(200).json({
            success: true,
            data: newThreadAtDB
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Was impossible to create a new thread'
        })
    }
}

export { createThread }