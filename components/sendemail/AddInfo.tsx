import { useRouter } from "next/navigation"

interface Props{
    emailId:number,
    setShowAddJob: React.Dispatch<React.SetStateAction<boolean>>,
  }

const AddInfo = ({emailId,setShowAddJob}:Props) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-md w-full mx-4">
        <section className="flex flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2 font-sora">Complete Your Application</h1>
            <p className="text-gray-600 text-base">Would you like to add this job to your applications?</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={()=>setShowAddJob(true)}
              className="flex-1 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-6 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Yes, Add
            </button>
            <button 
              onClick={()=>router.push("/emails/?id="+emailId)}
              className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-6 rounded-full transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              No, Continue
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AddInfo
