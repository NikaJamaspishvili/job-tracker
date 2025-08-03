import { X } from "lucide-react"
import { getSingleApplication, updateApplication } from "@/server/applications/main"
import { useEffect, useState,useTransition } from "react"
import Loading from "../Loading";

interface Props{
    popup:boolean | number,
    setPopup:React.Dispatch<React.SetStateAction<boolean | number>>,
    setApps:React.Dispatch<React.SetStateAction<any[]>>
}

const Job_Details = ({popup,setPopup,setApps}:Props) => {
    const [object,setObject] = useState<any>(null);
    const [isEditable,setIsEditable] = useState(false);
    const [isPending,startTransition] = useTransition();
    const [isPending2,startTransition2] = useTransition();
    const [error,setError] = useState('');
    const [value,setValue] = useState(0);

    useEffect(()=>{
        async function fetchData(){
            const result = await getSingleApplication(popup as number);
            if(result.success){
                setObject(result.data[0]);
                console.log(result.data[0].points);
                setValue(result.data[0].points);
            }
        }
        fetchData();
    },[])

    if(object === null) return <Loading />

    const array = [
        {id:1,label:"job title",name:"job_title",value:object.job_title,type:"text"},
        {id:2,label:"company",name:"company",value:object.company,type:"text"},
        {id:3,label:"platform",name:"platform",value:object.platform,type:"text"},
        {id:4,label:"points",name:"points",value:object.points,type:"range"},
        {id:5,label:"level",name:"level",value:object.level,type:"text"},
        {id:6,label:"date",name:"date",value:object.date,type:"date"},
        {id:7,label:"description",name:"description",value:object.description,type:"text"},
        {id:8,label:"job link",name:"job_link",value:object.job_link,type:"url"},
    ]

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        const editedData:any = {};

        console.log(object);
        console.log(data);
        for(const key of Object.keys(data)){
            const key1 = String(data[key]).trim();
            const key2 = String(object[key]).trim();
            if(key1 !== key2 && key1 !== ""){
                editedData[key] = key1;
                object[key] = key1;
            }
        }

        console.log(editedData);

        if(Object.keys(editedData).length === 0){
            return setError("No changes were made");
        } 

        startTransition(async () => {
            const result = await updateApplication(object.id,editedData);
            if(result.success){
                setApps((prev)=>{
                    const array = [...prev];
                    const index = array.indexOf(array.find(item => item.id === object.id));
                    array[index] = object;
                    return array;
                })
                setPopup(false);
            }
        })
    }

    // const handleDelete = async () => {
    //     startTransition2(async ()=>{
    //         const result = await deleteApplication(object.id);
    //         if(result.success){
    //             setApps((prev)=>{
    //                 const array = [...prev];
    //                 const index = array.indexOf(array.find(item => item.id === object.id));
    //                 array.splice(index,1);
    //                 return array;
    //             })
    //             setPopup(false);
    //         }
    //     });
    // }

  return (
    <div className="fixed z-10 bg-white shadow-2xl shadow-black w-4/5 h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-xl">
        <X onClick={()=>setPopup(false)} className="absolute top-3 right-3 text-red-500 w-[30px] h-[30px] cursor-pointer"/>
        <form onSubmit={handleSubmit} className="w-4/5 flex flex-col items-center gap-3">
        <section className="grid grid-cols-3 w-full gap-3">
            {array.map(result => (
                <div key={result.id} className="flex flex-col gap-2 bg-gray-300 rounded-md p-3">
                    <label>{result.label}</label>
                    {result.name === "points" && <p>{value}</p>}
                    <input min={1} max={10} defaultValue={result.value} onChange={(e)=>{result.name === "points" && setValue(Number(e.target.value))}} className="outline-0 border rounded-md p-2" name={result.name} readOnly={isEditable ? false : true} type={isEditable ? result.type : "text"} />
                </div>
            ))}
        </section>
        {isEditable && <button className="w-full max-w-[300px] p-2 bg-yellow-600 text-white text-xl cursor-pointer rounded-md">{isPending ? "loading..." : "update"}</button>}
        {error.length>0 && <p className="text-red-500">{error}</p>}
        </form>
        <div className="w-full flex gap-3 items-center justify-center mt-5">
            <button onClick={()=>{setIsEditable(!isEditable); error && setError("");}} className="mt-3 bg-blue-500 max-w-[300px] p-3 rounded-md w-4/5 text-white text-xl cursor-pointer">{isEditable ? "close" : "edit"}</button>
            {/*<button onClick={handleDelete} className="mt-3 bg-red-500 max-w-[300px] p-3 rounded-md w-4/5 text-white text-xl cursor-pointer">{isPending2 ? "loading..." : "delete"}</button>*/}        </div>
    </div>
  )
}

export default Job_Details
