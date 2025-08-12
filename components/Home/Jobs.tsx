interface Props{
  apps:Application[],
  setApps:React.Dispatch<React.SetStateAction<Application[]>>,
  showButton:boolean,
  isPending:boolean,
  isPending2:boolean,
  setShowAddJob:React.Dispatch<React.SetStateAction<boolean>>,
  showFilter:boolean,
  setShowFilter:React.Dispatch<React.SetStateAction<boolean>>,
  setShowEmail:React.Dispatch<React.SetStateAction<boolean>>,
  query:string,
  hasMoreData:boolean,
  setHasMoreData:React.Dispatch<React.SetStateAction<boolean>>,
}
import { Application } from "@/schema/applications"
import Apps_listing from "../Apps_listing"
import { CircleFadingPlus,EyeIcon,EyeOffIcon,MailIcon } from "lucide-react"

const Jobs = ({apps,setApps,isPending2,setShowAddJob,showFilter,setShowFilter,setShowEmail,query,hasMoreData,setHasMoreData}:Props) => {

  return (
    <div className="py-10">
      <section className="flex gap-3 ml-auto max-sm:flex-col max-sm:w-4/5 max-sm:mx-auto">
        <button className="flex items-center justify-center cursor-pointer gap-2 bg-orange-600/80 hover:bg-orange-700/90 shadow-xl rounded-full text-white text-lg font-sora font-semibold px-7 py-3 transition-all active:scale-95 backdrop-blur-md" onClick={()=>setShowAddJob(true)}>Add Application <CircleFadingPlus /></button>
        <button className="flex items-center justify-center cursor-pointer gap-2 bg-orange-600/80 hover:bg-orange-700/90 shadow-xl rounded-full text-white text-lg font-sora font-semibold px-7 py-3 transition-all active:scale-95 backdrop-blur-md" onClick={()=>setShowEmail(true)}>Send Email <MailIcon /></button>
        <button className={`flex items-center justify-center cursor-pointer gap-2 ${showFilter ? "bg-red-600/80 hover:bg-red-700/90" : "bg-blue-600/80 hover:bg-blue-700/90"} shadow-xl rounded-full text-white text-lg font-sora font-semibold px-7 py-3 transition-all active:scale-95 backdrop-blur-md`} onClick={()=>setShowFilter(!showFilter)}>{showFilter ? "Hide Filter" : "Show Filter"} {showFilter ? <EyeOffIcon /> : <EyeIcon />}</button>
      </section>
      <section className="flex flex-col">
        <Apps_listing isPending={isPending2} apps={apps} setApps={setApps} query={query} hasMoreData={hasMoreData} setHasMoreData={setHasMoreData}/>
      </section>
    </div>
  )
}

export default Jobs
