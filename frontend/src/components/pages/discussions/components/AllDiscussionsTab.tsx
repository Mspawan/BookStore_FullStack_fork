import { useState } from "react";
import { DiscussionModel } from "../../../../models/DiscussionModel";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { useFetchDiscussions } from "../../../../utils/useFetchDiscussions";
import { LoadingSpinner } from "../../../commons/loading_spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { Pagination } from "../../../commons/pagination/Pagination";
import { AllDiscussionsTabDiscussionCard } from "./AllDiscussionsTabDiscussionCard";

export const AllDiscussionsTab = () => {

    const { authentication } = useAuthenticationContext();

    const [discussions, setDiscussions] = useState<DiscussionModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalAmountOfDiscussions, setTotalAmountOfDiscussions] = useState(0);
    const [totalPages, setTotlalPages] = useState(0);
    const [resultRange, setResultRange] = useState({start: 1, end: 5});

    const urlPaginationParams = `?page=${currentPage - 1}&discussions-per-page=5`;

    useFetchDiscussions(authentication, setDiscussions, setTotalAmountOfDiscussions, setTotlalPages, setIsLoading, setHttpError, urlPaginationParams, currentPage);

    return (

        <div className="flex flex-col gap-10">

            {isLoading ? <LoadingSpinner /> : 
            
                <>

                    {httpError ? <div>{httpError}</div> : 
                        
                        <>

                            {discussions.length === 0 ? 

                                <div className="flex flex-col gap-10 lg:items-start max-lg:items-center">

                                    <p className="text-2xl font-semibold">No discussions yet.</p>

                                    <Link to={"/discussions"} type="button" className="custom-btn-2">
                                        Open discussion
                                    </Link>

                                </div>

                                :

                                <>

                                    <div className="sm:text-xl flex gap-5 items-center justify-start">

                                        Your discussions: 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">
                                            {resultRange.start} - {totalAmountOfDiscussions <= 5 ? totalAmountOfDiscussions : resultRange.end}
                                        </p> 

                                        out of 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">{totalAmountOfDiscussions}</p>

                                    </div>

                                    {discussions.map(
                                            
                                        discussion => <AllDiscussionsTabDiscussionCard key={discussion.id} discussion={discussion} />

                                    )}

                                    <Pagination currentPage={currentPage} totalPages={totalPages} totalAmountOfItems={totalAmountOfDiscussions} 
                                        setCurrentPage={setCurrentPage} setResultRange={setResultRange} 
                                    />

                                </>

                            }

                        </>

                    }

                </>

            }
            
        </div>

    )

}