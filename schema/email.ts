import z from "zod";

export const emailSchema = z.object({
    subject:z.string().min(1,"Subject is required"),
    to:z.email().min(1,"Please Specify a Recipient"),
    body:z.string().min(1,"Body is required"),
})

export interface Emails{
    id:number,
    subject:string,
    recipient:string,
    body:string
}

export interface EmailInfo{
    subject:string,
    to:string,
    body:string,
    cv_name:string
}