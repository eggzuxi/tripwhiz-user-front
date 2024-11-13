import {create} from "zustand";


interface AuthState {
    name: string | null;
    email: string | null;
    accessToken: string | null;
    setUser: (name: string, email: string, accessToken: string) => void;
}

const useAuthStore = create<AuthState>(
        (set) => ({

            // name: '비회원',
            // email:'',
            // accessToken: '',
            // setUser: (name, email, accessToken) => set(() => {
            //
            //     console.log("=========================================1")
            //     console.log(name,email,accessToken)
            //
            //     // return {name: name, email:email, accessToken:accessToken}
            //     return {name, email, accessToken}
            // })

            name: sessionStorage.getItem('name') || '비회원', // 세션 스토리지에서 name 가져오기
            email: sessionStorage.getItem('email') || '',
            accessToken: sessionStorage.getItem('accessToken') || '',
            setUser: (name, email, accessToken) => {
                // 세션 스토리지에 상태 저장
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('accessToken', accessToken);

                console.log("=============================1")
                console.log(name, email, accessToken)

                set(() => {
                    return { name, email, accessToken };
                });
            }
        }),
)

export default useAuthStore;