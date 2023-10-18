import { useEffect } from "react";

export const useFetchBookAverageRating = (bookId: string,
                                          setAverageRating: React.Dispatch<React.SetStateAction<number>>,
                                          setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                          setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                          isRatingChanged: boolean) => {

    useEffect(

        () => {

            const fetchAverageRating = async () => {
                
                const url = `http://localhost:8080/api/reviews/average-rating/${bookId}`;

                const response = await fetch(url);

                const responseJson = await response.json();

                if (!response.ok) {
                    throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
                }

                const roundedRating = (Math.round((responseJson) * 2) / 2).toFixed(1);

                setAverageRating(Number(roundedRating));

                setIsLoading(false);
            }

            fetchAverageRating().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, [isRatingChanged]

    );

}