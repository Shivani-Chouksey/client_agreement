import { NextResponse } from "next/server";


export function middleware(req) {

  const token = req.cookies.get('token');

  if (token) {
    if (req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
  } else {
 
      return NextResponse.redirect(new URL('/', req.url))
   

  }

}

export const config = {
  matcher: ['/admin/:path*','/api/:path*','/create-agreement',"/documents"],
}