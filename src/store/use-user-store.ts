import { User } from "@/hooks/user/use-users";
import { create } from "zustand";


interface UserStore {
    isUsersLoading: boolean;
    setUsersLoading: (isUsersLoading: boolean) => void
    users: User[];
    setUsers: (user: User[]) => void
}
export const userUserStore = create<UserStore>((set) => ({
    isUsersLoading: false,
    setUsersLoading: (isUsersLoading: boolean) => set({ isUsersLoading }),
    users: [],
    setUsers: (users: User[]) => set({ users }),
}));