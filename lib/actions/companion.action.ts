"use server";
import { CreateCompanion } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const CreateCompanion = async (formData: CreateCompanion) => {
    const {userId: author} = await auth(); 
    const supabase = createSupabaseClient();

    const{data, error} = await supabase.from("companions").insert({...formData, author}).select();

    if(error || !data) throw new Error(error?.message || "Failed to create companion");

    console.log(data);
    return data[0]; 
}
