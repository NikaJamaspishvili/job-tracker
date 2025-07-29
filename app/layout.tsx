"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { useState } from "react";
import AddJob from "@/components/Home/AddJob";

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
        <Navbar setShowAddJob={setShowAddJob}/>
        {showAddJob && <AddJob setShowAddJob={setShowAddJob}/>}
        {children}
        </div>
      </body>
    </html>
  );
}
