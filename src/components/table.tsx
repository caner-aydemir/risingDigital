"use client"
import React,{useState,useEffect} from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, Spinner,TableCell,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, RadioGroup, Radio} from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import {useAuth} from "@/hooks/useAuth";
import Cookies from "universal-cookie"
import axios from 'axios';
import {number} from "prop-types";

 function  TableInfo() {
     const cookies =   new Cookies()
    const auth = useAuth()
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Actions"]));
    const [isClick, setIsClick] = useState(false);
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );
    const isToggle = (index)=>{
        setIsClick(!isClick)
        setSelectedDropDown(index)
    }
     const [data, setData] = useState([]);
     const [isLoading, setIsLoading] = useState(false);


     const fetchData = async () => {
         setIsLoading(true)
         const res = await fetch("/api/getTableData", {
             method: "POST",
             headers: {
                 'Content-Type': 'application/json',

             },
             body: JSON.stringify({}) // Boş JSON body
         });
         const tableInfo =  await res.json()
         setData(tableInfo.sendData)
         setIsLoading(false)



     }
     const [selectedDropDown, setSelectedDropDown] = useState();

     useEffect(() => {
         fetchData()
     }, [selectedDropDown]);


     const writeToNumberOfIp = (ip)=>{
         console.log("Number of IP" , ip)
     }

     return (
         <>
             {data.length === 0 ?     <Spinner label="Loading..." color="warning" />
                 :
                 <div className="w-full  bg-white text-start p-10 space-y-2 rounded-2xl">

                     <p className="font-semibold">Transactions History</p>
                     <Table  radius={"none"}   removeWrapper={true}
                     >
                         <TableHeader  >
                             <TableColumn className="text-black font-black bg-white">Type</TableColumn>
                             <TableColumn className="text-black font-black bg-white">Location</TableColumn>
                             <TableColumn className="text-black font-black bg-white">Rental Period</TableColumn>
                             <TableColumn className="text-black font-black bg-white">Number of IP</TableColumn>
                             <TableColumn className="text-black font-black bg-white">SpesificPurpose</TableColumn>
                             <TableColumn className="text-black font-black bg-white">Date</TableColumn>
                             <TableColumn className="text-black font-black bg-white">Actions</TableColumn>
                         </TableHeader>
                         <TableBody >


                             {data?.map((items,index)=>(
                                 <TableRow key={index} className={"text-start border-b border-gray-300"} >
                                     <TableCell>{items.type}</TableCell>
                                     <TableCell>{items.location}</TableCell>
                                     <TableCell>{items.rental}</TableCell>
                                     <TableCell>{items.ipcount}</TableCell>
                                     <TableCell>{items.purpose}</TableCell>
                                     <TableCell>{new Date(items.date).toLocaleDateString('tr-TR')}</TableCell>
                                     <TableCell>
                                         <Dropdown backdrop={"opaque"}  onOpenChange={()=>isToggle(index)}
                                         >
                                             <DropdownTrigger >
                                                 <Button

                                                     size={"sm"}
                                                     disableAnimation={true}
                                                     variant={"shadow"}
                                                     className="bg-white p-1 font-bold text-sm "
                                                     endContent={selectedDropDown === index && isClick ? <FaChevronUp className="text-blue-700 "/> : <FaChevronDown/>}
                                                 >
                                                     <p className={`${selectedDropDown === index && isClick  && " text-blue-700"}`}>{selectedValue}</p>
                                                 </Button>
                                             </DropdownTrigger>
                                             <DropdownMenu
                                                 selectionMode="single"
                                                 selectedKeys={selectedKeys}
                                                 onSelectionChange={setSelectedKeys}
                                                 aria-label="Dropdown Variants"
                                                 color={"default"}
                                                 variant={"shadow"}

                                             >

                                                 <DropdownItem onPress={()=>writeToNumberOfIp(items.ipcount)} key="Processing">Processing</DropdownItem>
                                                 <DropdownItem onPress={()=>writeToNumberOfIp(items.ipcount)} key="In Progress">In Progress</DropdownItem>
                                                 <DropdownItem onPress={()=>writeToNumberOfIp(items.ipcount)} key="Completed">Completed</DropdownItem>
                                             </DropdownMenu>
                                         </Dropdown>
                                     </TableCell>
                                 </TableRow>
                             ))}


                         </TableBody>
                     </Table>
                 </div>

             }
         </>
    );
}

export default TableInfo;