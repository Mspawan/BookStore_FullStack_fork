import { useState } from "react";
import { BookModel } from "../../../../models/BookModel";
import { useFetchBooks } from "../../../../utils/useFetchBooks";
import { Pagination } from "../../../commons/pagination/Pagination";
import { LoadingSpinner } from "../../../commons/loading_spinner/LoadingSpinner";
import { QuantitiesTabBookCard } from "./QuantitiesTabBookCard";

export const QuantitiesTab = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [isBookDeleted, setIsBookDeleted] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotlalPages] = useState(0);
    const [resultRange, setResultRange] = useState({start: 1, end: 5});

    const [titleQuery, setTitleQuery] = useState("");
    const [searchParams, setSearchParams] = useState("");
    
    const urlPaginationParams = (searchParams === "" ? "?" : "&") + `page=${currentPage - 1}&books-per-page=5`;

    const handleSearchClick = () => {

        setHttpError(null);
        setSearchParams(`/search/by-title?title-query=${titleQuery}`);
    };

    useFetchBooks(urlPaginationParams, currentPage, setBooks, setIsLoading, setHttpError, setTotalAmountOfBooks, setTotlalPages, searchParams, isBookDeleted);

    return (

        <div className="flex flex-col gap-10">

            <div className="flex gap-5">

                <input className="input" placeholder="Search books by title..." value={titleQuery} onChange={event => setTitleQuery(event.target.value)} />

                <button className="custom-btn-2" onClick={() => handleSearchClick()}>
                    Search
                </button>

            </div>

            {isLoading ? <LoadingSpinner /> :

                <>

                    {httpError ? <div>{httpError}</div> :
                        
                        <>

                            {totalAmountOfBooks === 0 ? <div>Nothing was found</div> :
                                
                                <>

                                    <div className="sm:text-xl flex gap-5 items-center justify-center">

                                        Books: 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">
                                            {resultRange.start} - {totalAmountOfBooks <= 5 ? totalAmountOfBooks : resultRange.end}
                                        </p> 

                                        out of 

                                        <p className="sm:text-3xl max-sm:text-xl text-teal-600">{totalAmountOfBooks}</p>

                                    </div>
                                
                                    {books.map(
                                        
                                        book => <QuantitiesTabBookCard key={book.id} book={book} setIsBookDeleted={setIsBookDeleted} />
                                        
                                    )}

                                </>

                            }

                        </>

                    }

                </>

            }

            <Pagination currentPage={currentPage} totalPages={totalPages} totalAmountOfItems={totalAmountOfBooks} 
                setCurrentPage={setCurrentPage} setResultRange={setResultRange} />
            
        </div>

    )

}