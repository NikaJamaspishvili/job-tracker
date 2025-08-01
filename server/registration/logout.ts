"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const handleLogout = async () => {
    try{
        (await cookies()).delete('token');
    }catch(err){
        console.log(err);
        throw new Error('Error while logging out');
    }finally{
        redirect('/register');
    }
}