
import {NextResponse} from "next/server";
import {cookies,headers} from "next/headers";
import axios from "axios";
export async function POST(req,res){
    const cookieStore = cookies();
    const token = cookieStore.get('token').value;

    try {
        const response = await fetch("https://recruitment-api.vercel.app/get-table",{
            method:"GET",
            headers: {Authorization: token }
        });
        const tableInfo = await response.json()
        const sendData = tableInfo["data"]
        return NextResponse.json({sendData})
    } catch (error) {
        console.error('Error retrieving data:', error);
        return NextResponse.json({status : false })
    }
}