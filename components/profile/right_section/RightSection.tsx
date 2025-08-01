import Calendar from "./Calendar";
import Daily_Goal from "./Daily_Goal";
import Logout from "./Logout";

const RightSection = ({navigation,daily_goal,sent,setResult}:{navigation:string,daily_goal:number,sent:number,setResult:React.Dispatch<React.SetStateAction<any>>}) => {

  return (
    <section className="w-full overflow-y-auto">
      {navigation === "goal" && <div className="border w-full h-full items-centers flex"><Daily_Goal setResult={setResult} daily_goal={daily_goal} sent={sent}/></div>}
      {navigation === "calendar" && <Calendar />}
      {navigation === "logout" && <Logout />}
    </section>
  )
}

export default RightSection
