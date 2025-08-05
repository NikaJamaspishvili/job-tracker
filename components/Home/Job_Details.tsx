import { X } from "lucide-react";
import { getSingleApplication, updateApplication } from "@/server/applications/main";
import { useEffect, useState, useTransition } from "react";
import Loading from "../Loading";

interface Props {
  popup: boolean | number;
  setPopup: React.Dispatch<React.SetStateAction<boolean | number>>;
  setApps: React.Dispatch<React.SetStateAction<any[]>>;
}

const Job_Details = ({ popup, setPopup, setApps }: Props) => {
  const [object, setObject] = useState<any>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [value, setValue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await getSingleApplication(popup as number);
      if (result.success) {
        setObject(result.data[0]);
        setValue(result.data[0].points);
      }
    }
    fetchData();
  }, []);

  if (object === null) return <Loading />;

  const array = [
    { id: 1, label: "Job Title", name: "job_title", value: object.job_title, type: "text" },
    { id: 2, label: "Company", name: "company", value: object.company, type: "text" },
    { id: 3, label: "Platform", name: "platform", value: object.platform, type: "text" },
    { id: 4, label: "Points", name: "points", value: object.points, type: "range" },
    { id: 5, label: "Level", name: "level", value: object.level, type: "text" },
    { id: 6, label: "Date", name: "date", value: object.date, type: "date" },
    { id: 7, label: "Description", name: "description", value: object.description, type: "text" },
    { id: 8, label: "Job Link", name: "job_link", value: object.job_link, type: "url" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const editedData: any = {};

    for (const key of Object.keys(data)) {
      const key1 = String(data[key]).trim();
      const key2 = String(object[key]).trim();
      if (key1 !== key2 && key1 !== "") {
        editedData[key] = key1;
        object[key] = key1;
      }
    }

    if (Object.keys(editedData).length === 0) {
      return setError("No changes were made");
    }

    startTransition(async () => {
      const result = await updateApplication(object.id, editedData);
      if (result.success) {
        setApps((prev) => {
          const array = [...prev];
          const index = array.findIndex(item => item.id === object.id);
          array[index] = object;
          return array;
        });
        setPopup(false);
      }
    });
  };

  return (
    <div className="fixed z-50 bg-white shadow-2xl shadow-black w-[95%] md:w-[80%] h-[90%] overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-xl p-6">
      <X onClick={() => setPopup(false)} className="absolute top-4 right-4 text-red-500 w-7 h-7 cursor-pointer" />

      <form onSubmit={handleSubmit} className="w-full max-w-5xl flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">{isEditable ? "Edit Job Application" : "Job Application Details"}</h2>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-4">
          {array.map(result => (
            <div key={result.id} className="flex flex-col gap-1 bg-gray-100 rounded-md p-4 shadow-sm">
              <label className="text-sm font-medium text-gray-700">{result.label}</label>
              {result.name === "points" && <p className="text-xs text-gray-500 mb-1">Selected: {value}</p>}
              <input
                min={1}
                max={10}
                defaultValue={result.value}
                onChange={(e) => result.name === "points" && setValue(Number(e.target.value))}
                className={`outline-0 border border-gray-300 rounded-md p-2 text-sm ${isEditable ? "bg-white" : "bg-gray-200"} transition`}
                name={result.name}
                readOnly={!isEditable}
                type={isEditable ? result.type : "text"}
              />
            </div>
          ))}
        </section>

        {isEditable && (
          <button
            className="w-full max-w-sm bg-yellow-600 hover:bg-yellow-700 text-white text-lg font-medium p-3 rounded-md transition"
            type="submit"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        )}

        {error.length > 0 && <p className="text-red-600 text-sm">{error}</p>}
      </form>

      <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
        <button
          onClick={() => {
            setIsEditable(!isEditable);
            error && setError("");
          }}
          className="bg-blue-600 hover:bg-blue-700 w-full max-w-sm text-white text-lg font-medium p-3 rounded-md transition"
        >
          {isEditable ? "Cancel Edit" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Job_Details;
