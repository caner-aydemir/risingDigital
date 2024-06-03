import {NextResponse} from "next/server";
import {cookies,headers} from "next/headers";

export const POST =async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('token').value;
    try {
        const response = await fetch("https://recruitment-api.vercel.app/get-info", {
            method: "GET",
            headers: {Authorization: token}
        });
        const userPackageInfo = await response.json()
        return NextResponse.json({ userPackageInfo})
    } catch (error) {
        console.error('Error retrieving data:', error);
        return NextResponse.json({status: false})
    }
}