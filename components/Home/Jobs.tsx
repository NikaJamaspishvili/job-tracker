import { getApplications } from "@/server/applications/main";

interface Props{
  apps:any,
  setApps:React.Dispatch<React.SetStateAction<any[]>>,
  fetchMoreData:()=>void,
  showButton:boolean,
  isPending:boolean,
}

const Jobs = ({apps,setApps,showButton,fetchMoreData,isPending}:Props) => {
  const data = [
    {id:1,title:"title",company:"company",date:"date",level:"level",points:"points",platform:"platform"},
    {id:2,title:"title2",company:"company2",date:"date2",level:"level2",points:"points2",platform:"platform2"},
    {id:3,title:"title",company:"company",date:"date",level:"level",points:"points",platform:"platform"},
    {id:4,title:"title",company:"company",date:"date",level:"level",points:"points",platform:"platform"},
    {id:5,title:"title",company:"company",date:"date",level:"level",points:"points",platform:"platform"},
  ];

  const data2 = [
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
        <div className="flex flex-col gap-10 mt-10">
          {apps.map((result:any,index:number) => (
            <div key={index} className="flex gap-5 border rounded-xl p-3 justify-around bg-gray-300 hover:scale-101 transition-all duration-100 cursor-pointer">
              {data2.map(item => (
                <div key={item.id} className="flex flex-col gap-3">
                  <h1>{item.label}</h1>
                  <p className="text-gray-500">{item.label === "date" ? result[item.label].toLocaleDateString('en-CA') : result[item.label]}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        {showButton ? <button disabled={isPending} onClick={fetchMoreData} className="bg-gray-400 w-4/5 max-w-[200px] rounded-xl text-white mt-3 p-2 cursor-pointer mx-auto">{isPending ? "Loading..." : "Load More"}</button> : <p className="text-center text-red-500 text-2xl mt-5">You have reached the end</p>}
      </section>
    </div>
  )
}

export default Jobs
