import { NextRequest,NextResponse } from 'next/server'
import { verifyJwt } from './server/jwt/verify';

export async function middleware(request: NextRequest) {
  const result = await verifyJwt();
  const url = request.nextUrl.pathname;
  if(url === "/register"){

    if(result) return NextResponse.redirect(new URL('/', request.nextUrl))
    return NextResponse.next();
  }
  
  if(url === "/" || url === "/profile" || url === "/emails"){
    if(result) return NextResponse.next();
    
    return NextResponse.redirect(new URL('/register', request.nextUrl))
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/register','/','/profile','/emails'],
}