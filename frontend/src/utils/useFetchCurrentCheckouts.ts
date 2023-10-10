import { useEffect } from "react";
import { CheckoutModel } from "../models/CheckoutModel";

export const useFetchCurrentCheckouts = (authentication: { isAuthenticated: boolean; token: string; },
                                         setCurrentCheckouts: React.Dispatch<React.SetStateAction<CheckoutModel[]>>,
                                         setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                         setHttpError: React.Dispatch<React.SetStateAction<string | null>>) => {

    useEffect(

        () => {

            const fetchUserCurrentCheckouts = async () => {

                if (authentication.isAuthenticated) {

                    const url = "http://localhost:8080/api/checkouts/secure/current-checkouts";

                    const requestOptions = {

                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authentication.token}`,
                            "Content-type": "application/json"
                        }
                    };

                    const response = await fetch(url, requestOptions);

                    const responseJson = await response.json();

                    console.log(responseJson);

                    if (!response.ok) {
                        throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
                    }

                    const loadedCheckouts: CheckoutModel[] = [];

                    for (const key in responseJson) {

                        loadedCheckouts.push(responseJson[key]);
                    }

                    setCurrentCheckouts(loadedCheckouts);
                    setIsLoading(false);
                };

                setIsLoading(false);
            };

            fetchUserCurrentCheckouts().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, []

    );

}