"use client";

import Filter from "@/components/Home/Filter";
import Jobs from "@/components/Home/Jobs";
import { useState } from "react";
export default function Home() {
  const [values,setValues] = useState<{title:string,value:string[]}[]>([{title:"title",value:[]},{title:"company",value:[]},{title:"date",value:[]},{title:"level",value:[]},{title:"points",value:[]},{title:"platform",value:[]}]);
  return (
    <div className="pt-25">
      <Filter values={values} setValues={setValues}/>
      <Jobs />
    </div>
  );
}
