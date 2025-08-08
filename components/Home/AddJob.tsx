"use client";
import React, { useTransition,useState } from "react";
import { AddApplication } from "@/server/applications/main";
import { Application, ApplicationSchema } from "@/schema/applications";
import Message from "../errors/Message";
import { X } from "lucide-react";
import Select from "../Select";

const AddJob = ({setShowAddJob,setApps}:{setShowAddJob:React.Dispatch<React.SetStateAction<boolean>>,setApps:React.Dispatch<React.SetStateAction<Application[]>>}) => {
    const [isPending,startTransition] = useTransition();
    const [points,setPoints] = useState(1);
    const [errors,setErrors] = useState<{field:PropertyKey,message:string}[]>([]);

    const array = [
        {id:1,label:"Job Title",name:"job_title"},
        {id:2,label:"Company",name:"company"},
        {id:3,label:"Platform",name:"platform"},
        {id:4,label:"Link to job",name:"job_link"},
        {id:5,label:"Points",name:"points"},
        {id:6,label:"Level",name:"level"},
        {id:7,label:"Date",name:"date"},
        {id:8,label:"Description",name:"description"},
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data:Application = Object.fromEntries(formData.entries());
        console.log(data);

        const validatedResult = ApplicationSchema.safeParse(data);
        if(!validatedResult.success){
            const errors = validatedResult.error.issues.map(issue => ({field:issue.path[0],message:issue.message}));
            console.log(errors);
            setErrors(errors);
            return;
        }

        startTransition(async ()=>{
            const result = await AddApplication(data);
            if(result?.success){
                setApps(prev => {
                    const array = [...prev];
                    data["id"] = result.appId as unknown as FormDataEntryValue;
                    array.unshift(data);
                    return array;
                })
                setShowAddJob(false);
            }
        })
    }

    const handlePointchange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const value = parseInt(target.value);
        setPoints(value);
    }

  return (
    <div className="fixed bg-white/70 backdrop-blur-xl border border-blue-200 w-[98vw] max-w-3xl h-[95vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50 rounded-2xl p-4 sm:p-8 shadow-2xl transition-all">
      <form onSubmit={handleSubmit} className="relative w-full max-md:py-10 flex flex-col items-center gap-6 overflow-y-auto max-h-[90vh]">
        <button type="button" className="absolute top-4 right-4 text-red-500 w-9 h-9 max-md:w-12 max-md:h-12 cursor-pointer hover:bg-red-100 rounded-full p-1 transition" onClick={() => setShowAddJob(false)}><X className="max-md:w-full max-md:h-full"/></button>
        <h1 className="text-3xl text-center font-manrope font-bold text-blue-800 drop-shadow">Add Application</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {array.map(result => (
            <div className="flex flex-col gap-2 bg-white/80 rounded-xl p-4 shadow border border-blue-100" key={result.id}>
              <label className="text-sm font-semibold text-blue-700 font-manrope mb-1 flex items-center gap-3">{result.label} {result.name === "points" && <span className="font-bold">{points}/10</span>}</label>
              {result.name !== "level" && result.name !== "description" ? (
                <input
                  className="outline-0 border border-blue-200 rounded-lg p-3 text-base font-sora transition w-full bg-white"
                  type={result.name === "date" ? "date" : result.name === "points" ? "range" : result.name === "job_link" ? "url" : "text"}
                  onChange={(e) => result.name === "points" && handlePointchange(e)}
                  min={1}
                  max={10}
                  defaultValue={result.name === "points" ? points : ""}
                  step={1}
                  name={result.name}
                />
              ) : result.name === "level" ? (
                <Select name={result.name} />
              ) : result.name === "description" && (
                <textarea maxLength={300} className="outline-0 border border-blue-200 rounded-lg px-3 py-2 text-base h-[100px] resize-none bg-white font-sora" placeholder="Max 300 characters" name={result.name} />
              )}
              {errors.length > 0 && errors.find(error => error.field === result.name) && <Message message={`${errors.find(error => error.field === result.name)?.message}`}/>} 
            </div>
          ))}
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 w-full max-w-xs rounded-xl mt-8 cursor-pointer font-manrope font-bold shadow transition text-lg">{isPending ? "Waiting..." : "Add Application"}</button>
      </form>
    </div>
  )
}

export default AddJob
