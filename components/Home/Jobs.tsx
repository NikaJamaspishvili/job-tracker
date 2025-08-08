interface Props{
  apps:Application[],
  setApps:React.Dispatch<React.SetStateAction<Application[]>>,
  fetchMoreData:()=>void,
  showButton:boolean,
  isPending:boolean,
  isPending2:boolean,
  setShowAddJob:React.Dispatch<React.SetStateAction<boolean>>,
  showFilter:boolean,
  setShowFilter:React.Dispatch<React.SetStateAction<boolean>>,
}
import { Application } from "@/schema/applications"
import Apps_listing from "../Apps_listing"
import { CircleFadingPlus,EyeIcon,EyeOffIcon } from "lucide-react"

const Jobs = ({apps,setApps,showButton,fetchMoreData,isPending,isPending2,setShowAddJob,showFilter,setShowFilter}:Props) => {

  return (
    <div className="py-10">
      <section className="flex gap-3 ml-auto max-sm:flex-col max-sm:w-4/5 max-sm:mx-auto">
        <button className="flex items-center justify-center cursor-pointer gap-2 bg-orange-600/80 hover:bg-orange-700/90 shadow-xl rounded-full text-white text-lg font-sora font-semibold px-7 py-3 transition-all active:scale-95 backdrop-blur-md" onClick={()=>setShowAddJob(true)}>Add Application <CircleFadingPlus /></button>
        <button className={`flex items-center justify-center cursor-pointer gap-2 ${showFilter ? "bg-red-600/80 hover:bg-red-700/90" : "bg-blue-600/80 hover:bg-blue-700/90"} shadow-xl rounded-full text-white text-lg font-sora font-semibold px-7 py-3 transition-all active:scale-95 backdrop-blur-md`} onClick={()=>setShowFilter(!showFilter)}>{showFilter ? "Hide Filter" : "Show Filter"} {showFilter ? <EyeOffIcon /> : <EyeIcon />}</button>
      </section>
      <section className="flex flex-col">
        <Apps_listing isPending={isPending2} apps={apps} setApps={setApps}/>
        {showButton ? (apps.length > 0 && apps.length % 5 === 0 && <button disabled={isPending} onClick={fetchMoreData} className="bg-blue-500 w-4/5 max-w-[200px] rounded-xl text-white font-sora mt-3 p-2 cursor-pointer mx-auto">{isPending ? "Loading..." : "Load More"}</button>) : <p className="text-center text-red-500 text-xl font-sora mt-5">You have reached the end</p>}
      </section>
    </div>
  )
}

export default Jobs
