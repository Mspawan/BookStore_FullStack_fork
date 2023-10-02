import { LoginModel } from "../models/LoginModel";

export const useLogin = async (loginModel: LoginModel, 
                               setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
                               setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                               setAuthentication: React.Dispatch<React.SetStateAction<{ isAuthenticated: boolean; token: string; }>>) => {

    const submitLogin = async () => {

        setIsLoading(true);

        const url = "http://localhost:8080/api/auth/authenticate";

        const requestOptions = {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(loginModel)
        };

        const response = await fetch(url, requestOptions);

        const responseJson = await response.json();
                    
        console.log("httpError ---> " + responseJson.message);

        if (!response.ok) {
            throw new Error(responseJson.message);
        }

        const token = responseJson.token;
        
        setAuthentication({ isAuthenticated: true, token: token });

        localStorage.setItem("authenticationState", JSON.stringify({ isAuthenticated: true, token: token }));

        setIsLoading(false);

    }

    submitLogin().catch(

        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )

};