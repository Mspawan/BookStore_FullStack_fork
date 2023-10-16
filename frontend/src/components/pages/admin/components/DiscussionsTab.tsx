import { useState } from "react";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { DiscussionModel } from "../../../../models/DiscussionModel";
import { LoadingSpinner } from "../../../commons/loading_spinner/LoadingSpinner";
import { Pagination } from "../../../commons/pagination/Pagination";
import { useFetchOpenDiscussions } from "../../../../utils/useFetchOpenDiscussions";
import { DiscussionsTabDiscussionCard } from "./DiscussionsTabDiscussionCard";

export const DiscussionsTab = () => {
    
    const { authentication } = useAuthenticationContext();

    const [discussions, setDiscussions] = useState<DiscussionModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [isDiscussionClosed, setIsDiscussionClosed] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalAmountOfDiscussions, setTotalAmountOfDiscussions] = useState(0);
    const [totalPages, setTotlalPages] = useState(0);
    const [resultRange, setResultRange] = useState({start: 1, end: 5});

    const urlPaginationParams = `?page=${currentPage - 1}&discussions-per-page=5`;

    useFetchOpenDiscussions(authentication, setDiscussions, setTotalAmountOfDiscussions, setTotlalPages, setIsLoading, setHttpError, urlPaginationParams, currentPage, isDiscussionClosed);

    return (

        <div className="flex flex-col gap-10">

            {isLoading ? <LoadingSpinner /> : 
            
                <>

                    {httpError ? <div>{httpError}</div> : 
                        
                        <>

                            {discussions.length === 0 ? <p className="text-2xl font-semibold max-lg:text-center">No open discussions at the moment.</p>

                                :

                                <>

                                    <div className="sm:text-xl flex gap-5 items-center justify-start">

                                        Open discussions: 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">
                                            {resultRange.start} - {totalAmountOfDiscussions <= 5 ? totalAmountOfDiscussions : resultRange.end}
                                        </p> 

                                        out of 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">{totalAmountOfDiscussions}</p>

                                    </div>

                                    {discussions.map(
                                            
                                        discussion => <DiscussionsTabDiscussionCard key={discussion.id} discussion={discussion} setIsDiscussionClosed={setIsDiscussionClosed} />

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