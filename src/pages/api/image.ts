import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises"
import { checkAuth } from "@/auth";

export const config = {
    api: {
        bodyParser: false,
    }
}

const readFile = (req: NextApiRequest, saveLocally?: boolean) => {
    // const { username } = req.body;

    const options: formidable.Options = {};
    options.keepExtensions = true;
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/avatars");
        options.filename = (name, path, ext) => {
            return "avatar-" + ext.name + path
        }
    }
    options.maxFileSize = 50 * 500 * 500;
    const form = formidable(options)
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files })
        })
    })

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tokenAuth } = req.cookies;
    if (!tokenAuth || !checkAuth(tokenAuth)) {
        return res.status(401).json({ success: false, message: "Unauthorized" })
    }
    try {
        await fs.readdir(path.join(process.cwd(), "/public", "/avatars"));
    }
    catch (error) {
        await fs.mkdir(path.join(process.cwd(), "/public", "/avatars"));
    }
    await readFile(req, true);
    res.json({ success: true })
}