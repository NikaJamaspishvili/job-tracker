"use client";

import Calendar from "./Calendar";
import Daily_Goal from "./Daily_Goal";
import Logout from "./Logout";

const RightSection = ({navigation,daily_goal,sent,setResult}:{navigation:string,daily_goal:number,sent:number,setResult:React.Dispatch<React.SetStateAction<{daily_goal:number,email:string,sent:number}[]>>}) => {
  return (
    <section className="w-full overflow-y-auto my-5 border-gray-300 border rounded-r-lg">
      {navigation === "goal" && <div className="w-full h-full items-centers flex"><Daily_Goal setResult={setResult} daily_goal={daily_goal} sent={sent}/></div>}
      {navigation === "calendar" && <Calendar />}
      {navigation === "logout" && <Logout />}
    </section>
  )
}

export default RightSection
