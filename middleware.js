import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get("flower-token");
    if(!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ['/cart', "/favorite"],
};
