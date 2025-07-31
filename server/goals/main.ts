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