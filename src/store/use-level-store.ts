import { Level } from "@/type";
import { create } from "zustand";

interface LevelProps{
    levels:Level[];
    setLevels:(levels:Level[])=>void;
    addNewLevel:(level:Level)=>void;
    updateLevel:(id:string,level:Level)=>void;
    
}


export const useLevelStore = create<LevelProps>((set) => ({
    levels:[],
    setLevels:(levels)=>set({levels}),
    addNewLevel:(level:Level)=>set((state)=>({levels:[...state.levels,level]})),
    updateLevel:(id,level)=>set((state)=>({
        levels:state.levels.map((l)=>(l.id===id?level:l))
    }))

}))