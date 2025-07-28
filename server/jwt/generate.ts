"use server";

import { SignJWT } from 'jose';

export const generateToken = async (id:number) => {
    try{
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const token = await new SignJWT({id}).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(secret);;
        console.log('token is: ',token);
        return token;
    }catch(err){
        console.log("error appeared during generating token: ", err);
        throw new Error("Error generating token");
    }
};
