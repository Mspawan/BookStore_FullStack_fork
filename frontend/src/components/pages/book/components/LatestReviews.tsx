import { ReviewModel } from "../../../../models/ReviewModel";
import { ReviewCard } from "../../../commons/review_card/ReviewCard";
import { LoadingSpinner } from "../../../commons/loading_spinner/LoadingSpinner";
import { Link } from "react-router-dom";

type LatestReviewsProps = {
    bookId: string
    reviews: ReviewModel[],
    totalAmountOfReviews: number,
    isLoadingReviews: boolean,
    reviewsHttpError: string | null,
}

export const LatestReviews = ({ bookId, reviews, totalAmountOfReviews, isLoadingReviews, reviewsHttpError }: LatestReviewsProps) => {

    return (

        <div className="w-full max-container p-5 flex flex-col gap-5">

            {totalAmountOfReviews !== 0 ? 

                <>

                    {totalAmountOfReviews < 3 ? 
            
                        <p className="font-semibold lg:text-3xl max-lg:text-2xl">Latest Reviews: {totalAmountOfReviews} out of {totalAmountOfReviews}</p>

                        :

                        <p className="font-semibold lg:text-3xl max-lg:text-2xl">Latest Reviews: 3 out of {totalAmountOfReviews}</p>

                    }

                    {isLoadingReviews ? <LoadingSpinner /> :

                        <>

                            {reviewsHttpError ? <div className="max-container px-5 py-10">{reviewsHttpError}</div> :

                                <div className="flex flex-col gap-5">

                                    {reviews.map(

                                        (review) => <ReviewCard key={review.id} review={review} />

                                    )}

                                    <Link to={`/reviews/${bookId}`} className="custom-btn-1 self-start">All reviews</Link>

                                </div>

                            }

                        </>

                    }

                </>

                :

                <p className="font-semibold text-center lg:text-2xl max-lg:text-xl">No reviews yet. Be the first one to rate this book and leave a comment!</p>
                
            }

        </div>

    )

}