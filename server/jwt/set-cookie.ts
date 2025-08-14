"use server";
import { cookies } from "next/headers";

export const setCookie = async (token: string) => {
    try{
        (await cookies()).set('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
    }catch(err){
        console.log(err);
        throw new Error('Error while setting the cookie');
    }
}
