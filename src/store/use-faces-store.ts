import { create } from "zustand";


export interface Face {
    id: string;
    name:string;
    course: string;
    code:string;
    level: string;
    descriptor: number[];
}

interface FacesStore {
    isFacesLoading: boolean;
    setFacesLoading: (isFacesLoading: boolean) => void;
    faces: Face[];
    setFaces: (faces: Face[]) => void;
    getFaceDetails: (faceId: string) => Face | undefined;
}

export const useFacesStore = create<FacesStore>((set, get) => ({
    isFacesLoading: false,
    setFacesLoading: (isFacesLoading) => set({ isFacesLoading }),
    faces: [],
    setFaces: (faces) => set({ faces }),
    getFaces: () => {
        const { faces } = get();
        return faces.map(face => {
            return {
                id:face.id,
                descriptor:face.descriptor
            }
        })
    },
    getFaceDetails: (faceId) => {
        const { faces } = get();
        return faces.find((face) => face.id === faceId);
    },
}));
