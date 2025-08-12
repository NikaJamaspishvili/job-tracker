import { X } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { getApplication } from "@/server/goals/main";
import Apps_listing from "@/components/Apps_listing";
import { Application } from "@/schema/applications";
import { Calendar } from "lucide-react";

const Popup = ({date,setPopup}:{date:string,setPopup:React.Dispatch<React.SetStateAction<string>>}) => {
    const [apps,setApps] = useState<Application[]>([]);
    const [isPending,startTransition] = useTransition();
    useEffect(()=>{
        async function fetch(){
            startTransition(async ()=>{
                const result = await getApplication(date);
                if(result.success){
                    setApps(result.result);
                }
            })
        }
        fetch();
    },[]);

    return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90%] h-[90%] flex flex-col items-center bg-white border-2 shadow-2xl shadow-black z-10 rounded-xl py-10">
        <X onClick={()=>setPopup("")} className="absolute top-3 right-3 text-red-500 w-[30px] h-[30px] cursor-pointer"/>
        <h1 className="text-3xl font-bold font-manrope text-blue-500 flex flex-col items-center gap-2"><Calendar width={35} height={35}/> {date}</h1>
        <div className="w-11/12">
            <Apps_listing isPending={isPending} setApps={setApps} apps={apps}/>
        </div>
    </div>
  )
}

export default Popup
