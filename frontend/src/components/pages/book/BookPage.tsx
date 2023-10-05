import { useState } from "react";
import { Quote } from "../../commons/quote/Quote"
import { BookModel } from "../../../models/BookModel";
import { useFetchBook } from "../../../utils/useFetchBook";
import { BookPageBookCard } from "./components/BookPageBookCard";
import { LoadingSpinner } from "../../commons/loading_spinner/LoadingSpinner";
import { useFetchBookReviews } from "../../../utils/useFetchBookReviews";
import { ReviewModel } from "../../../models/ReviewModel";
import { LatestReviews } from "./components/LatestReviews";

export const BookPage = () => {

    const bookId = (window.location.pathname).split('/')[2];

    // Book state
    const [book, setBook] = useState<BookModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    // Book Reviews state
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [reviewsHttpError, setReviewsHttpError] = useState<string | null>(null);
    
    const urlPaginationParams = `?page=0&reviews-per-page=3`;

    useFetchBook(bookId, setBook, setIsLoading, setHttpError);

    useFetchBookReviews(bookId, setReviews, setTotalStars, setIsLoadingReviews, setReviewsHttpError, setTotalAmountOfReviews, urlPaginationParams, 0);

    return (

        <section className="mt-[70px] w-full flex flex-col items-center gap-10 pb-10">

            <Quote quoteId={6} />

            {!isLoading ? 

                <>

                    {!httpError ? 

                        <div className="max-container px-5 pt-10 pb-3">

                            <BookPageBookCard book={book} totalStars={totalStars} />

                        </div>
                        
                        : <div className="max-container px-5 py-10">{httpError}</div>

                    }

                </>
                
                : <LoadingSpinner />
            
            }

            <LatestReviews bookId={bookId} reviews={reviews} totalAmountOfReviews={totalAmountOfReviews} isLoadingReviews={isLoadingReviews} reviewsHttpError={reviewsHttpError} />

        </section>

    )

}