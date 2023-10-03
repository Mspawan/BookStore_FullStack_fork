import { useEffect } from "react";

export const useCheckIfBookReviewedByUser = (bookId: string,
                                             token: string,
                                             setIsReviewLeft: React.Dispatch<React.SetStateAction<boolean>>,
                                             setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                             setHttpError: React.Dispatch<React.SetStateAction<string | null>>) => {

    useEffect(

        () => {

            const fetchIsBookReviewedByUser = async () => {
                
                console.log("------------------------");
                
                const url = `http://localhost:8080/api/books/secure/is-reviewed/${bookId}`;

                const requestOptions = {

                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json"
                    }
                };

                const response = await fetch(url, requestOptions);

                const responseJson = await response.json();
                
                console.log(responseJson);

                if (!response.ok) {
                    throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
                }

                setIsReviewLeft(responseJson);
                setIsLoading(false);

                console.log("is book reviewed fetch");
                console.log("------------------------");
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