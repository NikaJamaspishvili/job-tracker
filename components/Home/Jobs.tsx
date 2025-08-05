interface Props{
  apps:any,
  setApps:React.Dispatch<React.SetStateAction<any[]>>,
  fetchMoreData:()=>void,
  showButton:boolean,
  isPending:boolean,
  setPopup:React.Dispatch<React.SetStateAction<boolean | number>>,
}
import Apps_listing from "../Apps_listing"

const Jobs = ({apps,setApps,showButton,fetchMoreData,isPending,setPopup}:Props) => {

  const data = [
    {id:1,label:"job_title"},
    {id:2,label:"company"},
    {id:3,label:"date"},
    {id:4,label:"level"},
    {id:5,label:"points"},
    {id:6,label:"platform"},
  ]

  return (
    <div className="py-10"> 
      <section className="flex flex-col">
        <Apps_listing apps={apps} setApps={setApps}/>
        {showButton ? (apps.length > 0 && <button disabled={isPending} onClick={fetchMoreData} className="bg-blue-500 w-4/5 max-w-[200px] rounded-xl text-white font-sora mt-3 p-2 cursor-pointer mx-auto">{isPending ? "Loading..." : "Load More"}</button>) : <p className="text-center text-red-500 text-xl font-sora mt-5">You have reached the end</p>}
      </section>
    </div>
  )
}

export default Jobs
