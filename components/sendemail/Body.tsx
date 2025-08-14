"use client";

import React, { useEffect,useState, useRef,useTransition } from "react";
import { SparklesIcon } from "lucide-react";
import { summarizeEmail } from "@/server/emails/sumarize";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Props{
    errors: {[key: string]: string};
    isPending2: boolean;
    setBody: React.Dispatch<React.SetStateAction<string>>;
    body: string;
    html: string;
    setHtml: React.Dispatch<React.SetStateAction<string>>;
}

const Body = ({
  errors,
  isPending2,
  setBody,
  body,
  html,
  setHtml,
}: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [summaryCount,setSummaryCount] = useState(0);
  const [isPending3,startTransition3] = useTransition();

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [["bold", "italic", "underline"], ["link"]],
        },
        placeholder: "Write your message...",
      });

      // Update parent state on every change
      quillRef.current.on("text-change", () => {
        setHtml(quillRef.current!.root.innerHTML);
        setBody(quillRef.current?.getText() as string);
      });
    }
  }, [editorRef, setBody]);

  const logPlainText = () => {
    if (quillRef.current) {
      console.log("Plain text:", body);
    }
  };


  const handleSummarize = () => {
    if(html.length === 0) return;
    startTransition3(async ()=>{
      const result = await summarizeEmail(html);
      if(result.success){
        setHtml(result.result);
        if(quillRef.current){
          quillRef.current.root.innerHTML = result.result;
        }
        setSummaryCount(summaryCount + 1);
      }else{
        setBody("Something went wrong during email summarization");
      }
    })
  }

  return (
    <div className="flex relative flex-col gap-2 bg-white/80 rounded-xl p-4 shadow border border-blue-100">
      <label
        htmlFor="body"
        className="text-sm font-semibold text-blue-700 font-manrope"
      >
        Body
      </label>

      {/* Quill editor */}
      <div
        ref={editorRef}
        style={{ height: "150px"}}
        className="bg-white border border-gray-200"
      />

      <div className="flex mt-2 justify-between items-center">
        <button
          disabled={isPending2 || isPending3 || summaryCount >= 3}
          type="button"
          onClick={handleSummarize}
          style={{ backgroundColor: summaryCount >= 3 ? "red" : "" }}
          className="ml-auto bg-blue-500 px-3 py-2 rounded-lg text-white font-manrope font-bold flex gap-2 items-center hover:bg-blue-600 transition cursor-pointer"
        >
          <p>
            {isPending3
              ? "Summarizing..."
              : summaryCount >= 3
              ? "Summary Limit Reached"
              : "Summarize With AI"}
          </p>{" "}
          {summaryCount < 3 && <SparklesIcon className="w-5 h-5" />}
        </button>
      </div>

      {errors.body && (
        <p className="text-red-500 text-sm font-medium mt-1">{errors.body}</p>
      )}
    </div>
  );
};

export default Body;
