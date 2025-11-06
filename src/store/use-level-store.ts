import { Level } from "@/type";
import { create } from "zustand";

interface LevelProps{
    levels:Level[];
    setLevels:(levels:Level[])=>void    
}


export const useLevelStore = create<LevelProps>((set) => ({
    levels:[],
    setLevels:(levels)=>set({levels})
}))