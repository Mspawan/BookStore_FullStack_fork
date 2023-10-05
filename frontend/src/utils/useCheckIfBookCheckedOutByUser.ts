import { useEffect } from "react";

export const useCheckIfBookCheckedOutByUser = (bookId: string,
                                               authentication: { isAuthenticated: boolean; token: string; },
                                               setIsCheckedOut: React.Dispatch<React.SetStateAction<boolean>>,
                                               setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                               setHttpError: React.Dispatch<React.SetStateAction<string | null>>) => {

    useEffect(

        () => {

            const fetchUserCurrentCheckoutsCount = async () => {

                if (authentication.isAuthenticated) {

                    const url = `http://localhost:8080/api/books/secure/is-checked-out/${bookId}`;

                    const requestOptions = {

                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authentication.token}`,
                            "Content-type": "application/json"
                        }
                    };

                    const response = await fetch(url, requestOptions);

                    const responseJson = await response.json();

                    if (!response.ok) {
                        throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
                    }

                    setIsCheckedOut(responseJson);
                };

                setIsLoading(false);
            };

            fetchUserCurrentCheckoutsCount().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, []

    );

}