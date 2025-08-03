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
    <div className="flex flex-col gap-10 mt-10">
    {popup && <Job_Details popup={popup} setPopup={setPopup} setApps={setApps}/>}
    {apps.map((result:any,index:number) => (
      <div onClick={()=>setPopup(result.id)} key={index} className="flex gap-5 rounded-xl p-3 justify-around bg-gray-300 hover:scale-101 transition-all duration-100 cursor-pointer">
        {data.map(item => (
          <div key={item.id} className="flex flex-col gap-3">
            <h1>{item.label}</h1>
            <p className="text-gray-500">{result[item.label]}</p>
          </div>
        ))}
      </div>
    ))}
    </div>
  )
}

export default Apps_listing
