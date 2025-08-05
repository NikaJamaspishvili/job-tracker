import { handleLogout } from "@/server/registration/logout"
import { LogOutIcon } from "lucide-react"

const Logout = () => {
  return (
    <form action={handleLogout} className="flex border w-full h-full items-center justify-center flex-col gap-5">
      <h1 className="text-2xl font-manrope font-bold">Are you sure you want to logout?</h1>
      <button className="bg-red-500 p-3 rounded-md w-4/5 max-w-[400px] h-fit mt-3 text-white text-2xl font-sora font-bold cursor-pointer flex items-center justify-center gap-3">Logout <LogOutIcon /></button>
    </form>
  )
}

export default Logout
