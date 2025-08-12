"use client";

import Image from "next/image"
import logo from "@/public/logo.png";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/context/Mycontext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface Props{
  setShowEvents:React.Dispatch<React.SetStateAction<boolean>>,
}

const Navbar = ({setShowEvents}:Props) => {
  const router = useRouter();
  const { setShowAddJob } = useMyContext();
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-5 py-3 z-10 shadow-lg backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between max-w-[1200px] w-[95%] mx-auto">
        <Image 
          onClick={() => router.push("/")} 
          src={logo} 
          alt="logo" 
          className="w-20 cursor-pointer rounded-full hover:scale-105 transition-transform duration-300 shadow-lg" 
        />
        
        {/* Hamburger menu for mobile */}
        <button
          className="sm:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
        
        {/* Desktop links */}
        <section className="hidden sm:flex gap-8 [&>a]:cursor-pointer [&>a]:font-medium text-white/90 [&>a]:relative [&>a]:after:content-[''] [&>a]:after:block [&>a]:after:h-[2px] [&>a]:after:bg-white [&>a]:after:w-0 [&>a]:after:transition-all [&>a]:after:duration-300 [&>a]:hover:after:w-full [&>a]:after:absolute [&>a]:after:left-0 [&>a]:after:bottom-[-4px] [&>a]:hover:text-white [&>a]:transition-colors [&>a]:duration-300">
          <a onClick={() => router.push("/")} className="hover:scale-105 transition-transform duration-200">Home</a>
          <a onClick={()=> setShowEvents(true)} className="hover:scale-105 transition-transform duration-200">Events</a>
          <a onClick={()=> router.push("/emails")} className="hover:scale-105 transition-transform duration-200">Emails</a>
          <a onClick={() => router.push("/about")} className="hover:scale-105 transition-transform duration-200">How it works?</a>
          <a onClick={() => { window.location.pathname !== "/" && router.push("/"); setShowAddJob(true); }} className="hover:scale-105 transition-transform duration-200">Add Application</a>
          <a onClick={() => router.push("/profile")} className="hover:scale-105 transition-transform duration-200">Profile</a>
        </section>
      </div>
      
      {/* Mobile dropdown menu */}
      {open && (
        <section className="sm:hidden flex flex-col gap-3 bg-gradient-to-b from-blue-600/95 to-indigo-700/95 backdrop-blur-md px-6 py-5 mt-2 rounded-b-2xl shadow-2xl border border-white/10 animate-in slide-in-from-top-2 duration-300 text-white font-medium text-lg">
          <a 
            onClick={() => { setOpen(false); router.push("/"); }} 
            className="py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer hover:scale-105"
          >
            Home
          </a>
          <a 
            onClick={() => setOpen(false)} 
            className="py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer hover:scale-105"
          >
            Events
          </a>
          <a 
            onClick={() => { setOpen(false); router.push("/about"); }} 
            className="py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer hover:scale-105"
          >
            How it works?
          </a>
          <a 
            onClick={() => { setOpen(false); window.location.pathname !== "/" && router.push("/"); setShowAddJob(true); }} 
            className="py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer hover:scale-105"
          >
            Add Application
          </a>
          <a 
            onClick={() => { setOpen(false); router.push("/profile"); }} 
            className="py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer hover:scale-105"
          >
            Profile
          </a>
        </section>
      )}
    </div>
  );
}

export default Navbar
