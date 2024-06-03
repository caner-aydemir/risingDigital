import { cookies } from 'next/headers'
import {NextResponse} from "next/server";

export async function POST(request)
{
    await cookies().delete("token")
    await cookies().delete("username")
    return NextResponse.json({state : true})
}