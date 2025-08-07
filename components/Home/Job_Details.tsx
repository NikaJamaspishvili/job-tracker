import { X } from "lucide-react";
import { getSingleApplication, updateApplication } from "@/server/applications/main";
import { useEffect, useState, useTransition } from "react";
import Loading from "../Loading";
import { Application } from "@/schema/applications";
import Select from "../Select";

interface Props {
  popup: boolean | number | string | File;
  setPopup: React.Dispatch<React.SetStateAction<boolean | number | string | File>>;
  setApps: React.Dispatch<React.SetStateAction<Application[]>>;
}

const Job_Details = ({ popup, setPopup, setApps }: Props) => {
  const [object, setObject] = useState<Application | null>(null);
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
    const editedData: { [key: string]: string } = {};

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
    <div className="fixed z-50 bg-white/70 backdrop-blur-xl shadow-2xl border border-blue-200 w-[98vw] max-w-3xl h-[95vh] overflow-y-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-2xl p-4 sm:p-8 transition-all">
      <X onClick={() => setPopup(false)} className="absolute top-4 max-md:top-8 right-4 text-red-500 w-9 h-9 max-md:w-11 max-md:h-11 cursor-pointer hover:bg-red-100 rounded-full p-1 transition" />

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold text-center text-blue-800 tracking-tight mb-2 font-sora drop-shadow">{isEditable ? "Edit Job Application" : "Job Application Details"}</h2>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {array.map(result => (
            <div key={result.id} className="flex flex-col gap-2 bg-white/80 rounded-xl p-4 shadow border border-blue-100">
              <label className="text-sm font-semibold text-blue-700 font-manrope mb-1">{result.label}</label>
              {result.name === "points" && <p className="text-xs text-gray-500 mb-1">Selected: {value}</p>}
              {result.name === "level" && isEditable ? <Select value={result.value as string} name={result.name}/> : (
                <input
                  min={1}
                  max={10}
                  defaultValue={result.value as unknown as string}
                  onChange={(e) => result.name === "points" && setValue(Number(e.target.value))}
                  className={`outline-0 border border-blue-200 rounded-lg p-3 text-base font-sora transition w-full ${isEditable ? "bg-white" : "bg-gray-100"}`}
                  name={result.name}
                  readOnly={!isEditable}
                  type={isEditable ? result.type : "text"}
                />
              )}
            </div>
          ))}
        </section>

        {isEditable && (
          <button
            className="w-full max-w-xs bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold p-3 rounded-xl shadow transition"
            type="submit"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        )}

        {error.length > 0 && <p className="text-red-600 text-sm font-semibold mt-2">{error}</p>}
      </form>

      <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
        <button
          onClick={() => {
            setIsEditable(!isEditable);
            error && setError("");
          }}
          className="bg-blue-600 hover:bg-blue-700 w-full max-w-xs text-white text-lg font-semibold p-3 rounded-xl shadow transition"
        >
          {isEditable ? "Cancel Edit" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Job_Details;
