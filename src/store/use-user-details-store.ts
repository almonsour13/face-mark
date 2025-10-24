import { User } from "@/hooks/user/use-users";
import { create } from "zustand";


interface UserDetailsStore {
    isUserDetailsLoading:boolean;
    setUserDetailsLoading: (isUserDetailsLoading: boolean) => void
    userDetails: User | null;
    setUserDetails: (userDetails: User) => void
}
export const useUserDetailsStore = create<UserDetailsStore>((set) => ({
    isUserDetailsLoading:false,
    setUserDetailsLoading: (isUserDetailsLoading: boolean) => set({ isUserDetailsLoading }),
    userDetails: null,
    setUserDetails: (userDetails: User) => set({ userDetails }),
}));