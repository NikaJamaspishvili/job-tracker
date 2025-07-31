const LeftSection = ({setNavigation,navigation,email}:{setNavigation:React.Dispatch<React.SetStateAction<string>>,navigation:string,email:string}) => {
  const array = [
    {id:1, label:"Goal",value:"goal"},
    {id:2, label:"Calendar",value:"calendar"},
    {id:3, label:"Logout",value:"logout"},
  ];

  return (
    <section className="flex flex-col py-3 gap-2 bg-gray-300 items-center w-full">
      <div className="w-full flex flex-col items-center md:items-start gap-1">
        <h1 className="text-xl">Email:</h1>
        <input className="text-md outline-0 bg-white cursor-default text-center border rounded-md w-4/5 p-2" type="text" placeholder={email} readOnly />
      </div>

      <div className="w-full flex flex-col gap-1 mt-3 [&>button]:cursor-pointer">
        {array.map(result => (
          <button key={result.id} onClick={()=>setNavigation(result.value)} className={`w-full p-3 text-white ${navigation === result.value ? "bg-blue-500": "bg-gray-500"}`}>{result.label}</button>
        ))}
      </div>
    </section>
  )
}

export default LeftSection
