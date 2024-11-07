import { CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {getGoolgeWithAccessToken} from "../../api/googleAPI.ts";

function GoogleLoginComponent() {

    const redirect_uri = "http://localhost:5173/member/google";

    const getData = function (response: CredentialResponse) {
        console.log(response)

        const accessToken: string = response.credential||'';

        console.log(accessToken)

        getGoolgeWithAccessToken(accessToken,redirect_uri)

    }


    return (
        <div className="flex flex-col">
            <GoogleLogin
                onSuccess={ result => getData(result)}
                onError={() => {
                    console.error("Failed Login..");
                }}
            />
        </div>
    );
}

export default GoogleLoginComponent;