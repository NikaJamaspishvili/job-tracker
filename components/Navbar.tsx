"use client";

import Image from "next/image"
import logo from "@/public/logo.png";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/context/Mycontext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const { setShowAddJob } = useMyContext();
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 left-0 w-full bg-blue-500 px-5 py-2 z-10">
      <div className="flex items-center justify-between max-w-[1200px] w-[95%] mx-auto">
        <Image onClick={() => router.push("/")} src={logo} alt="logo" className="w-20 cursor-pointer rounded-full" />
        {/* Hamburger menu for mobile */}
        <button
          className="sm:hidden text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
        {/* Desktop links */}
        <section className="hidden sm:flex gap-7 [&>a]:cursor-pointer [&>a]:font-manrope font-semibold text-white [&>a]:relative [&>a]:after:content-[''] [&>a]:after:block [&>a]:after:h-[2px] [&>a]:after:bg-white [&>a]:after:w-0 [&>a]:after:transition-all [&>a]:after:duration-300 [&>a]:hover:after:w-full [&>a]:after:absolute [&>a]:after:left-0 [&>a]:after:bottom-[-2px]">
          <a onClick={() => router.push("/")}>Home</a>
          <a>Events</a>
          <a onClick={() => router.push("/about")}>How it works?</a>
          <a onClick={() => { window.location.pathname !== "/" && router.push("/"); setShowAddJob(true); }}>Add Application</a>
          <a onClick={() => router.push("/profile")}>Profile</a>
        </section>
      </div>
      {/* Mobile dropdown menu */}
      {open && (
        <section className="sm:hidden flex flex-col gap-4 bg-blue-500 px-6 py-4 mt-2 rounded-b-xl shadow-lg animate-fade-in text-white font-manrope font-semibold text-lg">
          <a onClick={() => { setOpen(false); router.push("/"); }}>Home</a>
          <a onClick={() => setOpen(false)}>Events</a>
          <a onClick={() => { setOpen(false); router.push("/about"); }}>How it works?</a>
          <a onClick={() => { setOpen(false); window.location.pathname !== "/" && router.push("/"); setShowAddJob(true); }}>Add Application</a>
          <a onClick={() => { setOpen(false); router.push("/profile"); }}>Profile</a>
        </section>
      )}
    </div>
  );
}

export default Navbar
