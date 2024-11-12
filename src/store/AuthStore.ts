import {create} from "zustand";


interface AuthState {
    name: string | null;
    provider: 'kakao' | 'google' | null;
    email: string | null;
    setUser: (name: string, email: string, provider: 'kakao' | 'google') => void;
}

const useAuthStore = create<AuthState>((set) => ({
    name: null,
    provider: null,
    email: null,
    setUser: (name, email, provider) => set({ name, email, provider }),
}));

export default useAuthStore;