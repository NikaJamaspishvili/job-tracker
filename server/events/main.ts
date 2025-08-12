"use server";

import { callDatabase } from "@/config/db";
import { verifyJwt } from "../jwt/verify";
import {events} from "@/schema/events";

export const getEvents = async () => {
    const userId = await verifyJwt();
    const query = "SELECT * FROM events WHERE userId = ? order by id desc";
    try {
        const result = await callDatabase(query, [userId]);
        if (Array.isArray(result)) return { success: true, data: result };
        return { success: false, data: [] };
    } catch (err) {
        console.log(err);
        throw new Error("Error has appeared when getting events");
    }
};

export const insertEvents = async (object: events) => {
    const userId = await verifyJwt();
    const query = "INSERT INTO events (event_name,event_time,event_date,event_location,userId) VALUES (?,?,?,?,?)";
    try {
        const result = await callDatabase(query, [object.event_name,object.event_time,object.event_date,object.event_location,userId]);
        return { success: true, id: result.insertId };
    } catch (err) {
        console.log(err);
        throw new Error("Error has appeared when inserting events");
    }
}

export const deleteEvent = async (id:number) => {
    const query = "DELETE FROM events WHERE id = ?";
    try {
        await callDatabase(query, [id]);
        return { success: true };
    } catch (err) {
        console.log(err);
        throw new Error("Error has appeared when deleting events");
    }
}