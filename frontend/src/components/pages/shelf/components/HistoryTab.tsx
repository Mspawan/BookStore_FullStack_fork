import { useState } from "react";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { HistoryRecordModel } from "../../../../models/HistoryRecordModel";
import { useFetchHistoryRecords } from "../../../../utils/useFetchHistoryRecords";
import { LoadingSpinner } from "../../../commons/loading_spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { Pagination } from "../../../commons/pagination/Pagination";

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

    const renderDate = (dateValue: Date) => {

        const date = new Date(dateValue);

        const longMonth = date.toLocaleDateString("en-us", { month: "long" });
        const dateDay = date.getDate();
        const dateYear = date.getFullYear();

        return longMonth + " " + dateDay + ", " + dateYear;
    }

    return (

        <div className="flex flex-col gap-10">

            {isLoading ? <LoadingSpinner /> : 
            
                <>

                    {httpError ? <div>{httpError}</div> : 
                        
                        <>

                            {historyRecords.length === 0 ? 

                                <div className="flex flex-col gap-10 lg:items-start max-lg:items-center">

                                    <p className="text-2xl font-semibold">No history records yet.</p>

                                    <Link to={'/search'} className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800 text-center">
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
                                            
                                        record => (
                                        
                                            <div className="flex max-lg:flex-col lg:items-start max-lg:items-center gap-5 p-5 rounded-md shadow-custom-2" key={record.id}>

                                                <img src={record.bookDTO.img} alt="cover" width={200} height={320} className="shadow-xl" />

                                                <div className="flex flex-col gap-10 xl:w-5/12 lg:flex-1">

                                                    <div className="max-lg:text-center">
                                                    
                                                        <p className="font-semibold lg:text-2xl max-lg:text-xl">{record.bookDTO.title}</p>
                                                        <p className="font-light lg:text-xl max-lg:text-lg">{record.bookDTO.author}</p>

                                                    </div>
                                                    
                                                    <div className="flex gap-5 max-lg:justify-center">

                                                        {record.bookDTO.genres.map(

                                                            genre => <div key={genre.description} className="bg-teal-100 py-2 px-4 rounded-md">{genre.description}</div>

                                                        )}

                                                    </div>
                                                
                                                </div>

                                                <div className="flex-1 border-2 border-teal-800 rounded-md p-4 flex flex-col gap-3 items-center">

                                                    <p className="text-xl font-semibold">History record info</p>

                                                    <div className="h-[1px] w-full bg-teal-800" />

                                                    <div className="flex gap-2 items-center text-lg text-center">

                                                        <p>Checked-out:</p>
                                                        
                                                        <p className="text-teal-600 font-semibold"> {renderDate(record.checkoutDate)}</p>

                                                    </div>

                                                    <div className="flex gap-2 items-center text-lg text-center">

                                                        <p>Returned:</p>
                                                        
                                                        <p className="text-teal-600 font-semibold"> {renderDate(record.returnDate)}</p>

                                                    </div>

                                                    <div className="h-[1px] w-full bg-teal-800" />

                                                    <p className="text-center">Help others find their adventure by reviewing this book or find more exciting books in our collection.</p>

                                                    <div className="flex max-xl:flex-col gap-5 items-center">

                                                        <Link to={`/book/${record.bookDTO.id}`} className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800 text-center">
                                                            Leave a review
                                                        </Link>
                                                        
                                                        <Link to={'/search'} className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800 text-center">
                                                            Search for more books
                                                        </Link>

                                                    </div>

                                                </div>
                                                
                                            </div>
                                            
                                        )

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