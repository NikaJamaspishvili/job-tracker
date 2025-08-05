import Goal from "./Goal"
import { useEffect,useState } from "react"
import { getGoalsInfo } from "@/server/goals/main";
import { Frown } from "lucide-react";
import Loading from "@/components/Loading";
import Popup from "./Popup";

interface Props{
  created_at:Date,
  current_goal:number,
  row_count:number,
  days:number
}

const Calendar = () => {
  const [array,setArray] = useState<Props[]>([]);
  const [range,setRange] = useState<number>(7);
  const [popup,setPopup] = useState("");
  useEffect(()=>{
    async function fetch(){
      const result = await getGoalsInfo(range);

      if(result.success){
        const data: Props[] = result.result;
        const newArray = [];
        for(let i=range;i>=1;i--){
          const test = data.find((item:Props) => item.days === i);
            if(test){
                newArray.push(test);
            }else{
                newArray.push(null);
            }
        }
        setArray(newArray as Props[]);
      }

    }
    fetch();
  },[range]);

  if(array && array.length === 0) return <Loading />
  return (
    <div className="flex flex-col py-5">
      {popup.length > 0 && <Popup date={popup} setPopup={setPopup}/>}
        <select onChange={(e)=>setRange(Number(e.target.value))} className="py-3 px-5 outline-0 bg-blue-500 text-white border rounded-lg mx-auto cursor-pointer">
          <option value="7">Last 7 day</option>
          <option value="30">Last 30 day</option>
          <option value="14">Last 14 day</option>
          <option value="3">Last 3 day</option>
        </select>

        <section className="flex flex-col gap-10 pt-10">
          {array.map((result:Props,index:number) => {
            if(result === null) return (
              <div key={index} className="flex flex-col gap-5 items-center text-2xl bg-gray-100 shadow-xl p-5 rounded-lg mx-auto w-4/5">
                <h1 className="text-2xl font-bold flex gap-2 justify-center items-center font-manrope">Day <span className="text-blue-500">{range - (index)}</span></h1>
                <p className="text-xl font-sora flex items-center gap-2">No Applications Sent <Frown /></p>
                </div>
              )

            return <div onClick={()=>setPopup(array[index].created_at.toLocaleDateString('en-CA'))} key={index} className="text-center hover:scale-101 transition-all duration-100 flex flex-col gap-5 w-4/5 mx-auto p-5 rounded-lg bg-gray-100 shadow-sm shadow-orange-500 border border-orange-500 cursor-pointer">
              <h1 className="text-2xl font-bold flex gap-2 justify-center items-center font-manrope">Day <span className="text-2xl text-orange-500">{array[index].days}</span></h1>
              <Goal date={(array[index].created_at).toLocaleDateString('en-CA')} goal={array[index].current_goal} sent={array[index].row_count}/>
            </div>
          })}
        </section>
    </div>
  )
}

export default Calendar
