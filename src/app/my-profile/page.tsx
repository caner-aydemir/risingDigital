import React from 'react';
import Slalom from "@/components/Slalom";
import Sidebar from "@/components/sidebar";

function Page() {
    return (
        <div className={"bg-[#F7FAFC] flex w-full  h-auto"}>
            <div className="w-24  border-r-2 h-screen border-[#E6E8EB]">
                <Sidebar/>
            </div>
            <div className="w-full h-screen flex justify-center items-center">
                <Slalom/>
            </div>
        </div>
    );
}

export default Page;