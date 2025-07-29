"use server";
import { Application } from "@/schema/applications";
import { callDatabase } from "@/config/db";
import { verifyJwt } from "../jwt/verify";

export const AddApplication = async (data: Application) => {
    //first of all, identify the current date
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    console.log(formatted);

    const userId = await verifyJwt();
    console.log(userId);


    const query = "INSERT INTO applications (job_title,company,platform,job_link,points,level,date,description,created_at,userId) VALUES (?,?,?,?,?,?,?,?,?,?)";
    try{
        const result = await callDatabase(query,[...Object.values(data),formatted,userId]);
        console.log(result);
    }catch(err){
        throw new Error("Error has appeared when adding application");
    }
}