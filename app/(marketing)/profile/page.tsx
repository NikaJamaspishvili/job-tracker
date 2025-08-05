"use client";

import LeftSection from "@/components/profile/LeftSection";
import RightSection from "@/components/profile/right_section/RightSection";
import { useState,useEffect } from "react";
import { getUserInfo } from "@/server/goals/main";

const Page = () => {
  const [navigation,setNavigation] = useState('goal');
  const [result,setResult] = useState<{daily_goal:number,email:string,sent:number}[]>([]);

  useEffect(()=>{
    const fetch = async () => {
      const data = await getUserInfo();
      if(data.success){
        console.log(data);
        setResult(data.result);
      }
    }
    fetch();
  },[]);

  if(result && result.length === 0) return <div>Loading...</div>
  return (
    <div className="pt-25 flex flex-col md:flex-row md:h-screen w-full">
      <LeftSection email={result[0].email} setNavigation={setNavigation} navigation={navigation}/>
      <section className="bg-white w-full flex">
      <RightSection setResult={setResult} daily_goal={result[0].daily_goal} sent={result[0].sent} navigation={navigation}/>
      </section>
    </div>
  )
}

export default Page;
