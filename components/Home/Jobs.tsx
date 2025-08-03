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
      <h1 className="text-center text-2xl font-bold mt-5">Job Applications you have sent</h1>
      
      <section className="flex flex-col">
        <Apps_listing apps={apps} setApps={setApps}/>
        {showButton ? (apps.length > 0 && <button disabled={isPending} onClick={fetchMoreData} className="bg-gray-400 w-4/5 max-w-[200px] rounded-xl text-white mt-3 p-2 cursor-pointer mx-auto">{isPending ? "Loading..." : "Load More"}</button>) : <p className="text-center text-red-500 text-2xl mt-5">You have reached the end</p>}
      </section>
    </div>
  )
}

export default Jobs
