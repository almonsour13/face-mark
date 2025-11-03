import { create } from "zustand";
import { UserWithDetails } from "./use-user-store";


interface UserDetailsStore {
    isUserDetailsLoading:boolean;
    setUserDetailsLoading: (isUserDetailsLoading: boolean) => void
    userDetails: UserWithDetails | null;
    setUserDetails: (userDetails: UserWithDetails) => void
}
export const useUserDetailsStore = create<UserDetailsStore>((set) => ({
    isUserDetailsLoading:false,
    setUserDetailsLoading: (isUserDetailsLoading: boolean) => set({ isUserDetailsLoading }),
    userDetails: null,
    setUserDetails: (userDetails: UserWithDetails) => set({ userDetails }),
}));