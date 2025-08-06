const Select = ({name,value}:{name:string,value?:string}) => {
  
    const options = [
        {id:0,name:"Applied",value:"applied"},
        {id:1,name:"Rejected",value:"rejected"},
        {id:2,name:"Interview",value:"interview"},
        {id:3,name:"Hired",value:"hired"},
    ]

    if(value){
        const item = options.find(item => item.value === value) as {id:number,name:string,value:string};
        const index = item?.id as number;
        const item_to_change = options[0];
        options[0] = item;
        options[index] = item_to_change 
    }

    return (
    <select name={name} className="bg-gray-200 py-2 px-2 text-sm rounded-xl outline-0">
        {options.map(result=>(
            <option key={result.id} value={result.value}>{result.name}</option>
        ))}
    </select>
  )
}

export default Select
