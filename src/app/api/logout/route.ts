import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  (await cookies()).set('auth', 'false')
  return NextResponse.redirect(new URL('/login', 'http://localhost:3000'))
}

