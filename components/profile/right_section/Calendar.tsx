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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const rangeOptions = [
    { value: 7, label: "Last 7 days" },
    { value: 30, label: "Last 30 days" },
    { value: 14, label: "Last 14 days" },
    { value: 3, label: "Last 3 days" },
  ];
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

  if(array && array.length === 0) return <Loading isFixed={true} />
  return (
    <div className="flex flex-col py-5">
      {popup.length > 0 && <Popup date={popup} setPopup={setPopup} />}
      <div className="relative w-full max-w-xs mx-auto mb-6">
        <button
          type="button"
          className="w-full flex justify-between items-center bg-white/70 border border-blue-300 rounded-xl px-6 py-3 shadow-md font-sora text-base text-blue-700 cursor-pointer transition-all focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none backdrop-blur-md hover:bg-blue-50"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <span>{rangeOptions.find((opt) => opt.value === range)?.label}</span>
          <svg className={`w-5 h-5 ml-2 transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {dropdownOpen && (
          <ul className="absolute z-20 mt-2 w-full bg-white/90 border border-blue-200 rounded-xl shadow-xl backdrop-blur-md py-2 max-h-60 overflow-auto animate-fade-in">
            {rangeOptions.map((option) => (
              <li
                key={option.value}
                className={`px-6 py-2 cursor-pointer font-sora text-base rounded-lg transition-all hover:bg-blue-100/80 hover:text-blue-700 ${range === option.value ? "bg-blue-50 text-blue-700 font-semibold" : "text-gray-800"}`}
                onClick={() => {
                  setRange(option.value);
                  setDropdownOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

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
