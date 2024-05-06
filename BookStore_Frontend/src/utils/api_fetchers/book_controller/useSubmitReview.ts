import { ReviewModel } from "../../../models/ReviewModel";

export const useSubmitReview = async (bookId: string,
                                      authentication: { isAuthenticated: boolean; token: string; },
                                      review: ReviewModel,
                                      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                      setIsReviewLeft: React.Dispatch<React.SetStateAction<boolean>>,
                                      setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                      setIsRatingChanged: React.Dispatch<React.SetStateAction<boolean>>) => {

    const submitReview = async () => {

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}`;

            const url = baseUrl + `/books/secure/review/${bookId}`;
            
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

            if (!response.ok) {
                throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
            }
            
            setIsReviewLeft(true);
            setIsRatingChanged(prev => !prev);
        }

        setIsLoading(false);
    }

    submitReview().catch(
        
        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )

};