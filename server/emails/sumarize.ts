"use server";

import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({token: process.env.COHERE_API_KEY});

export const summarizeEmail = async (body: string) => {
    console.log("FUCK YOU!!!!");
    try {
        const response = await cohere.chat({
            model: 'command-a-03-2025',
            messages: [
              {role: 'system',
                 content: `
                      You are a helpfull assistant.
                      You are going to be provided with the p tag maybe containing links and other customizations.
                      Your task is to summarize the text of the email and return the same p tag containing summarized text with its link tags and other customizations in place.
                      Do not remove any of the link tags.
                      Do not remove any of the customizations.
                      Just Change the text.
                      For Example: input -> <p>this town looks cool on this <a href="https://facebook.com" rel="noopener noreferrer" target="_blank">site</a> <strong>plus for the bonus</strong> <em>I want to see you.</em></p> -> output -> <p>{...containing summarized text with its link tags and other customizations in place, only the text change}</p>
                 `
              },
              {
                role: 'user',
                content: 'Summarize this email as the system prompted you: ' + body,
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