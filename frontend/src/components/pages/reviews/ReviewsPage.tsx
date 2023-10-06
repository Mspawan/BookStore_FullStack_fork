import { useState } from "react";
import { Quote } from "../../commons/quote/Quote"
import { ReviewModel } from "../../../models/ReviewModel";
import { useFetchBookReviews } from "../../../utils/useFetchBookReviews";
import { Pagination } from "../../commons/pagination/Pagination";
import { ReviewCard } from "../../commons/review_card/ReviewCard";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../commons/loading_spinner/LoadingSpinner";

export const ReviewsPage = () => {

    const bookId = (window.location.pathname).split('/')[2];

    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [reviewsHttpError, setReviewsHttpError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotlalPages] = useState(0);
    const [resultRange, setResultRange] = useState({start: 1, end: 5});

    const urlPaginationParams = `?page=${currentPage - 1}&reviews-per-page=5`;

    useFetchBookReviews(bookId, setReviews, setTotalStars, setIsLoadingReviews, setReviewsHttpError, setTotalAmountOfReviews, urlPaginationParams, currentPage, setTotlalPages);

    console.log(totalPages);

    return (

        <section className="mt-[70px] w-full flex flex-col items-center gap-10">

            <Quote quoteId={7} />

            <div className="w-full max-container p-5 flex flex-col gap-5">

                {!isLoadingReviews ? 

                    <>

                        {!reviewsHttpError ?

                            <div className="flex flex-col gap-5">

                                <div className="flex items-center justify-between">

                                    <div className="sm:text-xl flex gap-5 items-center">

                                        Reviews: 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">
                                            {resultRange.start} - {totalAmountOfReviews <= 5 ? totalAmountOfReviews : resultRange.end}
                                        </p> 

                                        out of 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">{totalAmountOfReviews}</p>

                                    </div>

                                    <Link to={`/book/${bookId}`} className="btn-main self-start">Back to book</Link>

                                </div>

                                {reviews.map(

                                    (review) => <ReviewCard key={review.id} review={review} />

                                )}

                            </div>

                            : <div className="max-container px-5 py-10">{reviewsHttpError}</div>

                        }

                    </>

                    : <LoadingSpinner />

                }

            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} totalAmountOfItems={totalAmountOfReviews} 
                setCurrentPage={setCurrentPage} setResultRange={setResultRange} 
            />

        </section>

    )

}