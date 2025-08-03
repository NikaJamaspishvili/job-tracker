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

    const query = "INSERT INTO applications (job_title,company,platform,job_link,points,level,date,description,created_at,userId,current_goal) VALUES (?,?,?,?,?,?,?,?,?,?,(select daily_goal from users where id=?))";
    try{
        const result = await callDatabase(query,[...Object.values(data),formatted,userId,userId]);
        return {success:true}
    }catch(err){
        throw new Error("Error has appeared when adding application");
    }
}


export const getApplications = async (query:string) => {
    const userId = await verifyJwt();
    try{
        const result = await callDatabase(query,[userId]);
        if(Array.isArray(result)) return {success:true,data:result};
        return {success:false,data:[]}
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when getting applications");
    }

}

export const getSingleApplication = async (id:number) => {
    try{
        const query = "select id,job_title,company,platform,job_link,points,level,DATE_FORMAT(date, '%Y-%m-%d') as date,description from applications where id=?";
        const result = await callDatabase(query,[id]);
        console.log(result);
        if(Array.isArray(result)) return {success:true,data:result};
        return {success:false,data:[]}
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when getting single application");
    }
}

export const updateApplication = async (id:number,data:Application) => {
    try{
        const keys = Object.keys(data);
        const values = Object.values(data);
        
        console.log(data,keys,values);
        const query = `update applications set ${keys.map(key => `${key} = ?`)} where id=?`;
        const result = await callDatabase(query,[...values,id]);
        console.log(result);
        return {success:true};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when updating application");
    }
}


export const deleteApplication = async (id:number) => {
    try{
        const query = "delete from applications where id=?";
        const result = await callDatabase(query,[id]);
        console.log(result);
        return {success:true};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when deleting application");
    }
}