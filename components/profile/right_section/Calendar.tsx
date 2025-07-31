import Goal from "./Goal"

const Calendar = () => {
  const array = [
    {id:1,goal:3,sent:1,day:30,date:"2025-10-12"},
    {id:2,goal:5,sent:2,day:29,date:"2025-10-11"},
    {id:3,goal:5,sent:4,day:28,date:"2025-10-10"},
  ]
  return (
    <div className="flex flex-col">
        <select className="p-2 outline-0 bg-gray-500 text-white rounded-lg mx-auto">
          <option value="30day">Last 30 day</option>
          <option value="14day">Last 14 day</option>
          <option value="7day">Last 7 day</option>
          <option value="3day">Last 3 day</option>
        </select>

        <section className="flex flex-col gap-10 pt-10">
          {array.map(result => (
            <div key={result.id} className="text-center flex flex-col gap-5">
              <h1 className="text-xl font-bold flex gap-2 justify-center">Day <span className="text-blue-500">{result.day}</span></h1>
              <Goal date={result.date} goal={result.goal} sent={result.sent}/>
            </div>
          ))}
        </section>
    </div>
  )
}

export default Calendar
