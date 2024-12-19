import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';

const clientId = "107035162244-df08rm5qe4b2h780nuphhm5murf91lha.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={clientId}>
        <App />
    </GoogleOAuthProvider>
);
