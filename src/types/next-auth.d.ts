import "next-auth";
import "next-auth/jwt";

// Extend User, Session, and JWT objects
declare module "next-auth" {
    interface User {
        email?: string;
        fullname?: string;
    }
    
    interface Session {
        user: {
            email?: string;
            fullname?: string;
        } & DefaultSession['user'];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        email?: string;
        fullname?: string;
    }
}
