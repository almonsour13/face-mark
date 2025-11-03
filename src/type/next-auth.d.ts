import "next-auth";
import { DefaultUser } from "next-auth"; // Add this import
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: number | null;
        };
        role?: number | null;
        accessToken: string;
        refreshToken: string;
        error?: string;
    }

    interface User extends DefaultUser {
        id: string;
        role?: number | null;
        accessToken?: string;
        refreshToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?:number
    }
}
