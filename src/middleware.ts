import NextAuth from "next-auth";
import { nextAuthConfig } from "./lib/auth";

export default NextAuth(nextAuthConfig).auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}