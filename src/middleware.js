import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const authPath = ['/account/login', '/account/register']
    try {
        const isAuth = request.cookies.get('is_authenticated')?.value
        const path = request.nextUrl.pathname
        console.log(isAuth)
        if (isAuth && authPath.includes(path)) {
            return NextResponse.redirect(new URL('/user/profile', request.url))
        }

        if (!isAuth && !authPath.includes(path)) {
            return NextResponse.redirect(new URL('/account/login', request.url))
        }
        return NextResponse.next()
    } catch (error) {
        console.log(error)
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/user/:path*', '/account/login', '/account/register']
}