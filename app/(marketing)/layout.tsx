"use client";

import Navbar from "@/components/Navbar";
import "../globals.css";
import { useState } from "react";
import { MyContext } from "@/context/Mycontext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showAddJob,setShowAddJob] = useState(false);
  return (
    <html lang="en">
      <body className="bg-white">
        <div className="w-[95%] max-w-[1200px] min-h-screen flex mx-auto flex-col">
        <MyContext.Provider value={{showAddJob,setShowAddJob}}>
        <Navbar />
        {children}
        </MyContext.Provider>
        </div>
      </body>
    </html>
  );
}
