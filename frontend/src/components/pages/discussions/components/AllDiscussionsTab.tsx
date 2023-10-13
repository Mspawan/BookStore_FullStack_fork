import { useState } from "react";
import { DiscussionModel } from "../../../../models/DiscussionModel";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { useFetchDiscussions } from "../../../../utils/useFetchDiscussions";
import { LoadingSpinner } from "../../../commons/loading_spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { Pagination } from "../../../commons/pagination/Pagination";
import avatar from "../../../../assets/icons/avatar.svg";

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

                                    <Link to={"/discussions"} type="button" className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800">
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
                                            
                                        record => (
                                        
                                            <div className="flex flex-col gap-5 p-5 rounded-md shadow-custom-2" key={record.id}>

                                                <div className="w-full flex gap-5 max-lg:flex-col justify-between">
                                                
                                                    <p className="font-semibold lg:text-2xl max-lg:text-xl">
                                                        
                                                        <span className="text-teal-600">Case #{record.id}: </span>
                                                        
                                                        {record.title}
                                                    
                                                    </p>
                                                    
                                                    <p className="font-light lg:text-xl max-lg:text-lg">{record.personEmail}</p>

                                                </div>

                                                <div className="h-[1px] w-full bg-teal-800" />

                                                <div className="flex flex-col gap-5 w-full rounded-md shadow-custom-3 p-3">
                                                    
                                                    <div className="flex gap-4 items-center text-lg">
                                                                    
                                                        <img src={avatar} alt="avatar" width={50} height={50} />
                                                            
                                                        <p className="font-bold">{record.personFirstName} {record.personLastName}</p>

                                                    </div>

                                                    <div className="w-full bg-teal-50 border border-teal-800 rounded-md p-3 text-lg">

                                                        <p>{`"${record.question}"`}</p>

                                                    </div>

                                                </div>

                                                {record.closed ? 

                                                    <>

                                                        <div className="flex flex-col gap-5 w-full rounded-md shadow-custom-3 p-3">
                                                            
                                                            <div className="flex gap-4 items-center">
                                                                            
                                                                <img src={avatar} alt="avatar" width={50} height={50} />

                                                                <div className="w-full max-lg:flex-col flex lg:gap-4 justify-between">
                                                                    
                                                                    <p className="font-bold">Administration team</p>

                                                                    <p className="font-light text-lg">{record.adminEmail}</p>

                                                                </div>

                                                            </div>

                                                            <div className="w-full bg-teal-50 border border-teal-800 rounded-md p-3">

                                                                <p>{`"${record.response}"`}</p>

                                                            </div>

                                                        </div>

                                                        <p className="text-green-600 font-semibold text-lg max-lg:text-center">Discussion is closed</p>

                                                    </>

                                                    :

                                                    <div className="text-lg max-lg:text-center">

                                                        <p className="text-amber-600 font-semibold">Discussion is open</p>

                                                        <p>Pending response from administration. Thank you for your patience!</p>

                                                    </div>

                                                }
                                                
                                            </div>
                                            
                                        )

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