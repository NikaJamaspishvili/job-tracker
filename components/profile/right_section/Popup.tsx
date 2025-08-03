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
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90%] h-[90%] flex items-center justify-center bg-white z-10 rounded-xl">
        <X onClick={()=>setPopup("")} className="absolute top-3 right-3 text-red-500 w-[30px] h-[30px] cursor-pointer"/>
        <Apps_listing setApps={setApps} apps={apps}/>
    </div>
  )
}

export default Popup
