"use client";

import Image from "next/image"
import NotFoundImage from "@/public/NotFound.png"
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <section className="max-w-[1000px] w-full h-4/5 rounded-xl shadow-2xl bg-white flex flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-2xl text-center">Couldn't find the page...</h1>
      <Image className="w-[250px] mt-2" src={NotFoundImage} alt="not found page icon"/>
      <button onClick={()=>router.push('/')} className="cursor-pointer hover:scale-101 transition-all duration-120 text-black p-3 text-lg flex items-center justify-center rounded-xl gap-2 bg-blue-500 text-white">Back to main page<ArrowUpRight className="text-2xl"/></button>
      </section>
    </div>
  )
}

export default NotFound