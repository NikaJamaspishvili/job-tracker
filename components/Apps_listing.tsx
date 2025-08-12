import { Application } from "@/schema/applications";
import Job_Details from "./Home/Job_Details"
import { useEffect, useState, useTransition } from "react"
import { PackageOpenIcon, Eye, Edit } from "lucide-react";
import Loading from "./Loading";
import { getApplications } from "@/server/applications/main";

interface Props{
  apps:Application[]
  setApps:React.Dispatch<React.SetStateAction<Application[]>>
  isPending:boolean,
  query?:string,
  hasMoreData?:boolean,
  setHasMoreData?:React.Dispatch<React.SetStateAction<boolean>>,
}

const Apps_listing = ({apps,setApps,isPending,query,hasMoreData,setHasMoreData}:Props) => {
  const colors_for_level: {[k: string]:string} = {
    applied:"bg-yellow-500",
    interview:"bg-purple-300",
    hired:"bg-green-300",
    rejected:"bg-red-300",
  }

  const [popup,setPopup] = useState<number | boolean | File | string>(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, startLoadingMore] = useTransition();
  const itemsPerPage = 5;

  const handleEdit = (appId: number) => {
    setEditMode(true);
    setPopup(appId);
  };

  const handleView = (appId: number) => {
    setEditMode(false);
    setPopup(appId);
  };

  // Calculate pagination display
  const totalPages = Math.ceil(apps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApps = apps.slice(startIndex, endIndex);

  useEffect(()=>{
    if(apps.length <= 5){
        setCurrentPage(1);      
    }
  },[apps]);

  // Handle page navigation with data fetching
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = async () => {
    // If we're at the last page and there might be more data, fetch it
    if (currentPage === totalPages && hasMoreData && apps.length > 0) {
      const lastApp = apps[apps.length - 1];
      startLoadingMore(async () => {
        try {
          // Use the same query logic as your existing fetchMoreData
          const newQuery =query && query.length > 0 ? query+` and id < ${lastApp.id} order by id desc limit ${itemsPerPage}` : `select id,job_title,company,platform,points,level,DATE_FORMAT(date, '%Y-%m-%d') as date from applications where userId=? and id < ${lastApp.id} order by id desc limit ${itemsPerPage}`;
          console.log("new query is: ",newQuery);
          const data = await getApplications(newQuery);
          console.log(data);
          if(data.data.length < 5 && setHasMoreData !== undefined) setHasMoreData(false);
          if (data.success && data.data.length > 0) {
            setApps(prev => [...prev, ...data.data]);
            setCurrentPage(currentPage + 1);
          }

        } catch (error) {
          console.error("Error fetching more data:", error);
          if(setHasMoreData) setHasMoreData(false);
        }
      });
    } else if (currentPage < totalPages) {
      // Just navigate to next page if we already have the data
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div id="apps_listing" className="flex scroll-mt-28 flex-col gap-8 mt-10 w-full border-t border-gray-300 pt-10">
      {isPending ? <Loading isFixed={true}/> : !isPending && apps.length === 0 ? (
        <div className="flex flex-col gap-8 mt-10 w-full items-center">
          <h1 className="font-sora text-2xl font-bold">No Results Found</h1>
          <PackageOpenIcon className="w-[100px] h-[100px]"/>
        </div>
      ): (
        <>
        {popup && <Job_Details popup={popup} setPopup={setPopup} setApps={setApps} editMode={editMode}/>}
        
        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Applied On</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {currentApps.map((result: Application, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{String(result.company)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{String(result.job_title)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${colors_for_level[String(result.level)] || 'bg-gray-300'} text-gray-900`}>
                        {String(result.level)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{String(result.platform)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{String(result.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(Number(result.id))}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(Number(result.id))}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 cursor-pointer"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} - {Math.min(endIndex, apps.length)} of {apps.length} results
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                    currentPage === 1 
                      ? 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed' 
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button className="px-3 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-lg cursor-pointer">
                  {currentPage}
                </button>
                <button 
                  onClick={handleNext}
                  disabled={isLoadingMore || (!hasMoreData && currentPage === totalPages)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                    isLoadingMore || (!hasMoreData && currentPage === totalPages)
                      ? 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed' 
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {isLoadingMore ? 'Loading...' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}

export default Apps_listing
