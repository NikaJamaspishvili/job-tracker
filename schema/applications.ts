import z from "zod";

export interface Application{
    [k: string | number]: FormDataEntryValue;
}

export const ApplicationSchema = z.object({
    company:z.string().trim().min(1,"Company is required"),
    job_title:z.string().trim().min(1,"Job Title is required"),
    platform:z.string().trim().min(1,"Platform is required"),
    points:z.string().transform(value => Number(value)).refine((val)=> !isNaN(val),"Points must be a number").refine((val)=> val >=1 && val <= 10, "Points must be between 1 and 10"),
    level:z.string().trim().min(1,"Level is required"),
    date:z.string().trim().min(1,"Date is required"),
})

export const SingleAppSchema = z.object({
    
})