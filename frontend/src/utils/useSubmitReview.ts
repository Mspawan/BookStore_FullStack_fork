import { ReviewModel } from "../models/ReviewModel";

export const useSubmitReview = async (bookId: string,
                                      authentication: { isAuthenticated: boolean; token: string; },
                                      review: ReviewModel,
                                      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                      setIsReviewLeft: React.Dispatch<React.SetStateAction<boolean>>,
                                      setHttpError: React.Dispatch<React.SetStateAction<string | null>>) => {

    const submitReview = async () => {

        console.log("------------------------");

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const url = `http://localhost:8080/api/books/secure/review/${bookId}`;
            
            const requestOptions = {

                method: "POST",
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(review)
            };

            const response = await fetch(url, requestOptions);

            const responseJson = await response.json();
                        
            console.log(responseJson);

            if (!response.ok) {
                throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
            }
            
            setIsReviewLeft(true);

        }

        setIsLoading(false);

        console.log("submit review fetch");
        console.log("------------------------");
    }

    submitReview().catch(
        
        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )

};