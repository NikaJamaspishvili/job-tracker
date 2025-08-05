"use server";
import { verifyJwt } from "../jwt/verify";
import { callDatabase } from "@/config/db";

export const updateGoal = async (goal: number | null) => {
    const userId = await verifyJwt();
    //today date
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];

    const query = "UPDATE users SET daily_goal=? where id=?";
    const query2 = "update applications set current_goal = ? where id =(select max(id) from (select * from applications where created_at=? order by id desc) as tabla);";

    try{
        await callDatabase(query,[goal,userId]);
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when updating daily_goal in users table");
    }

    try{
        await callDatabase(query2,[goal,formatted]);
        return {success:true};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when updating goals");
    }
};

export const getUserInfo = async () => {
    const userId = await verifyJwt();
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    const query = "SELECT users.daily_goal, users.email, COUNT(applications.id) AS sent FROM users LEFT JOIN applications ON users.id = applications.userId AND applications.created_at = ? WHERE users.id = ? GROUP BY users.id;";

    try{
        const result = await callDatabase(query,[formatted,userId]);
        if(Array.isArray(result)) return {success:true,result:result};
        return {success:false,result:[]};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when getting user info in profile");
    }
}

export const getGoalsInfo = async (range:number) => {
    const userId = await verifyJwt();
    const query = `SELECT created_at, current_goal, row_count,(${range} - DATEDIFF(?, created_at)) AS days
                    FROM (
                    SELECT *,
                            ROW_NUMBER() OVER (PARTITION BY created_at ORDER BY id DESC) AS rn,
                            COUNT(*) OVER (PARTITION BY created_at) AS row_count
                    FROM applications
                    WHERE created_at >=? and userId=?
                    ) AS ranked
                   WHERE rn = 1 order by created_at desc;`
    
    //calculate the date
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - range);
    const formatted = pastDate.toISOString().split('T')[0];

    console.log(formatted);
    try{
        const result = await callDatabase(query,[today,formatted,userId]);
        if(Array.isArray(result)) return {success:true,result:result};
        return {success:false,result:[]};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when getting goals calendar info");
    }
}

export const getApplication = async (date:string) => {
    const userId = await verifyJwt();
    console.log("date is: ",date);
    const query = "select id,job_title,company,platform,job_link,points,level,DATE_FORMAT(date, '%Y-%m-%d') as date,description from applications where userId=? and created_at=? order by id desc";
    try{
        const result = await callDatabase(query,[userId,date]);
        if(Array.isArray(result)) return {success:true,result:result};
        return {success:false,result:[]};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when getting applications");
    }
}