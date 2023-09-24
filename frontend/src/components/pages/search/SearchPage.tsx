import { Quote } from "../../commons/quote/Quote"
import { useState } from "react";
import { BookModel } from "../../../models/BookModel";
import { useFetchBooks } from "../../../utils/useFetchBooks";
import { LoadingSpinner } from "../../commons/loading_spinner/LoadingSpinner";
import { SearchPageBookCard } from "./components/SearchPageBookCard";
import { SearchPanel } from "./components/SearchPanel";

export const SearchPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    const [selectedGenre, setSelectedGenre] = useState("");
    const [titleQuery, setTitleQuery] = useState("");

    useFetchBooks(setBooks, setIsLoading, setHttpError);

    if (isLoading) { return <LoadingSpinner /> }

    if (httpError) { return <div className="container m-5">{httpError}</div> }

    return (

        <section className="mt-[70px] w-full flex flex-col items-center gap-10 max-container px-5 mb-20">

            <Quote quoteId={1} />

            <SearchPanel selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} titleQuery={titleQuery} setTitleQuery={setTitleQuery} />

            {books.map(

                book => <SearchPageBookCard book={book} />

            )}

        </section>

    )

}