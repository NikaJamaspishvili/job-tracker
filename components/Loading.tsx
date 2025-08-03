import { Loader } from "lucide-react"

const Loading = () => {
  return (
    <div className="fixed w-full h-full  top-0 left-0 flex flex-col items-center justify-center bg-white gap-3 z-11">
      <Loader className="w-[70px] h-[70px] animate-spin"/>
      <p className="text-2xl">Loading</p>
    </div>
  )
}

export default Loading
