import { create } from "zustand";

interface AuthState {
    name: string | null;
    email: string;
    accessToken: string | null;
    setUser: (name: string, email: string, accessToken: string) => void;
    logout: () => void; // 로그아웃 함수
}

const useAuthStore = create<AuthState>(
    (set) => ({
        name: sessionStorage.getItem("name") || "비회원",
        email: sessionStorage.getItem("email") || "",
        accessToken: sessionStorage.getItem("accessToken") || "",

        setUser: (name, email, accessToken) => {
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("accessToken", accessToken);

            set(() => ({ name, email, accessToken }));
        },

        logout: () => {
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("accessToken");

            set(() => ({
                name: "비회원",
                email: "",
                accessToken: null,
            }));
        },
    })
);

export default useAuthStore;
