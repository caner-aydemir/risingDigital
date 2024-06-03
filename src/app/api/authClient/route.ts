import {jwtVerify} from "jose";
import {getJwtSecretKey} from "@/libs/auth";
import {NextResponse} from "next/server";

export async function POST(request){
    //Client tarafında secret key kullanmak tehlikeli olduğu için bir api yazdım ve server tarafında doğrulamayı yapıp cliente json return ediyorun
    const {token} = await request.json()
        try {
            const { payload } = await jwtVerify(token, getJwtSecretKey());
            return NextResponse.json({ payload });
        } catch (error) {
            return NextResponse.json( null);
        }

}