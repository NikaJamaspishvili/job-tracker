import { NextRequest,NextResponse } from 'next/server'
import { verifyJwt } from './server/jwt/verify';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const result = await verifyJwt();

  if(url === "/register"){

    if(result) return NextResponse.redirect(new URL('/', request.nextUrl))
    return NextResponse.next();
  }
  
  if(url === "/"){
    if(result) return NextResponse.next();
    
    return NextResponse.redirect(new URL('/register', request.nextUrl))
  }

  if(url === "/profile"){
    if(result) return NextResponse.next();
    return NextResponse.redirect(new URL("/register",request.nextUrl))
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/register','/','/profile'],
}