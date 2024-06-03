"use client"
import React,{useState} from 'react';
import Image from "next/image"
import logo from "../icons/risingLogo.svg"
import { IoHome } from "react-icons/io5";
import { IoCard } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,useDisclosure} from "@nextui-org/react";
import Cookies from "universal-cookie"
import {useRouter} from "next/navigation"
import { usePathname } from 'next/navigation'



function Sidebar() {
    const pathname = usePathname()

    const cookies =  new Cookies()
    const username = cookies.get("username")
    const router = useRouter()
    const {isOpen, onOpen, onClose} = useDisclosure();

    const logout =async ()=> {
       const res = await fetch(`/api/logout`, { method : "POST"})

        const data = await res.json()
        if (data.state === true)
        {
            router.push("/")
        }

    }
    const [isSelected, setIsSelected] = useState(0);
    const sidebarItems = [
        {name:"home" ,icons : IoHome , href:"/dashboard"},
        {name:"my-wallet" ,icons : IoCard, href:"/my-wallet"},
        {name:"my-profile" ,icons : FaUser, href:"/my-profile"},
        {name:"logout" ,icons : TbLogout, href:"/"},
    ]

    function goRoute(index,href){
            setIsSelected(index)
        router.push(href)
    }
    return (
        <div className="w-full h-full flex justify-center py-10">
            <div className={"w-1/2 gap-y-5 text-2xl text-gray-500 items-center flex flex-col "}>
                <Image
                    src={logo}
                    width={100}
                    height={100}
                    alt={""}
                    className={""}
                />

                {sidebarItems.map((items , index)=>(
                    <Button isIconOnly
                            key={index}
                            disableRipple={true}
                            onPress={()=>items.name === "logout" ? onOpen() : goRoute(index,items.href)}
                            size={"lg"}
                            variant={pathname === items.href ? "solid"  : "light"}
                            className={`${pathname === items.href ? "bg-blue-100" : ""}`}  >
                        <items.icons size={25}  className={` ${ pathname === items.href ? "text-blue-600 " : "text-gray-500"}`}/>
                    </Button>
                ))}
            </div>
            <Modal
                size={"sm"}
                isOpen={isOpen}
                onClose={onClose}
                backdrop={"blur"}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-extrabold text-red-600">Logout</ModalHeader>
                            <ModalBody>
                               <p className="text-lg font-bold text-center">Dear {username?.toUpperCase()} ,are you sure you want to <span className="text-red-600">logout</span>?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button className={" font-semibold"} color="success" variant="light" onPress={logout}>
                                    Yes
                                </Button>
                                <Button className={"text-red-600 font-semibold"} variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Sidebar;