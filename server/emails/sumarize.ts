"use server";

import { CohereClientV2 } from "cohere-ai";
import { success } from "zod";

const cohere = new CohereClientV2({token: process.env.COHERE_API_KEY});

export const summarizeEmail = async (body: string) => {
    console.log("FUCK YOU!!!!");
    try {
        const response = await cohere.chat({
            model: 'command-a-03-2025',
            messages: [
              {role: 'system',
                 content: 'You are a helpful assistant. You are summarizing emails making them look proffesional and ready for email cover letter. you return only the summarized text nothing more.'
              },
              {
                role: 'user',
                content: 'Summarize this email and dont include other information, just the summary text ' + body,
              },
            ],
          });
          
          if(response.message.content?.length && response.message.content?.length > 0){
            console.log(response.message.content[0]?.text);
            return {success:true, result: response.message.content[0]?.text}
          }else{
            return {success:false,result: ""}
          }
    } catch (err) {
        console.log(err);
        throw new Error("Error has appeared when getting emails");
    }
}