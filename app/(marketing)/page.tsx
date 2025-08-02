"use client";

import Filter from "@/components/Home/Filter";
import Jobs from "@/components/Home/Jobs";
import { useEffect, useState,useTransition } from "react";

import { getApplications } from "@/server/applications/main";

export default function Home() {
  const [values,setValues] = useState<{title:string,value:string[]}[]>([{title:"job_title",value:[]},{title:"company",value:[]},{title:"date",value:[]},{title:"level",value:[]},{title:"points",value:[]},{title:"platform",value:[]}]);
  const [apps,setApps] = useState<any>([]);
  const [query,setQuery] = useState<string>('');
  const [showButton,setShowButton] = useState(true);
  
  const [isPending,startTransition] = useTransition();

  async function fetchData(){
    //this function is used for fetching the data on initial load and after filtering.
    const newArray = values.filter(item => item.value.length > 0);

    let query = "select id,job_title,company,platform,points,level,date from applications where userId=?";
    if(newArray.length !== 0){
        newArray.forEach((item:any,index:number) => {
                query += ` and ${item.title} in ('${item.value.join(",")}')`;
        })
    }
    setQuery(query);
    query+=" order by id desc limit 5";
    console.log(query);

    const data = await getApplications(query);
    
    if(data.success){
      return setApps(data.data as any);
    }
  }

  async function fetchMoreData(){
    //this function is used for fetching the data after scroll load in order to keep the same filtering active.
    let alteredQuery = query;
    console.log(apps);
    alteredQuery+=` and id < ${apps[apps.length-1].id} order by id desc limit 5`;
    startTransition(async ()=>{
      const data = await getApplications(alteredQuery);
      if(data.success){
        if(data.data.length === 0) return setShowButton(false);
        const newApps = [...apps,...data.data];
        return setApps(newApps);
      }
    })
  }

  useEffect(()=>{
    fetchData();
  },[])
  
  return (
    <div className="pt-25">
      <Filter values={values} setValues={setValues} fetchData={fetchData}/>
      <Jobs apps={apps} setApps={setApps} showButton={showButton} fetchMoreData={fetchMoreData} isPending={isPending}/>
    </div>
  );
}
