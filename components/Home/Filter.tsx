"use client";

import { ChevronDown,ChevronUp,FilterIcon,BrushCleaningIcon  } from "lucide-react";
import React, { useState } from "react";
import Select from "../Select";
import { useRouter } from "next/navigation";

interface Props{
    values:{title:string,value:string[]}[],
    setValues:React.Dispatch<React.SetStateAction<{title:string,value:string[]}[]>>,
    fetchData:()=>void,
    setQuery:React.Dispatch<React.SetStateAction<string>>,
}

const Filter = ({values,setValues,fetchData,setQuery}:Props) => {
    const [isOpen,setIsOpen] = useState('');
    const [input,setInput] = useState('');
    const [error,setError] = useState('');
    const router = useRouter();

    const array = [
        {id:1, label:"Job Title",name:"job_title"},
        {id:2, label:"Company",name:"company"},
        {id:3, label:"Date",name:"date"},
        {id:4, label:"Level",name:"level"},
        {id:5, label:"Points",name:"points"},
        {id:6, label:"Platform",name:"platform"},
    ];

    const handleFilterBlockClick = (name:string) => {
        if(isOpen === name){
            setIsOpen('');

        }else{
            setIsOpen(name);
            if(name === "points"){
                setInput('5');
            }else{
                setInput('');
            }
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
        setQuery('');
        const val = values.find(item => item.value.length > 0);
        if(!val) return;
        const newArray = [...values];
        newArray.forEach(item => item.value = []);
        setValues(newArray);
        if(error.length > 0) setError('');
        if(isOpen.length > 0) setIsOpen('');
        fetchData();
    }

    const handleFilter = async () => {
        const val = values.find(item => item.value.length > 0);
        if(val){
            router.push('/#apps_listing');
            setIsOpen('');
            fetchData();
        }else{
            setError('At least one field is required');
        }
    }

  return (
    <div className="backdrop-blur-md bg-white/60 border border-gray-200 shadow-2xl rounded-3xl p-10 w-full mx-auto mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-8">
        <section className="flex flex-wrap gap-4 justify-center md:justify-start w-full">
          {array.map(result => (
            <div
              onClick={() => handleFilterBlockClick(result.name)}
              key={result.id}
              className={`relative group flex flex-col items-center cursor-pointer transition-all duration-200 ${isOpen === result.name ? "scale-110" : "hover:scale-105"}`}
            >
              <div className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg border border-gray-200 bg-white/80 transition-all duration-200 ${isOpen === result.name ? "ring-4 ring-blue-400" : ""}`}>
                {isOpen === result.name ? <ChevronUp className="text-blue-600" size={28}/> : <ChevronDown className="text-gray-500" size={28}/>} 
              </div>
              <span className="block mt-2 text-gray-800 font-sora font-medium text-sm text-center">
                {result.label}
              </span>
              <span className="text-blue-600 font-bold text-xs mt-1">{values.find(item => item.title === result.name)?.value.length}</span>
            </div>
          ))}
        </section>
        <section className="flex flex-col gap-3 items-end mt-6 md:mt-0">
          <button
            onClick={handleFilter}
            className="flex items-center cursor-pointer gap-2 bg-blue-600/80 hover:bg-blue-700/90 shadow-xl rounded-full text-white text-lg font-sora font-semibold px-7 py-3 transition-all active:scale-95 backdrop-blur-md"
          >
            Filter <FilterIcon />
          </button>
          {values.find(item => item.value.length > 0) && (
            <button
              onClick={handleClearButton}
              className="flex items-center cursor-pointer gap-2 bg-red-500/80 hover:bg-red-600/90 shadow-xl rounded-full text-white text-lg font-sora font-semibold px-7 py-3 transition-all active:scale-95 backdrop-blur-md"
            >
             Clear <BrushCleaningIcon />
            </button>
          )}
        </section>
      </div>
      {isOpen.length > 0 && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-10 gap-6 bg-white/70 rounded-2xl shadow-inner p-8 border border-gray-100 max-w-xl mx-auto backdrop-blur-md"
        >
          {isOpen === "level" ? (
            <Select name={isOpen}/>
          ) : (
            <>
              {isOpen === "points" && <label className="font-sora font-bold text-lg mb-2">{input}</label>}
              <input
                onChange={(e)=>{setInput(e.target.value)}}
                value={input}
                name={isOpen}
                type={isOpen === "date" ? "date": isOpen === "points" ? "range" :"text"}
                placeholder={isOpen + "..."}
                min={1}
                max={10}
                className="w-full max-w-md font-sora border-none p-4 rounded-xl outline-none focus:ring-4 focus:ring-blue-200 transition-all text-base shadow-md bg-gray-100/80"
              />
            </>
          )}
          <button
            className="bg-blue-600/80 hover:bg-blue-700/90 p-3 rounded-full w-full max-w-xs cursor-pointer mt-2 mx-auto text-white text-lg font-semibold shadow-lg transition-all active:scale-95 backdrop-blur-md"
          >
            Add
          </button>
          <div className="flex flex-col items-center mt-3 p-4 gap-2 bg-white/80 rounded-xl shadow border border-gray-100 w-full max-w-md">
            <label className="font-manrope font-semibold text-lg text-gray-700 mb-1">Added Filters:</label>
            <div className="flex flex-wrap gap-2 justify-center">
              {values.find(item => item.title === isOpen)?.value.map((value, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-sora text-sm shadow-sm border border-blue-200">{value}</span>
              ))}
            </div>
          </div>
        </form>
      )}
      <p className="text-red-500 text-lg mt-3 text-center font-semibold min-h-[28px]">{error}</p>
    </div>
  )
}

export default Filter
