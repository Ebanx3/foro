import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("tokenAuth");

    if (req.nextUrl.pathname.startsWith("/nuevo-hilo")) {
        if (!token) {
            return NextResponse.redirect(new URL("/", req.url))
        }
        try {
            await jwtVerify(token.value, new TextEncoder().encode(process.env.TOKEN_SECRET_KEY))
        }
        catch (error) {
            console.log(error)
            return NextResponse.redirect(new URL("/", req.url))
        }
    }

    NextResponse.next()
}

// export const config = {
//     matcher : ["/nuevo-hilo/:path*"]
// }