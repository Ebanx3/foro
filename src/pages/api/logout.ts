import { NextApiRequest, NextApiResponse } from "next";
import { checkAuth, setAuthTokenNull } from "@/auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method != "POST")
            return res.status(404).json({ sucess: false, message: "Undefined path" });

        const token = req.cookies.tokenAuth;

        if (!token || !checkAuth(token)) return res.status(401).json({ success: false, message: "Token doesn´t exists" })

        return res.status(200).setHeader("Set-Cookie", setAuthTokenNull()).json({
            success: true,
            message: "logout succesfully"
        })

    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Error trying to login" });
    }
}
