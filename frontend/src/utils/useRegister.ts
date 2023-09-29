import { RegistrationModel } from "../models/RegistrationModel";

export const useRegister = async (registrationModel: RegistrationModel, 
                                  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
                                  setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                  setToken: React.Dispatch<React.SetStateAction<string>>) => {

    const submitRegister = async () => {

        setIsLoading(true);

        const url = "http://localhost:8080/api/auth/register";

        const requestOptions = {

            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(registrationModel)
        };

        const response = await fetch(url, requestOptions);

        const responseJson = await response.json();
                    
        console.log("httpError ---> " + responseJson.message);

        if (!response.ok) {
            throw new Error(responseJson.message);
        }

        const token = responseJson.token;
        
        setToken(token);

        setIsLoading(false);

    }

    submitRegister().catch(

        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )

};