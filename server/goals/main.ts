"use server";
import { verifyJwt } from "../jwt/verify";
import { callDatabase } from "@/config/db";

export const updateGoal = async (goal: number) => {
    const userId = await verifyJwt();
    console.log("goal is: ",goal);
    const query = "UPDATE users SET daily_goal=? where id=?";

    try{
        await callDatabase(query,[goal,userId]);
        return {success:true};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when updating goal");
    }
};

export const getUserInfo = async () => {
    const userId = await verifyJwt();
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    const query = "SELECT users.daily_goal, users.email, COUNT(applications.id) AS sent FROM users LEFT JOIN applications ON users.id = applications.userId AND applications.date = ? WHERE users.id = ? GROUP BY users.id;";

    try{
        const result = await callDatabase(query,[formatted,userId]);
        return {success:true,result:result};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when getting user info in profile");
    }
}

export const getGoalsInfo = async (range:number) => {
    const userId = await verifyJwt();
    const query = `SELECT created_at, current_goal, row_count
                    FROM (
                    SELECT *,
                            ROW_NUMBER() OVER (PARTITION BY created_at ORDER BY id DESC) AS rn,
                            COUNT(*) OVER (PARTITION BY created_at) AS row_count
                    FROM applications
                    WHERE created_at >= '2025-07-1' and userId=9
                    ) AS ranked
                   WHERE rn = 1;`
    
    //calculate the date
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - range);
    const formatted = pastDate.toISOString().split('T')[0];

    console.log(formatted);
    try{
        const result = await callDatabase(query,[formatted,userId]);
        return {success:true,result:result};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when getting goals calendar info");
    }
}