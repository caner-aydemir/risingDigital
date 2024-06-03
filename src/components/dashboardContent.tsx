"use client"
import React, {useEffect, useState} from 'react';
import Chart from "@/components/chart";
import Table from "@/components/table";
import {Spinner} from "@nextui-org/react";

function DashboardContent() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true)
        const res = await fetch("/api/userPackageInfo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({}) // Boş JSON body
        });
        const tableInfo =  await res.json()
        setData(tableInfo.userPackageInfo)
        setIsLoading(false)

    }

    useEffect(()=>{
        fetchData()
    },[])
    const items = [
        {name:"Subscription expires on" , date:data["expireTime"]},
        {name:"Last charge" , date: [data["lastChargeAmount"] , data["lastCharge"]] },
        {name:"Total Usage Data" , date:data["totalDataUsage"]},
        {name:"Daily Usage Data" , date:data["dailyUsage"]},
    ]
    return (
        <div className="w-2/3 flex flex-col justify-center gap-y-10 items-center mx-auto text-center">
            <div className="w-full gap-8 grid grid-cols-2 sm:grid-cols-4  ">
                {items.map((item,index) => (
                    <div key={index }
                         className={`
                         ${index % 2 === 0 ? "bg-[#E3F5FF]" : "bg-[#E5ECF6]"}
                         flex flex-col items-center justify-center w-auto h-[112px]  rounded-2xl p-3`}>
                        <p className={`${index === 3  && "text-lg font-extrabold"}
                          ${index === 2  && "text-lg font-extrabold"}
                          `}>{item.name}</p>
                        {isLoading === true ? <Spinner size={"md"} label="" color="warning" /> :
                            <p className={`${index === 3  && "text-2xl font-extrabold"}
                        ${index === 0 && "text-xl "}
                          ${index === 2  && "text-2xl font-extrabold"} ${index === 1  && "text-2xl font-extrabold"}
                           `}>{item.date}</p>
                        }

                    </div>
                ))}
            </div>
            <Chart/>
            <Table/>
        </div>
    );
}

export default DashboardContent;