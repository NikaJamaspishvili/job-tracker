import z from "zod";

export interface events {
    id?: number;
    event_name: string;
    event_time: string;
    event_location: string;
    event_date: string,
}

export const eventSchema = z.object({
    event_name:z.string().trim().min(1,"Event Name is required"),
    event_time:z.string().trim().min(1,"Event Time is required"),
    event_location:z.string().trim().min(1,"Event Location is required"),
    event_date:z.string().trim().min(1,"Event Date is required"),
})