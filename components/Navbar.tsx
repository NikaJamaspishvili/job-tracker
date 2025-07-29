import Image from "next/image"
import notfound from "@/public/NotFound.png";

const Navbar = () => {
  return (
    <div className=" fixed top-0 left-0 w-full bg-gray-200 px-5 py-2">
      <div className="flex items-center justify-between max-w-[1200px] w-[95%] mx-auto">
      <Image src={notfound} alt="logo" className="w-20" />

      <section className="flex gap-5">
        <a>Events</a>
        <a>Add Job</a>
        <a>Profile</a>
      </section>
      </div>
    </div>
  )
}

export default Navbar
