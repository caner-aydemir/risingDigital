import { NextRequest,NextResponse } from "next/server";
import {verifyJwtToken} from "@/libs/auth"
import {next} from "sucrase/dist/types/parser/tokenizer";

const AUTH_PAGES = ["/login"]
const isAuthPages=(url)=> AUTH_PAGES.some(page => page.startsWith(url))

export async function middleware(request: NextRequest) {
    const {url, nextUrl, cookies} = request

    const {value: token} = cookies.get('token') ?? {value: null}

    //eğer tokenimizi şifrelemek istersek bu yazdığım fonksiyonları kullanarak güvenliği en üst seviyeye çıkartabiliriz.
    //import {verifyJwtToken} from "@/libs/auth"   fonksiyon bu pathdedir, inceleyebilirsiniz.

    // const hasVerifiedToken = token && (await verifyJwtToken(token))

    const isAuthPageRequested = isAuthPages(nextUrl.pathname)

    if(isAuthPageRequested)
    {
        if(!token)
        {
            const response = NextResponse.next()
            return  response
        }
        const response = NextResponse.redirect(new URL("/dashboard" , url))
        return response
    }
    if (!token)
    {
        const searchParams = new URLSearchParams(nextUrl.searchParams)
        searchParams.set("next" , nextUrl.pathname)
        return NextResponse.redirect(new URL(`/?${searchParams}`,url))
    }

    return NextResponse.next()
}
export const config = {
    matcher:['/', '/dashboard','/my-wallet','/my-profile']
}