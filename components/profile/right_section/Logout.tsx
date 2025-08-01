import { handleLogout } from "@/server/registration/logout"

const Logout = () => {
  return (
    <form action={handleLogout}>
      <button className="bg-red-500 p-3 rounded-md w-4/5 mt-3 mx-auto text-white text-xl cursor-pointer">Logout</button>
    </form>
  )
}

export default Logout
