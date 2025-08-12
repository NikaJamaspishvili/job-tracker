"use server";

import { callDatabase } from "@/config/db";
import { verifyJwt } from "../jwt/verify";

export const getEmails = async (id?:undefined | number) => {
    const userId = await verifyJwt();
    let query;
    let array;

    if(id){
        query = "SELECT * FROM emails WHERE userId = ? AND id < ? order by id desc limit 10"
        array = [userId,id];
    }else{
        query = "SELECT * FROM emails WHERE userId = ? order by id desc limit 10"
        array = [userId];
    }

    try{
        const result = await callDatabase(query,array);
        if(Array.isArray(result)) return {success:true,result:result};
        return {success:false,result:[]};
    }catch(err){
        console.log(err);
        throw new Error("Error has appeared when getting emails");
    }
}