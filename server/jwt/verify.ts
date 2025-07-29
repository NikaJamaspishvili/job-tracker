import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function verifyJwt() {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const token = (await cookies()).get('token')?.value as string;
  console.log('token is after verification: ',token);
  if(!token) return null; // no token

  try {
    const { payload } = await jwtVerify(token, secret);
 //   console.log("payload is: ",payload);
    return payload.id;
  } catch (e) {
    return null; // invalid token
  }
}