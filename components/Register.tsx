"use client";

import { Eye,EyeClosed,Mail  } from "lucide-react"
import { useState,useTransition } from "react";
import Message from "./errors/Message";
import {RegisterSchema} from "@/schema/registration";
import { handleSignUp,handleLogin } from "@/server/registration/main";

const Register = ({pageType,setPageType}:{pageType:string,setPageType:React.Dispatch<React.SetStateAction<string>>}) => {
    const [showPassword,setShowPassword] = useState(false);
    const [Errors,setErrors] = useState<{field:PropertyKey,message:string}[]>([]);
    const [isPending,startTransition] = useTransition();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const validatedResult = RegisterSchema.safeParse({
            email,
            password
        })

        if(!validatedResult.success){
            const errors = validatedResult.error.issues.map(issue => ({field:issue.path[0],message:issue.message}));
            setErrors(errors);
            return;
        }

        startTransition(async ()=>{
            let result;
            if(pageType === "login"){
                result = await handleLogin(email,password);
            }else{
                result = await handleSignUp(email,password);
            }

            if(!result.success && result.errors){
                setErrors(result.errors);
            }else{
                window.location.href = "/";
            }
        })
    }


    return (
      <div className="border m-auto bg-white p-3 rounded-md shadow-2xl flex flex-col gap-5 items-center justify-center w-full max-w-[450px] min-h-[450px]">
          <h1 className="text-3xl mb-[30px]">{pageType === "login" ? "Login" : "Signup"}</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full items-center">
              <div className="flex border border-gray-400 w-full rounded-md p-2">
                <input type="text" className="w-full outline-0 border-0" placeholder="Email..." name="email"/>
                <Mail />
              </div>
              {Errors.length > 0 && Errors.find(err => err.field === "email") && <Message message={Errors.find(err => err.field === "email")?.message}/>}
              <div className="flex border border-gray-400 w-full rounded-md p-2">
                <input type={showPassword ? "text" : "password"} className="w-full outline-0" placeholder="password..." name="password"/>
                <button type="button" className="cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <EyeClosed/> :<Eye/>}</button>
              </div>
              {Errors.length > 0 && Errors.find(err => err.field === "password") && <Message message={Errors.find(err => err.field === "password")?.message}/>}
              <button className="bg-blue-500 text-white p-2 rounded-md w-full max-w-[300px] cursor-pointer">{isPending ? "Loading..." : "submit"}</button>
          </form>
          <p className="text-sm">{pageType === "login" ? "Need an account?" : "Already have an account?"} <button className="text-md text-blue-400 cursor-pointer" onClick={() => setPageType(pageType === "login" ? "signup" : "login")}>{pageType === "login" ? "Signup" : "Login"}</button></p>
      </div>
    )
  }
  
  export default Register
  