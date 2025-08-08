import Image from "next/image";
import register from "@/public/about/image(1).png";
import home from "@/public/about/image(2).png";
import profile from "@/public/about/image(3).png";
import addjob from "@/public/about/image(4).png";

export default function AboutPage() {
  const list_array_1 = [
    "Keep all your job applications organized in one place.",
    "Filter your applications by job title, company name, and more.",
    "Set daily goals for how many applications you want to send.",
    "See how many applications you've sent each day.",
    "Track your progress over time and stay motivated.",
  ];

  const list_array_2 = [
    { title: "Job Title", body: "The position you're applying for." },
    { title: "Company", body: "The company you're submitting your application to." },
    { title: "Platform", body: "Where you found the job posting (e.g., LinkedIn, Jobs.ge, Jobs.com, etc.)." },
    { title: "Link to Application", body: "The direct link to the job posting." },
    { title: "Points", body: "Your personal estimate (out of 10) of how likely you are to get the job." },
    { title: "Level", body: "The current status of your application (e.g., Applied, Interview, Hired, Rejected)." },
    { title: "Date", body: "The exact date you submitted your application." },
    { title: "Description", body: "Any notes or details you'd like to add about this application." }
  ];

  const array = [
    {
      id: 1,
      title: "Registering",
      description: "Registering is super easy, you can use either the google signup or the traditional email and password.",
      image: register
    },
    {
      id: 2,
      title: "Home Page",
      description: "Here you can see all your job applications in one place, and you can filter them by job title, company name, and more.",
      image: home
    },
    {
      id: 3,
      title: "Profile",
      description: "Here you can set your daily goals for how many applications you want to send daily, and see how many applications you've sent each day.",
      image: profile
    },
    {
      id: 4,
      title: "Add Applications",
      description: "Here you have to fill out the forms about job, to not get confused this is what each of them means.",
      image: addjob,
      list: list_array_2
    }
  ];  
  
  
  return (
    <div className="bg-white pt-30 pb-12 min-h-screen flex flex-col gap-15">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mb-16 px-5 py-15 rounded-2xl relative">
        <h1 className="text-3xl z-1 md:text-5xl font-bold text-black font-manrope max-w-[500px] tracking-wide leading-snug">Track your job applications as simple as possible.</h1>
      </section>
      <section className="flex flex-col max-w-[700px] items-center mx-auto gap-4 justify-center text-center mb-16 px-4">
        <h1 className="text-3xl font-bold font-manrope max-w-[600px]">What does it offer?</h1>
        <p className="font-sora text-md text-gray-600 ">
          I realized how difficult it can be to keep track of all the job applications you send out.
          That’s why I built this site — to make the process simple and organized.
        </p>
        <ul>
          {list_array_1.map(result =>(
            <li key={result} className="text-md font-sora text-gray-600 list-disc text-left">{result}</li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-10">
      <h1 className="font-manrope font-bold text-4xl text-center mb-7">Simple Tutorial</h1>

      {array.map(result => (
              <section key={result.id} className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 px-4">
              <div className={`${result.id % 2 === 0 ? "md:order-2" : "md:order-1"} md:w-1/2 mb-6 md:mb-0`}>
                <h2 className="text-2xl font-manrope mb-2">Step {result.id}: <span className="ml-1 font-bold font-sora">{result.title}</span></h2>
                <p className="text-gray-600">{result.description}</p>
                <ul className="flex flex-col gap-2 mt-3">
                {result.list?.map((item,index) => (
                  <li key={index} className="font-sora text-gray-600 list-disc text-left"><span className="font-bold">{item.title}: </span> {item.body}</li>
                ))}
                </ul>
              </div>
              <div className={`${result.id % 2 === 0 ? "md:order-1" : "md:order-2"} md:w-1/2 flex justify-center`}>
                <Image src={result.image} alt={result.title + " image"} className="rounded-lg shadow-md w-full max-w-[500px]" />
              </div>
            </section>
      ))}
      </section>
    </div>
  );
}
