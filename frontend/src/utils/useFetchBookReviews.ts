import { useEffect } from "react";
import { ReviewModel } from "../models/ReviewModel";

export const useFetchBookReviews = (bookId: string,
                                    setReviews: React.Dispatch<React.SetStateAction<ReviewModel[]>>,
                                    setTotalStars: React.Dispatch<React.SetStateAction<number>>,
                                    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                    setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                    urlPaginationParams?: string,
                                    currentPage?: number,
                                    setTotalAmountOfReviews?: React.Dispatch<React.SetStateAction<number>>,
                                    setTotlalPages?: React.Dispatch<React.SetStateAction<number>>,
                                    urlSearchParams?: string) => {

    useEffect(

        () => {

            const fetchReviews = async () => {

                console.log("------------------------");
                
                const baseUrl = `http://localhost:8080/api/reviews/${bookId}`;

                const url: string = baseUrl + (urlPaginationParams ? urlPaginationParams : `?page=0&reviews-per-page=5`);

                const response = await fetch(url);

                const responseJson = await response.json();
                
                console.log(responseJson);

                if (!response.ok) {
                    throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
                }

                if (setTotalAmountOfReviews) setTotalAmountOfReviews(responseJson.totalElements);
                if (setTotlalPages) setTotlalPages(responseJson.totalPages);

                const responseReviewsContentArray = responseJson.content;

                const loadedReviews: ReviewModel[] = [];
                let weightedStarReviews: number = 0;

                for (const key in responseReviewsContentArray) {

                    loadedReviews.push(responseReviewsContentArray[key]);
                    weightedStarReviews = weightedStarReviews + responseReviewsContentArray[key].rating;
                }

                if (loadedReviews) {
                    const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                    setTotalStars(Number(round));
                }

                setReviews(loadedReviews);
                setIsLoading(false);
                
                console.log("reviews fetch");
                console.log("------------------------");
            }

            fetchReviews().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, [currentPage, urlSearchParams]

    );

}