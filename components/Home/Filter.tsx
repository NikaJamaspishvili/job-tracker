"use client";

import { ChevronDown,ChevronUp } from "lucide-react";
import React, { useState } from "react";
import Message from "../errors/Message";

interface Props{
    values:{title:string,value:string[]}[],
    setValues:React.Dispatch<React.SetStateAction<{title:string,value:string[]}[]>>,
    fetchData:()=>void,
}

const Filter = ({values,setValues,fetchData}:Props) => {
    const [isOpen,setIsOpen] = useState('');
    const [input,setInput] = useState('');
    const [error,setError] = useState('');

    const array = [
        {id:1, label:"job_title",name:"job_title"},
        {id:2, label:"company",name:"company"},
        {id:3, label:"date",name:"date"},
        {id:4, label:"level",name:"level"},
        {id:5, label:"points",name:"points"},
        {id:6, label:"platform",name:"platform"},
    ];

    const handleFilterBlockClick = (name:string) => {
        if(isOpen === name){
            setIsOpen('');

        }else{
            setIsOpen(name);
            setInput('');
        }
        if(error.length > 0) setError('');
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setInput('');
        const formData = new FormData(e.target as HTMLFormElement);
        const value = formData.get(isOpen);
        //console.log(value,isOpen);
        if(value === null || value === undefined || value === ""){
            if(error.length > 0) return;
            return setError("Field is required");
        }

        const newArray = [...values];
        newArray.find(item => item.title === isOpen)?.value.push(value as string);
        setValues(newArray);
        //console.log(newArray);
    }

    const handleClearButton = () => {
        const newArray = [...values];
        newArray.forEach(item => item.value = []);
        setValues(newArray);
        if(error.length > 0) setError('');
        if(isOpen.length > 0) setIsOpen('');
    }

    const handleFilter = async () => {
        const val = values.find(item => item.value.length > 0);
        if(val){
            fetchData();
        }else{
            setError('At least one field is required');
        }
    }

  return (
    <div>
        <div className="flex justify-between">
            <section className="flex gap-3">
                {array.map(result => (
                    <div onClick={()=>handleFilterBlockClick(result.name)} key={result.id} className="cursor-pointer flex items-center">
                        <p className={`${isOpen === result.name ? "text-red-500" : ""}`}>{result.label}</p>
                        <span className="text-blue-500">({values.find(item => item.title === result.name)?.value.length})</span>
                        {isOpen === result.name ? <ChevronUp className="ml-1"/> : <ChevronDown className="ml-1"/>}
                    </div>
                ))}
            </section>

            <section className="flex gap-3">
                <button onClick={handleFilter} className="bg-blue-500 p-3 rounded-md text-white cursor-pointer">filter</button>
                <button onClick={handleClearButton} className="bg-red-500 p-3 rounded-md text-white cursor-pointer">clear</button>
            </section>
        </div>
        {isOpen.length > 0 && 
        (
        <form onSubmit={handleSubmit} className="flex flex-col items-center [&>input]:border [&>input]:p-2 [&>input]:rounded-lg [&>input]:outline-0">
        {isOpen === "level" ? 
        (
            <select name={isOpen} className="bg-gray-200 py-2 px-2 text-sm rounded-xl outline-0">
                <option value="applied">Applied</option>
                <option value="rejected">Rejected</option>
                <option value="interview">Interview</option>
                <option value="meeting">Meeting</option>
                <option value="hired">Hired</option>
            </select>
        ) :
        <>
        {isOpen === "points" && <label>{input}</label>}
        <input onChange={(e)=>{setInput(e.target.value)}} value={input} name={isOpen} type={isOpen === "date" ? "date": isOpen === "points" ? "range" :"text"} placeholder={isOpen + "..."} min={1} max={10} />
        </>
        }
        <button className="bg-blue-500 p-2 rounded-md w-full max-w-[300px] cursor-pointer mt-3 mx-auto text-white text-xl">Add</button>
        <p className="mt-5">{values.find(item => item.title === isOpen)?.value.map(value => value).join(", ")}</p>
        </form>
        )
        }
        <p className="text-red-500 text-lg mt-3 text-center">{error}</p>
    </div>
  )
}

export default Filter
