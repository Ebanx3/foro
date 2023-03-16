import MessageModel from "../models/message";
import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from "mongoose";
import { checkAuth } from "@/auth";

const createMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { tokenAuth } = req.cookies;
        if (!tokenAuth || !checkAuth(tokenAuth)) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        const { userInfo, content, threadId } = req.body;
        if (!userInfo || !content || !threadId) return res.status(400).json({ success: false, message: 'body must have userInfo, content and threadId field to create a new category' })
        const newCategory = await MessageModel.create({ userInfo, content, threadId });
        return res.status(200).json({
            success: true,
            message: `Message created`,
            data: newCategory
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Was impossible create the category'
        })
    }
}

const updateMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { tokenAuth } = req.cookies;
        if (!tokenAuth || !checkAuth(tokenAuth)) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        const { messageId } = req.query;

        if (!messageId || !isValidObjectId(messageId)) return res.status(400).json({ success: false, message: 'query must have a messageId field to update a message or its invalid' })

        const { content } = req.body;
        if (!content) return res.status(400).json({ success: false, message: 'body must have content to update' });

        const exists = await MessageModel.findById(messageId);
        if (!exists) return res.status(400).json({ success: false, message: 'Does not exists a message with that Id' });

        const updatedMessage = await MessageModel.findByIdAndUpdate(messageId, { content });

        return res.status(200).json({
            success: true,
            message: `Message updated`,
            data: updatedMessage
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Was impossible to update'
        })
    }
}

const likeMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { messageId } = req.query;

        if (!messageId || !isValidObjectId(messageId)) return res.status(400).json({ success: false, message: 'query must have a messageId field to update a message or its invalid' })

        const exists = await MessageModel.findById(messageId);
        if (!exists) return res.status(400).json({ success: false, message: 'Does not exists a message with that Id' });

        const updatedMessage = await MessageModel.findByIdAndUpdate(messageId, { likes: exists.likes++ });

        return res.status(200).json({
            success: true,
            message: `Message updated`,
            data: updatedMessage
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Was impossible to update'
        })
    }
}

const deleteMessage = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { tokenAuth } = req.cookies;
        if (!tokenAuth || !checkAuth(tokenAuth)) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        const { messageId } = req.query;
        if (!messageId || !isValidObjectId(messageId)) return res.status(400).json({ success: false, message: 'query must have a valid messageId field to delete a message ' });
        const exists = await MessageModel.findById(messageId);
        if (!exists) return res.status(400).json({ success: false, message: 'Does not exists a message with that Id' });

        await MessageModel.findByIdAndDelete(messageId);
        return res.status(200).json({
            success: true,
            message: 'Message deleted'
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Was impossible to update'
        })
    }
}

export { createMessage, updateMessage, deleteMessage }