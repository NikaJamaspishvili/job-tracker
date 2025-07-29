"use server";
import { Application,ApplicationSchema } from "@/schema/applications";
import { callDatabase } from "@/config/db";
import { verifyJwt } from "../jwt/verify";

export const AddApplication = async (data: Application) => {
    
    const validatedResult = ApplicationSchema.safeParse(data);
    if(!validatedResult.success){
        const errors = validatedResult.error.issues.map(issue => ({field:issue.path[0],message:issue.message}));
        console.log(errors);
        return;
    }
    
    //first of all, identify the current date
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];

    const userId = await verifyJwt();

    const query = "INSERT INTO applications (job_title,company,platform,job_link,points,level,date,description,created_at,userId) VALUES (?,?,?,?,?,?,?,?,?,?)";
    try{
        const result = await callDatabase(query,[...Object.values(data),formatted,userId]);
        console.log(result);
    }catch(err){
        throw new Error("Error has appeared when adding application");
    }
}