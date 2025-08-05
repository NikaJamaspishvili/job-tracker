import { Application } from "@/schema/applications";
import Job_Details from "./Home/Job_Details"
import { useState } from "react"
import { PackageOpenIcon } from "lucide-react";

const Apps_listing = ({apps,setApps}:{apps:Application[],setApps:React.Dispatch<React.SetStateAction<Application[]>>}) => {
  const data = [
    {id:1,label:"job_title"},
    {id:2,label:"company"},
    {id:3,label:"date"},
    {id:4,label:"level"},
    {id:5,label:"points"},
    {id:6,label:"platform"},
  ]

  const [popup,setPopup] = useState<number | boolean | File | string>(false);
  if(apps.length === 0) return <div className="flex flex-col gap-8 mt-10 w-full items-center">
    <h1 className="font-sora text-2xl font-bold">No Results Found</h1>
    <PackageOpenIcon className="w-[100px] h-[100px]"/>
    </div>
  return (
    <div className="flex flex-col gap-8 mt-10 w-full border-t border-gray-300 pt-10">
    {popup && <Job_Details popup={popup} setPopup={setPopup} setApps={setApps}/>}
    {apps.map((result:Application,index) => (
      <div onClick={()=>setPopup(result.id)} key={index} className="flex gap-5 rounded-xl p-5 justify-around border-2 border-blue-500 bg-white text-black hover:scale-101 transition-all duration-100 cursor-pointer shadow-xl">
        {data.map(item => (
          <div key={item.id} className="flex flex-col gap-3">
            <h1 className="font-semibold text-lg font-manrope">{item.label === "job_title" ? "Job Title" : item.label}</h1>
            <p className="text-black font-light font-sora">{result[item.label] as string}</p>
          </div>
        ))}
      </div>
    ))}
    </div>
  )
}

export default Apps_listing
