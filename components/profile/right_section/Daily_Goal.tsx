"use client";

import Goal from "./Goal"
import AddGoal from "./AddGoal"
import { updateGoal } from "@/server/goals/main";
import { Trash } from "lucide-react";
import { useState } from "react";

const Daily_Goal = ({daily_goal,sent,setResult}:{daily_goal:number | undefined,sent:number,setResult:React.Dispatch<React.SetStateAction<{daily_goal:number,email:string,sent:number}[]>>}) => {
  const state = daily_goal && daily_goal > 0 ? "goal" : "addgoal";
  const [show,setShow] = useState(state);
  console.log(daily_goal,show);

  const handleClearClick = async () => {
    setResult((prev:{daily_goal:number,email:string,sent:number}[]) => {
      const updated = [...prev];
      updated[0] = { ...updated[0], daily_goal: 0 };
      return updated;
    });
    setShow("addgoal");
    await updateGoal(null);
  }

  return (
    <div className="w-full h-full items-center p-5">
      
        <div className="flex flex-col gap-5">
          <Goal date="today" goal={daily_goal || null} sent={sent} radius_={80} stroke_={12}/>
          {show === "goal" ? <button onClick={handleClearClick} className="bg-red-500 flex justify-center items-center gap-3 p-3 rounded-md w-4/5 max-w-[300px] mt-3 mx-auto text-white text-xl cursor-pointer font-manrope font-semibold">Clear Goal <Trash /></button> : <AddGoal setShow_={setShow} setResult={setResult}/>}
        </div>
    </div>
  )
}

export default Daily_Goal
