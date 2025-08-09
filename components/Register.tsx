"use client";

import { Eye,EyeClosed,Mail  } from "lucide-react"
import { useState,useTransition } from "react";
import Message from "./errors/Message";
import {RegisterSchema} from "@/schema/registration";
import { handleSignUp,handleLogin } from "@/server/registration/main";

import { signInWithPopup } from "firebase/auth";
import { auth,provider } from "@/config/firebase-config";
import { handleGoogleLogin } from "@/server/registration/google";

import Image from "next/image";
import google_logo from "@/public/google_logo.png";

const Register = ({pageType,setPageType}:{pageType:string,setPageType:React.Dispatch<React.SetStateAction<string>>}) => {
    const [showPassword,setShowPassword] = useState(false);
    const [Errors,setErrors] = useState<{field:PropertyKey,message:string}[]>([]);
    const [isPending,startTransition] = useTransition();

    const [value1,setValue1] = useState("");
    const [value2,setValue2] = useState("");

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

    const handleGoogleClick = async () => {
        try{
            const result = await signInWithPopup(auth,provider);
            await handleGoogleLogin(result.user.email);
            window.location.href = "/";
        }catch(err){
            console.log(err);
            alert("OOPS, error has appeared, please try again");
        }
    }

    const handlePageChange = () => {
       setValue1("");
       setValue2("");
       setPageType(pageType === "login" ? "signup" : "login");
       setErrors([]);
    }


    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-10 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm w-full max-w-[480px] mx-auto my-12">
        {/* Background decoration */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {pageType === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full">
            <div className="space-y-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative flex items-center bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    onChange={(e)=>setValue1(e.target.value)} 
                    value={value1} 
                    type="text" 
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg" 
                    placeholder="Enter your email" 
                    name="email"
                  />
                </div>
              </div>
              {Errors.length > 0 && Errors.find(err => err.field === "email") && 
                <Message message={Errors.find(err => err.field === "email")?.message}/>
              }
            </div>

            <div className="space-y-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative flex items-center bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                  <input 
                    onChange={(e)=>setValue2(e.target.value)} 
                    value={value2} 
                    type={showPassword ? "text" : "password"} 
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg" 
                    placeholder="Enter your password" 
                    name="password"
                  />
                  <button 
                    type="button" 
                    className="ml-3 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer" 
                    onClick={()=>setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeClosed className="w-5 h-5 text-gray-400"/> : <Eye className="w-5 h-5 text-gray-400"/>}
                  </button>
                </div>
              </div>
              {Errors.length > 0 && Errors.find(err => err.field === "password") && 
                <Message message={Errors.find(err => err.field === "password")?.message}/>
              }
            </div>

            <button 
              className="relative group bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden cursor-pointer"
              disabled={isPending}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                {isPending ? "Processing..." : (pageType === "login" ? "Sign In" : "Create Account")}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {pageType === "login" ? "Don't have an account?" : "Already have an account?"} 
              <button 
                className="ml-2 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200 cursor-pointer" 
                onClick={handlePageChange}
              >
                {pageType === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-white via-blue-50 to-indigo-100 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <button 
              onClick={handleGoogleClick} 
              className="mt-8 cursor-pointer w-full flex items-center justify-center gap-3 bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 group"
            >
              <Image className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" src={google_logo} alt="Google logo"/>
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Register
  