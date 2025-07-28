import { NextRequest,NextResponse } from 'next/server'
import { verifyJwt } from './server/jwt/verify';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  if(url === "/register"){
    const result = await verifyJwt();

    if(result) return NextResponse.redirect(new URL('/', request.nextUrl))
    return NextResponse.next();
  }
  
  if(url === "/"){
    const result = await verifyJwt();

    if(result) return NextResponse.next();
    
    return NextResponse.redirect(new URL('/register', request.nextUrl))
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/register','/'],
}