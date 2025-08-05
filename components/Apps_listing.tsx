import Job_Details from "./Home/Job_Details"
import { useState } from "react"
const Apps_listing = ({apps,setApps}:any) => {
  const data = [
    {id:1,label:"job_title"},
    {id:2,label:"company"},
    {id:3,label:"date"},
    {id:4,label:"level"},
    {id:5,label:"points"},
    {id:6,label:"platform"},
  ]

  const [popup,setPopup] = useState<number | boolean>(false);

  return (
    <div className="flex flex-col gap-12 mt-10 w-full">
    {popup && <Job_Details popup={popup} setPopup={setPopup} setApps={setApps}/>}
    {apps.map((result:any,index:number) => (
      <div onClick={()=>setPopup(result.id)} key={index} className="flex gap-5 rounded-xl p-5 justify-around border-2 border-blue-500 bg-white text-black hover:scale-101 transition-all duration-100 cursor-pointer shadow-xl">
        {data.map(item => (
          <div key={item.id} className="flex flex-col gap-3">
            <h1 className="font-semibold text-lg font-manrope">{item.label === "job_title" ? "Job Title" : item.label}</h1>
            <p className="text-black font-light font-sora">{result[item.label]}</p>
          </div>
        ))}
      </div>
    ))}
    </div>
  )
}

export default Apps_listing
