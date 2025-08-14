"use server";

import { transporter } from "@/config/nodemailer";
import { verifyJwt } from "../jwt/verify";
import { callDatabase } from "@/config/db";

export const sendEmail = async (subject:string | FormDataEntryValue,To:string | FormDataEntryValue,text:string | FormDataEntryValue,file:File | null ,refreshToken:string | null,userEmail:string,html:string) => {
   console.log("refresh token is: ",refreshToken);
   console.log("these are the: ",subject,To,text,userEmail);

   let attachmentData = null;
   if (file && file.size > 0) {
     const buffer = Buffer.from(await file.arrayBuffer());
     attachmentData = {
       filename: file.name,
       content: buffer
     };
   };

    if(refreshToken){
        //this means that the user is logged in with google account and he/she automatically wants to use its own gmail
    }else{
    
        //this mean that the user didn't authenticate with google and still wants to send an email, so he/she wants to use our platform's gmail
        const mailOptions = {
            from: 'noreply.careero@gmail.com',
            to: To.toString(),
            replyTo: userEmail,
            subject: subject.toString(),
            html: html.toString(),
            attachments: attachmentData ? [attachmentData] : []
          };
          try{
            await transporter.sendMail(mailOptions);

            const userId = await verifyJwt();
            let query;
            if(attachmentData){
              query = "INSERT INTO emails (userId,subject,recipient,body,cv_name) VALUES (?,?,?,?,?)";
            }else{
              query = "INSERT INTO emails (userId,subject,recipient,body) VALUES (?,?,?,?)";
            }
            const array = [userId,subject,To,text];
            if(attachmentData) array.push(attachmentData.filename);
            const result = await callDatabase(query,array);
            
            return {success:true,id:result.insertId};
          }catch(err){
            console.log(err);
            throw new Error("Error while sending email from nodemailer");
          }
    }
}