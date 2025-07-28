"use client";

import Register from "@/components/Register"
import { useState } from "react";

function page() {
  const [pageType,setPageType] = useState("login");
  return (
    <Register pageType={pageType} setPageType={setPageType}/>
  )
}

export default page
