"use client"
import React from 'react';
import Sidebar from "@/components/sidebar";
import Content from "@/components/content";

function Page() {
    return (
        <div className={"bg-[#F7FAFC] flex w-full  h-auto"}>
            <div className="w-24  border-r-2 h-screen border-[#E6E8EB]">
                <Sidebar/>
            </div>
            <div className="w-full ">
                <Content/>
            </div>
        </div>
    );
}

export default Page;