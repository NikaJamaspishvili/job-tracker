import { Mail } from "lucide-react";

const LeftSection = ({setNavigation,navigation,email}:{setNavigation:React.Dispatch<React.SetStateAction<string>>,navigation:string,email:string}) => {
  const array = [
    {id:1, label:"Goal",value:"goal"},
    {id:2, label:"Calendar",value:"calendar"},
    {id:3, label:"Logout",value:"logout"},
  ];

  return (
    <section className="flex flex-col py-3 my-5 gap-2 bg-white border-black border border-r-0 p-3 rounded-lg rounded-r-none items-center w-full">
        <h1 className="text-md outline-0 bg-white cursor-default text-center flex items-center justify-center gap-3 rounded-md w-4/5 mx-auto p-3 text-gray-500"><Mail /> {email}</h1>
      <div className="w-full flex flex-col gap-2 mt-3 [&>button]:cursor-pointer">
        {array.map(result => (
          <button key={result.id} onClick={()=>setNavigation(result.value)} className={`w-full p-3 rounded-xl font-manrope ${navigation === result.value ? "bg-blue-500 text-white border-0": "bg-white text-black border"}`}>{result.label}</button>
        ))}
      </div>
    </section>
  )
}

export default LeftSection
