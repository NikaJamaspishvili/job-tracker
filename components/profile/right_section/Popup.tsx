import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { getApplication } from "@/server/goals/main";
import Loading from "@/components/Loading";
import Apps_listing from "@/components/Apps_listing";

const Popup = ({date,setPopup}:{date:string,setPopup:React.Dispatch<React.SetStateAction<string>>}) => {
    const [apps,setApps] = useState<any>([]);
    useEffect(()=>{
        async function fetch(){
            const result = await getApplication(date);
            if(result.success){
                setApps(result.result);
            }
        }
        fetch();
    },[]);

    if(apps.length === 0) return <Loading />
    return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90%] h-[90%] flex flex-col items-center bg-white border-2 shadow-2xl shadow-black z-10 rounded-xl">
        <X onClick={()=>setPopup("")} className="absolute top-3 right-3 text-red-500 w-[30px] h-[30px] cursor-pointer"/>
        <h1 className="text-3xl font-bold font-manrope mt-10 text-blue-500">{date}</h1>
        <div className="w-11/12">
            <Apps_listing setApps={setApps} apps={apps}/>
        </div>
    </div>
  )
}

export default Popup
