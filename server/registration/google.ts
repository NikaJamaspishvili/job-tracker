"use server";

import { callDatabase } from "@/config/db";
import { generateToken } from "../jwt/generate";
import { setCookie } from "../jwt/set-cookie";

export const handleGoogleLogin = async (email:string | null) => {
    console.log(email);
    try{
        const query = "SELECT * FROM users WHERE email = ?";
        const result = await callDatabase(query,[email]);
    
        if(Array.isArray(result) && result.length > 0){
            const token = await generateToken(result[0].id);
            await setCookie(token);
            return {success:true};
        }
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared during google credentials checking");
    }

    try{
        const query = "INSERT INTO users (email,provider) VALUES (?,?)";
        const result = await callDatabase(query,[email,"google"]);
        const token = await generateToken(result.insertId);
        await setCookie(token);
        return {success:true};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared during google credentials insertion");
    }
}