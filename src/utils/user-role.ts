import { getServerSession } from "next-auth";

export const userRole = async (): Promise<number> => {
    const session = await getServerSession();

    if (session && session.user && session.user.role) {
        return session.user.role;
    }
    return 0;
};
