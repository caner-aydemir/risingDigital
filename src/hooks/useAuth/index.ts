import React from "react"
import {verifyJwtToken} from "@/libs/auth";
import Cookies from "universal-cookie"

//server tarafı için
const fromServer = ()=>{
    const cookies = require("next/headers").cookies
    const cookieInfo = cookies
    const {value : token} = cookies.get("token") ?? {value : null}
    const verifiedToken = verifyJwtToken(token)
    return verifiedToken
}

//client tarafı için
export function useAuth(){
    const [auth, setAuth] = React.useState(null);

    const getVerifiedToken = async ()=>{
        const cookies = await new Cookies()
        const token = cookies.get("token") ?? null;
        const res = await fetch("/api/authClient",{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({token })
        })
        const data = await res.json()
        setAuth(data?.payload)
    }

    React.useEffect(()=>{
        getVerifiedToken()
    },[])


    return auth
}

