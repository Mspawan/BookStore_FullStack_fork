import { useState } from "react";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { HistoryRecordModel } from "../../../../models/HistoryRecordModel";
import { useFetchHistoryRecords } from "../../../../utils/useFetchHistoryRecords";
import { LoadingSpinner } from "../../../commons/loading_spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { Pagination } from "../../../commons/pagination/Pagination";
import { HistoryTabRecordCard } from "./HistoryTabRecordCard";

export const HistoryTab = () => {

    const { authentication } = useAuthenticationContext();

    const [historyRecords, setHistoryRecords] = useState<HistoryRecordModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalAmountOfRecords, setTotalAmountOfRecords] = useState(0);
    const [totalPages, setTotlalPages] = useState(0);
    const [resultRange, setResultRange] = useState({start: 1, end: 5});

    const urlPaginationParams = `?page=${currentPage - 1}&records-per-page=5`;

    useFetchHistoryRecords(authentication, setHistoryRecords, setTotalAmountOfRecords, setTotlalPages, setIsLoading, setHttpError, urlPaginationParams, currentPage);

    return (

        <div className="flex flex-col gap-10">

            {isLoading ? <LoadingSpinner /> : 
            
                <>

                    {httpError ? <div>{httpError}</div> : 
                        
                        <>

                            {historyRecords.length === 0 ? 

                                <div className="flex flex-col gap-10 lg:items-start max-lg:items-center">

                                    <p className="text-2xl font-semibold">No history records yet.</p>

                                    <Link to={'/search'} className="custom-btn-2 text-center">
                                        Search for books
                                    </Link>

                                </div>

                                :

                                <>

                                    <div className="sm:text-xl flex gap-5 items-center justify-start">

                                        History Records: 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">
                                            {resultRange.start} - {totalAmountOfRecords <= 5 ? totalAmountOfRecords : resultRange.end}
                                        </p> 

                                        out of 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">{totalAmountOfRecords}</p>

                                    </div>

                                    {historyRecords.map(
                                            
                                        record => <HistoryTabRecordCard key={record.id} record={record} />

                                    )}

                                    <Pagination currentPage={currentPage} totalPages={totalPages} totalAmountOfItems={totalAmountOfRecords} 
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