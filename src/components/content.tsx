"use client"
import React,{useState} from 'react';
import closeIcon from "../icons/close.svg"
import Image from "next/image"
import {Button} from "@nextui-org/react";
import DashboardContent from "@/components/dashboardContent";
import Login from "@/components/login";
import {useAuth} from "@/hooks/useAuth";
import Cookies from "universal-cookie"
import Slalom from "@/components/Slalom";
function Content() {
    const cookies =  new Cookies()
    const username = cookies.get("username")
    const auth = useAuth()
    const [hiddenBar, setHiddenBar] = useState(false);
    const [selectContent, setSelectContent] = useState(1);
    const itemsBar = [
        {name : "My Proxies" , showComponents: <Slalom/>},
        {name : "Dashboard" , showComponents: <DashboardContent/>}
    ]
    return (
        <div className={"flex  flex-col items-center gap-y-10 justify-center w-full h-auto py-7"}>
            <div className={` ${hiddenBar && "invisible" } w-1/2 flex px-5 py-1 items-center justify-between rounded-md bg-[#78B6FF4D] text-sm font-semibold`}>
                <p>Special Offer!   Get Complete Free Proxy 10 MB Proxy, without credit card.  <span className="underline hover:cursor-pointer">Start Free Trial</span> </p>
                <Button isIconOnly={true} onPress={()=>setHiddenBar(true)} className="flex text-end bg-transparent"><Image src={closeIcon} alt={"close"}/></Button>
            </div>
            {username && <p className={"duration-300 font-extrabold text-xl  w-1/2"}>Welcome, <span className="underline">{username}</span></p>
            }
            <div className={"font-extrabold text-2xl   w-1/2"}>
                Proxies & Scraping Infrastructure
            </div>
            <div className={"w-full h-14 flex  items-center justify-center   border-b-2 border-[#E6E8EB]"}>
                <div className="w-1/2 gap-x-10   h-full flex ">
                {itemsBar.map((items,index)=>(
                        <button
                            className={`${selectContent === index && "border-b-2 font-semibold duration-100 border-[#0C6DFC] text-[#0C6DFC] h-full"}`}
                            onClick={()=>setSelectContent(index)} key={index}>{items.name}</button>
                ))}
                </div>
            </div>
            {itemsBar[selectContent].showComponents}

        </div>
    );
}

export default Content;