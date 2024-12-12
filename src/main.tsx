import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import {RouterProvider} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import mainRouter from "./routes/mainRouter.tsx";
const clientId = "107035162244-df08rm5qe4b2h780nuphhm5murf91lha.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={clientId}>
        <RouterProvider router={mainRouter}/>
    </GoogleOAuthProvider>
)
