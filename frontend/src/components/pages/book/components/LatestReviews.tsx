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
            
            <p className="font-semibold lg:text-3xl max-lg:text-2xl">Latest Reviews: 3 out of {totalAmountOfReviews}</p>

            {!isLoadingReviews ? 

                <>

                    {!reviewsHttpError ?

                        <div className="flex flex-col gap-5">

                            {reviews.map(

                                (review) => <ReviewCard key={review.id} review={review} />

                            )}

                            <Link to={`/reviews/${bookId}`} className="btn-main self-start">All reviews</Link>

                        </div>

                        : <div className="max-container px-5 py-10">{reviewsHttpError}</div>

                    }

                </>
                
                : <LoadingSpinner />

            }

        </div>

    )

}