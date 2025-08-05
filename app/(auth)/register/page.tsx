"use client";

import Register from "@/components/Register"
import { useState } from "react";

function Page() {
  const [pageType,setPageType] = useState("login");
  return (
      <Register pageType={pageType} setPageType={setPageType}/>
  )
}

export default Page;
