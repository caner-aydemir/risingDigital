import {NextResponse} from "next/server";
import {SignJWT} from "jose";
import {getJwtSecretKey} from "@/libs/auth";

export async function POST(request){
    const {username , password} = await request.json()

        const response = await fetch("https://recruitment-api.vercel.app/login" ,
        {
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({username , password})
        }
       ,)

        const data = await response.json()
    if (data.status === 200)
        {
            const response = NextResponse.json(
                { success: true },
                { status: 200 }
            );

            response.cookies.set({
                name: "token",
                value: data.jwt,
                path: "/",
                username:username,
            });
            response.cookies.set({
                name: "username",
                value: username,
                path: "/",
            });

            return response

            //!!!!!!Projemizde güvenlik önlemlerini arttırmak için aldığımız tokeni verify etmemiz gerekmektedir.!!!!!!!
            //!!!!!!Token verify edilip bir algoritma ile şifrelenmezse güvenlik açığı oluşur ve console dan token değeri değiştirilebilir.!!!!!!
            //!!!!!!Bu nedenle ben jose kütüphanesini kullanarak tokeni verify ettim. Ve bunu nasıl yaptığımı size ekstra olarak göstermek istedim!!!!!!
            //!!!!!!Kodum aşağıda yorum satırındadır. Teşekkkürler!!!!!!

            ////////////////////////////////////////////////////////////////////////////////////////////////

            // const token = await new SignJWT({
            //     username,
            //     role: "admin", // Set your own roles
            // })
            //     .setProtectedHeader({ alg: "HS256" })
            //     .setIssuedAt()
            //     .setExpirationTime("1h") // 1 saat sonra otomatik logout olacağız, jwt token null olacak
            //     .sign(getJwtSecretKey());
            //
            //
            // const response = NextResponse.json(
            //     { success: true },
            //     { status: 200, headers: { "content-type": "application/json" } }
            // );
            //
            // response.cookies.set({
            //     name: "token",
            //     value: token,
            //     path: "/",
            // });
            // return response;

            ////////////////////////////////////////////////////////////////////////////////////////////////

        }
        else
        {
            return NextResponse.json({ success: false,data });
        }
}
