"use client";

import Navbar from "@/components/Navbar";
import "../globals.css";
import { useState } from "react";
import { MyContext } from "@/context/Mycontext";
import {Manrope,Sora} from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400","600","700"],
  variable: "--font-manrope",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300","400","600","700"],
  variable: "--font-sora",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showAddJob,setShowAddJob] = useState(false);
  return (
    <html lang="en">
      <body className="bg-white">
        <div className={`w-[95%] ${manrope.variable} ${sora.variable} max-w-[1200px] min-h-screen flex mx-auto flex-col`}>
        <MyContext.Provider value={{showAddJob,setShowAddJob}}>
        <Navbar />
        {children}
        </MyContext.Provider>
        </div>
      </body>
    </html>
  );
}
