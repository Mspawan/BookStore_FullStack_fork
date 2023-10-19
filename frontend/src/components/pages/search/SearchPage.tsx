import { Quote } from "../../commons/quote/Quote"
import { useState } from "react";
import { BookModel } from "../../../models/BookModel";
import { useFetchBooks } from "../../../utils/useFetchBooks";
import { LoadingSpinner } from "../../commons/loading_spinner/LoadingSpinner";
import { SearchPageBookCard } from "./components/SearchPageBookCard";
import { SearchPanel } from "./components/SearchPanel";
import { Pagination } from "../../commons/pagination/Pagination";
import { PaginatedItemsCount } from "../../commons/pagination/PaginatedItemsCount";

export const SearchPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotlalPages] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [titleQuery, setTitleQuery] = useState("");
    const [resultRange, setResultRange] = useState({start: 1, end: 5});
    const [searchParams, setSearchParams] = useState("");

    const handleSearchClick = () => {
        
        setSelectedGenre("");
        setHttpError(null);
        if (titleQuery !== "") setSearchParams(`/search/by-title?title-query=${titleQuery}`);
    };

    const handleGenreChange = (value: string) => {

        setTitleQuery("");
        setHttpError(null);
        setSelectedGenre(value);
        if (value === "") setSearchParams("");
        if (value !== "") setSearchParams(`/search/by-genre?genre-query=${value}`);
    };
    
    const urlPaginationParams = (searchParams === "" ? "?" : "&") + `page=${currentPage - 1}&books-per-page=5`;

    useFetchBooks(urlPaginationParams, currentPage, setBooks, setIsLoading, setHttpError, setTotalAmountOfBooks, setTotlalPages, searchParams);

    return (

        <div className="page-container px-5">

            <Quote quoteId={1} />

            <SearchPanel selectedGenre={selectedGenre} handleGenreChange={handleGenreChange} titleQuery={titleQuery} setTitleQuery={setTitleQuery} handleSearchClick={handleSearchClick} />

            {isLoading ? <LoadingSpinner /> :

                <>

                    {httpError ? <div>{httpError}</div> :
                        
                        <>

                            {totalAmountOfBooks <= 0 ? <div>Nothing was found</div> :
                                
                                <>

                                    <PaginatedItemsCount itemsName={"Books"} totalAmountOfItems={totalAmountOfBooks} resultRange={resultRange} />
                                
                                    {books.map(book => <SearchPageBookCard key={book.id} book={book} />)}

                                </>

                            }

                        </>

                    }
                
                </>

            }

            <Pagination currentPage={currentPage} totalPages={totalPages} totalAmountOfItems={totalAmountOfBooks} 
                setCurrentPage={setCurrentPage} setResultRange={setResultRange} 
            />

        </div>

    )

}