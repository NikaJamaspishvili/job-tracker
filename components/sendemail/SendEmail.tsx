"use client";

import { X, Paperclip, Send } from "lucide-react";
import { checkRefreshToken } from "@/server/registration/google";
import { useTransition,useEffect,useState } from "react";
import dynamic from "next/dynamic";
import Loading from "../Loading";
import logo from "@/public/logo.png";
import Image from "next/image";
import { sendEmail } from "@/server/emails/sendemails";
import AddInfo from "./AddInfo";
import AddJob from "../Home/AddJob";
import { Application } from "@/schema/applications";
import { emailSchema,EmailInfo } from "@/schema/email";

const Body = dynamic(()=>import("./Body"),{ssr:false});

interface Props {
  setShowEmail: React.Dispatch<React.SetStateAction<boolean>>,
  setApps: React.Dispatch<React.SetStateAction<Application[]>>,
}

const SendEmail = ({ setShowEmail,setApps }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isPending2,startTransition2] = useTransition();
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [insertedEmailId,setEmailId] = useState<number | null>(null);
  const [showAddJob,setShowAddJob] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const [userEmail,setUserEmail] = useState("");
  const [body,setBody] = useState("");
  const [attachedFile,setAttachedFile] = useState<File>();

  const [emailInfo,setEmailInfo] = useState<EmailInfo | null >(null);

  const [html,setHtml] = useState("");

  useEffect(()=>{
    startTransition(async ()=>{
    const result = await checkRefreshToken();
    if(result.success){
        setRefreshToken(result.refreshToken);
        setUserEmail(result.email);
    }
    })
  },[])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const object: { [k: string]: FormDataEntryValue; } = Object.fromEntries(formData.entries());
    object["body"] = body;
    object["html"] = html;
    const validatedResult = emailSchema.safeParse(object);
    if(!validatedResult.success){
        const newErrors: {[key: string]: string} = {};
        validatedResult.error.issues.forEach(issue => {
            const field = issue.path[0] as string;
            newErrors[field] = issue.message;
        });
        setErrors(newErrors);
        return;
    }
    
    // Clear errors on successful validation
    setErrors({});
    
    console.log(object);
    startTransition2(async ()=>{
      const result = await sendEmail(object.subject,object.to,object.body,object.attachment as File,refreshToken,userEmail,html);
      if(result?.success){
          setEmailId(result.id);
          setEmailInfo({
            subject: object.subject as string,
            to: object.to as string,
            body: object.body as string,
            cv_name: attachedFile?.name || ""
          });
          console.log(result.id);
      }
    })
  };

  const handlePlatformEmailSumbit = async () => {
    setRefreshToken("");
  }

  if(showAddJob) return <AddJob setShowAddJob={setShowAddJob} setApps={setApps} emailInfo={emailInfo} setShowEmail={setShowEmail}/>
  return (
    <div className="fixed bg-white/70 backdrop-blur-xl border border-blue-200 w-[98vw] max-w-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50 rounded-2xl p-4 sm:p-8 shadow-2xl">
      {!isPending && <button
        type="button"
        className="absolute top-4 right-4 text-red-500 w-9 h-9 max-md:w-10 max-md:h-10 cursor-pointer hover:bg-red-100 rounded-full p-1 transition z-10"
        onClick={() => setShowEmail(false)}
        aria-label="Close"
      >
        <X className="max-md:w-full max-md:h-full" />
      </button>}
      
      <form onSubmit={handleSubmit} className="relative w-full flex flex-col gap-5">
        {isPending ? <Loading isFixed={true}/> : refreshToken === null ? <div className="pt-5">
            <h1 className="font-manrope font-semibold text-2xl md:text-3xl text-center text-gray-800 leading-snug tracking-wide drop-shadow-sm">Are you willing to send emails with <b>Platform&apos;s Gmail?</b></h1>
            <section className="flex gap-3">
              <button onClick={handlePlatformEmailSumbit} className="mt-8 cursor-pointer w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 group"><Image className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" src={logo} alt="gmail icon" />Platform&apos;s Gmail</button>
            </section>
        </div> : emailInfo !== null ? <AddInfo setShowAddJob={setShowAddJob} emailId={insertedEmailId as number} /> : <>
        <h2 className="text-2xl font-manrope font-bold text-blue-800 text-center select-none">Send Email</h2>

        <div className="flex flex-col gap-2 bg-white/80 rounded-xl p-4 shadow border border-blue-100">
          <label htmlFor="subject" className="text-sm font-semibold text-blue-700 font-manrope">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            className={`outline-0 border rounded-lg p-3 text-base font-sora transition bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-blue-200'}`}
            placeholder="Project Update"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm font-medium mt-1">{errors.subject}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 bg-white/80 rounded-xl p-4 shadow border border-blue-100">
          <label htmlFor="to" className="text-sm font-semibold text-blue-700 font-manrope">To</label>
          <input
            id="to"
            name="to"
            type="email"
            className={`outline-0 border rounded-lg p-3 text-base font-sora transition bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 ${errors.to ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-blue-200'}`}
            placeholder="recipient@example.com"
          />
          {errors.to && (
            <p className="text-red-500 text-sm font-medium mt-1">{errors.to}</p>
          )}
        </div>

        <Body errors={errors} isPending2={isPending2} setBody={setBody} body={body} html={html} setHtml={setHtml} />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <label htmlFor="attachment" className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-blue-700 font-medium cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition shadow">
              <Paperclip className="w-4 h-4" />
              Attach File
            </label>
            <input id="attachment" name="attachment" onChange={(e)=>{console.log(e.target.files![0]);setAttachedFile(e.target.files![0])}} type="file" className="hidden" />
            {attachedFile && (
              <span className="text-sm text-blue-800/80 truncate max-w-[12rem]" title={attachedFile.name}>
                {attachedFile.name}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl cursor-pointer font-manrope font-bold shadow transition text-base min-w-40"
          >
            <Send className="w-4 h-4" />
            {isPending2 ? "Sending..." : "Send Email"}
          </button>
        </div>
        </>}
      </form>
    </div>
  );
};

export default SendEmail;