interface Props{
  apps:Application[],
  setApps:React.Dispatch<React.SetStateAction<Application[]>>,
  fetchMoreData:()=>void,
  showButton:boolean,
  isPending:boolean,
  isPending2:boolean,
}
import { Application } from "@/schema/applications"
import Apps_listing from "../Apps_listing"

const Jobs = ({apps,setApps,showButton,fetchMoreData,isPending,isPending2}:Props) => {

  return (
    <div className="py-10"> 
      <section className="flex flex-col">
        <Apps_listing isPending={isPending2} apps={apps} setApps={setApps}/>
        {showButton ? (apps.length > 0 && apps.length % 5 === 0 && <button disabled={isPending} onClick={fetchMoreData} className="bg-blue-500 w-4/5 max-w-[200px] rounded-xl text-white font-sora mt-3 p-2 cursor-pointer mx-auto">{isPending ? "Loading..." : "Load More"}</button>) : <p className="text-center text-red-500 text-xl font-sora mt-5">You have reached the end</p>}
      </section>
    </div>
  )
}

export default Jobs
