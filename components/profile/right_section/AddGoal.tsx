"use client";
import { useState,useTransition } from "react";
import { updateGoal } from "@/server/goals/main";

const AddGoal = ({setResult,setShow_}:{setResult:React.Dispatch<React.SetStateAction<{daily_goal:number,email:string,sent:number}[]>>,setShow_:React.Dispatch<React.SetStateAction<string>>}) => {
    const [show,setShow] = useState(false);
    const [isPending,startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const goal = formData.get("goal");
      startTransition(async ()=>{
        const result = await updateGoal(goal as unknown as number);
        if(result.success){
          setResult((prev: {daily_goal:number,email:string,sent:number}[]) => {
            const numeric = Number(goal);
            const updated = [...prev];
            updated[0] = { ...updated[0], daily_goal: numeric };
            return updated;
          });
          setShow_("goal");
        }
      })
    }

  return (
    <div className="flex flex-col w-full">
      <button onClick={()=>setShow(!show)} className={`w-full max-w-[300px] cursor-pointer mx-auto font-sora ${show ? "bg-red-500" : "bg-blue-500"} text-white outline-0 rounded-md p-3 text-xl font-sans`}>{show ? `Close` : `Add a goal`}</button>

      {show && <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-3 mt-3">
        <input min={1} type="number" className="border font-sora p-2 w-full max-w-[150px] rounded-lg bg-white outline-0" placeholder="Each day goal..." name="goal"/>
        <button disabled={isPending} className="bg-blue-500 w-4/5 max-w-[200px] font-manrope font-bold text-lg rounded-xl text-white mt-3 p-2 cursor-pointer">{isPending ? "Loading..." : "Submit"}</button>
      </form>}
    </div>
  )
}

export default AddGoal
