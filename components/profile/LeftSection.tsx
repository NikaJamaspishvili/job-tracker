import { Mail } from "lucide-react";

const LeftSection = ({setNavigation,navigation,email}:{setNavigation:React.Dispatch<React.SetStateAction<string>>,navigation:string,email:string}) => {
  const array = [
    {id:1, label:"Goal",value:"goal"},
    {id:2, label:"Calendar",value:"calendar"},
    {id:3, label:"Logout",value:"logout"},
  ];

  return (
    <section className="flex flex-col py-6 my-5 gap-4 bg-gradient-to-br from-white via-blue-50/30 to-indigo-100/30 border border-white/20 shadow-xl backdrop-blur-sm p-6 rounded-2xl rounded-r-none items-center w-full relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 w-full">
        <h1 className="text-lg font-medium outline-0 bg-white/80 backdrop-blur-sm cursor-default text-center flex items-center justify-center gap-3 rounded-xl w-full mx-auto p-4 text-gray-700 shadow-md border border-white/30">
          <Mail className="w-5 h-5 text-blue-500" /> 
          <span className="truncate">{email}</span>
        </h1>
        
        <div className="w-full flex flex-col gap-3 mt-6 [&>button]:cursor-pointer">
          {array.map(result => (
            <button 
              key={result.id} 
              onClick={()=>setNavigation(result.value)} 
              className={`w-full p-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                navigation === result.value 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border-0" 
                  : "bg-white/80 backdrop-blur-sm text-gray-700 border border-white/30 hover:bg-white hover:shadow-md hover:border-blue-200"
              }`}
            >
              {result.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LeftSection
