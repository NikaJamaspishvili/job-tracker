"use client";
import { useTransition } from "react";
import { AddApplication } from "@/server/applications/main";

const AddJob = () => {
    const [isPending,startTransition] = useTransition();
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
        const data = Object.fromEntries(formData.entries());
        console.log(data);

        startTransition(async ()=>{
            const result = await AddApplication(data);
            console.log(result);
        })
    }

  return (
    <div className="fixed bg-black/30 border w-full h-full left-0 top-0 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white w-[95%] h-full max-w-[700px] max-h-[550px] rounded-lg flex flex-col items-center gap-5 overflow-y-scroll p-5">
            <h1 className="text-4xl text-center">Add Job</h1>

            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 w-full">
                {array.map(result => (
                    <div className="flex flex-col gap-1" key={result.id}>
                        <label className="text-sm pl-2">{result.label}</label>
                        {result.name !== "level" && result.name !== "description" ? <input className="border outline-0 pl-2 py-1 text-sm" type={result.name === "date" ? "date" : "text"} name={result.name} /> : result.name === "level" ? (
                            <select name={result.name} className="bg-gray-200 py-2 px-2 text-sm rounded-xl outline-0">
                                <option value="applied">Applied</option>
                                <option value="rejected">Rejected</option>
                                <option value="interview">Interview</option>
                                <option value="meeting">Meeting</option>
                                <option value="hired">Hired</option>
                            </select>
                        ) : result.name === "description" && (
                            <textarea maxLength={300} className="border outline-0 px-1 py-1 text-sm h-[100px] resize-none" placeholder="Max 300 characters" name={result.name} />   
                        )}
                    </div>
                ))}
            </div>
            <button className="bg-blue-500 text-white  py-2 px-2 w-full max-w-[200px] rounded-lg mt-10 cursor-pointer">Submit</button>
        </form>
    </div>
  )
}

export default AddJob
