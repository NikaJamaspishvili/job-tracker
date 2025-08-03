import Goal from "./Goal"
import { useEffect,useState } from "react"
import { getGoalsInfo } from "@/server/goals/main";
import { Frown } from "lucide-react";
import Loading from "@/components/Loading";
import Popup from "./Popup";

const Calendar = () => {
  const [array,setArray] = useState<any>([]);
  const [range,setRange] = useState<number>(7);
  const [popup,setPopup] = useState("");
  useEffect(()=>{
    async function fetch(){
      const result = await getGoalsInfo(range);

      if(result.success){
        const data: any = result.result;
        let newArray = [];
        for(let i=range;i>=1;i--){
          const test = data.find((item:any) => item.days === i);
            if(test){
                newArray.push(test);
            }else{
                newArray.push(null);
            }
        }
        setArray(newArray);
      }

    }
    fetch();
  },[range]);

  if(array && array.length === 0) return <Loading />
  return (
    <div className="flex flex-col">
      {popup.length > 0 && <Popup date={popup} setPopup={setPopup}/>}
        <select onChange={(e)=>setRange(Number(e.target.value))} className="p-2 outline-0 bg-gray-500 text-white rounded-lg mx-auto">
          <option value="7">Last 7 day</option>
          <option value="30">Last 30 day</option>
          <option value="14">Last 14 day</option>
          <option value="3">Last 3 day</option>
        </select>

        <section className="flex flex-col gap-10 pt-10">
          {array.map((result:any,index:number) => {
            if(result === null) return (
              <div key={index} className="flex flex-col gap-5 items-center text-2xl">
                <h1 className="font-bold text-xl">Day <span className="text-blue-500">{range - (index)}</span></h1>
                <section className="flex flex-col items-center gap-1">
                  <h1>Data Not Found</h1>
                  <Frown width={40} height={40}/>
                </section>
              </div>
              )

            console.log(array[index]);
            return <div onClick={()=>setPopup(array[index].created_at.toLocaleDateString('en-CA'))} key={index} className="text-center hover:scale-101 transition-all duration-100 flex flex-col gap-5 border w-4/5 mx-auto p-5 rounded-xl bg-blue-400 cursor-pointer">
              <h1 className="text-xl font-bold flex gap-2 justify-center">Day <span className="text-black">{array[index].days}</span></h1>
              <Goal date={(array[index].created_at).toLocaleDateString('en-CA')} goal={array[index].current_goal} sent={array[index].row_count}/>
            </div>
          })}
        </section>
    </div>
  )
}

export default Calendar
