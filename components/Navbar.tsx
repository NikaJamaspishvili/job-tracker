"use client";

import Image from "next/image"
import notfound from "@/public/NotFound.png";
import { useRouter } from "next/navigation";

const Navbar = ({setShowAddJob}:{setShowAddJob:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const router = useRouter();
  return (
    <div className=" fixed top-0 left-0 w-full bg-gray-200 px-5 py-2">
      <div className="flex items-center justify-between max-w-[1200px] w-[95%] mx-auto">
      <Image onClick={()=>router.push("/")} src={notfound} alt="logo" className="w-20 cursor-pointer" />

      <section className="flex gap-5 [&>a]:cursor-pointer">
        <a onClick={()=>router.push("/")}>Home</a>
        <a>Events</a>
        <a onClick={()=>setShowAddJob(true)}>Add Job</a>
        <a onClick={()=>router.push("/profile")}>Profile</a>
      </section>
      </div>
    </div>
  )
}

export default Navbar
