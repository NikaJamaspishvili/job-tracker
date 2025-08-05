"use client";

import Image from "next/image"
import notfound from "@/public/NotFound.png";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/context/Mycontext";

const Navbar = () => {
  const router = useRouter();
  const {setShowAddJob} = useMyContext();
  return (
    <div className=" fixed top-0 left-0 w-full bg-blue-500 px-5 py-2 z-10">
      <div className="flex items-center justify-between max-w-[1200px] w-[95%] mx-auto">
      <Image onClick={()=>router.push("/")} src={notfound} alt="logo" className="w-20 cursor-pointer rounded-full" />

      <section className="flex gap-5 [&>a]:cursor-pointer [&>a]:font-manrope font-semibold text-white">
        <a onClick={()=>router.push("/")}>Home</a>
        <a>Events</a>
        <a onClick={()=>{window.location.pathname !== "/" && router.push("/");setShowAddJob(true)}}>Add Job</a>
        <a onClick={()=>router.push("/profile")}>Profile</a>
      </section>
      </div>
    </div>
  )
}

export default Navbar
