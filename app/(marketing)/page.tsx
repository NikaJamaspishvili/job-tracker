"use client";

import Filter from "@/components/Home/Filter";
import Jobs from "@/components/Home/Jobs";
import Loading from "@/components/Loading";
import { useEffect, useState,useTransition } from "react";
import { useMyContext } from "@/context/Mycontext";
import { getApplications } from "@/server/applications/main";
import AddJob from "@/components/Home/AddJob";
import { Application } from "@/schema/applications";

export default function Home() {
  const [values,setValues] = useState<{title:string,value:string[]}[]>([{title:"job_title",value:[]},{title:"company",value:[]},{title:"date",value:[]},{title:"level",value:[]},{title:"points",value:[]},{title:"platform",value:[]}]);
  const [apps,setApps] = useState<Application[]>([]);
  const [query,setQuery] = useState<string>('');
  const [showButton,setShowButton] = useState(true);
  const [showFilter,setShowFilter] = useState(false);
  
  const [isPending,startTransition] = useTransition();
  const [isPending2,startTransition2] = useTransition();

  async function fetchData(){
    //this function is used for fetching the data on initial load and after filtering.
    const newArray = values.filter(item => item.value.length > 0);

    let query = "select id,job_title,company,platform,points,level,DATE_FORMAT(date, '%Y-%m-%d') as date from applications where userId=?";
    if(newArray.length !== 0){
        newArray.forEach((item) => {
                query += ` and ${item.title} in (${item.value.map((key:string) => `'${key}'`).join(',')})`;
        })
    }
    setQuery(query);
    query+=" order by id desc limit 5";
    console.log(query);
    startTransition2(async ()=>{
      const data = await getApplications(query);
    
      if(data.success){
        return setApps(data.data);
      }
    })
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

  const {showAddJob,setShowAddJob} = useMyContext();
  return (
    <div className="pt-25">
      {showAddJob && <AddJob setShowAddJob={setShowAddJob} setApps={setApps}/>}
      {showFilter && <Filter values={values} setValues={setValues} fetchData={fetchData}/>}
      <Jobs apps={apps} setShowAddJob = {setShowAddJob} isPending2={isPending2} setApps={setApps} showButton={showButton} fetchMoreData={fetchMoreData} isPending={isPending} showFilter={showFilter} setShowFilter={setShowFilter}/>
    </div>
  );
}
