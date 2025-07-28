import z from "zod";

export const RegisterSchema = z.object({
    email: z.email().trim().min(1,"Email is required"),
    password: z.string().trim().min(8, "Password must be at least 8 characters").max(32, "Password must be at most 32 characters"),
})