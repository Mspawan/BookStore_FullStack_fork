import { useState } from "react";
import { Quote } from "../../commons/quote/Quote"
import { BookModel } from "../../../models/BookModel";
import { useFetchBook } from "../../../utils/useFetchBook";
import { BookPageBookCard } from "./components/BookPageBookCard";
import { LoadingSpinner } from "../../commons/loading_spinner/LoadingSpinner";
import { useAuthenticationContext } from "../../../authentication/authenticationContext";
import { useFetchBookReviews } from "../../../utils/useFetchBookReviews";
import { ReviewModel } from "../../../models/ReviewModel";
import { useCheckIfBookReviewedByUser } from "../../../utils/useCheckIfBookReviewedByUser";

export const BookPage = () => {

    const bookId = (window.location.pathname).split('/')[2];

    const { authentication } = useAuthenticationContext();    

    // Book state
    const [book, setBook] = useState<BookModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    // Book Reviews state
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [reviewsHttpError, setReviewsHttpError] = useState<string | null>(null);

    // User review state
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);
    const [userReviewHttpError, setUserReviewHttpError] = useState<string | null>(null);
    
    const urlPaginationParams = `?page=0&reviews-per-page=5`;

    useFetchBook(bookId, setBook, setIsLoading, setHttpError);

    useFetchBookReviews(bookId, setReviews, setTotalStars, setIsLoadingReviews, setReviewsHttpError, urlPaginationParams, 0);

    useCheckIfBookReviewedByUser(bookId, authentication.token, setIsReviewLeft, setIsLoadingUserReview, setUserReviewHttpError);

    return (

        <section className="mt-[70px] w-full flex flex-col items-center gap-10">

            <Quote quoteId={6} />

            {!isLoading ? 

                <>

                    {!httpError ? 

                        <div className="max-container px-5 py-10">

                            <BookPageBookCard book={book} />

                        </div>
                        
                        : <div className="max-container px-5 py-10">{httpError}</div>

                    }

                </>
                
                : <LoadingSpinner />
            
            }

        </section>

    )

}