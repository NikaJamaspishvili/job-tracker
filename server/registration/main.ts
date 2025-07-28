"use server";

import { RegisterSchema } from "@/schema/registration";
import { callDatabase } from "@/config/db";
import { generateToken } from "../jwt/generate";
import { setCookie } from "../jwt/set-cookie";

const authenticateUser = async (email:string,password:string) => {
    const validatedResult = RegisterSchema.safeParse({
        email,
        password
    })

    if(!validatedResult.success){
        const errors = validatedResult.error.issues.map(issue => ({field:issue.path[0],message:issue.message}));
        return {success: false,errors: errors};
    }

};

export const handleSignUp = async (email:string,password:string):Promise<{success:boolean,token?:string,errors?:{field:PropertyKey,message:string}[]}> => {

    //first of all authenticate the credentials on backend as well

    authenticateUser(email,password);

    //check if the user already exists

    const query = "SELECT * FROM users WHERE email = ?";
    const result = await callDatabase(query,[email]);

    if(Array.isArray(result) && result.length > 0){
        return {success:false,errors:[{field:"email",message:"User already exists"}]};
    }

    //secondly send the data to the database

    try{
        const query = "INSERT INTO users (email,password) VALUES (?,?)"
        const result = await callDatabase(query,[email,password]);
        
        const token = await generateToken(result.insertId);
        await setCookie(token);

        return {success:true,token:token};
    }catch(err){
        throw new Error("Error has appeared when inserting user credentials in database");
    }
};

export const handleLogin = async (email:string,password:string):Promise<{success:boolean,token?:string,errors?:{field:PropertyKey,message:string}[]}> => {

    const query = "SELECT * FROM users WHERE email = ? and password = ?";
    const result = await callDatabase(query,[email,password]);

    try{
        if(Array.isArray(result)){
            if(result.length === 0){
                return {success:false,errors:[{field:"email",message:"Incorrect Email OR Password"}]};
            }
            const token = await generateToken(result[0].id);
            await setCookie(token);

            return {success:true};
        }
        return {success:false,errors:[{field:"email",message:"Incorrect Email OR Password"}]};
    }catch(err){
        throw new Error("Error has appeared when checking user credentials in login");
    }
};