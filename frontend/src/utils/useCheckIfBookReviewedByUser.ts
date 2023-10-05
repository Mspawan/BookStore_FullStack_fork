import { useEffect } from "react";

export const useCheckIfBookReviewedByUser = (bookId: string,
                                             authentication: { isAuthenticated: boolean; token: string; },
                                             setIsReviewLeft: React.Dispatch<React.SetStateAction<boolean>>,
                                             setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                             setHttpError: React.Dispatch<React.SetStateAction<string | null>>) => {

    useEffect(

        () => {

            const fetchIsBookReviewedByUser = async () => {

                if (authentication.isAuthenticated) {
                
                    const url = `http://localhost:8080/api/books/secure/is-reviewed/${bookId}`;

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

                    setIsReviewLeft(responseJson);
                }
                
                setIsLoading(false);
            }

            fetchIsBookReviewedByUser().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, []

    );

}