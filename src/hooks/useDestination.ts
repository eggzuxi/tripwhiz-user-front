import { create } from 'zustand';
interface DestinationState {
    selectedDestination: number | null;
    setSelectedDestination: (id: number) => void;
}

export const useDestination = create<DestinationState>((set) => ({
    selectedDestination: null,
    setSelectedDestination: (id) => set({ selectedDestination: id }),
}));
