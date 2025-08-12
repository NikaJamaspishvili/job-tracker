import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log("hit!");
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );
  try{
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://mail.google.com/',
        'https://www.googleapis.com/auth/gmail.send',
      ],
      prompt: 'consent',
    });
  
    return NextResponse.redirect(url);
  }catch(err){
    console.log(err);
    throw new Error("Error while redirecting user during gmail authorization");
  }
}