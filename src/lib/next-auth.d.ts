import { User, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    hasAccess: boolean;
    email: string;
    id: string;
  }

  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    email: string;
    hasAccess: boolean;
  }
}
