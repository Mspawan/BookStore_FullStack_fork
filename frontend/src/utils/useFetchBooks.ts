import { useEffect } from "react";
import { BookModel } from "../models/BookModel";

export const useFetchBooks = (url: string, currentPage: number,
                              setBooks: React.Dispatch<React.SetStateAction<BookModel[]>>,
                              setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                              setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                              setTotalAmountOfBooks?: React.Dispatch<React.SetStateAction<number>>,
                              setTotlalPages?: React.Dispatch<React.SetStateAction<number>>) => {

    useEffect(

        () => {

            const fetchBooks = async () => {

                // const url: string = "http://localhost:8080/api/books?page=0&books-per-page=5";

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Ooops, something went wrong!");
                }

                const responseJson = await response.json();

                console.log(responseJson);

                if (setTotalAmountOfBooks) setTotalAmountOfBooks(responseJson.totalElements);
                if (setTotlalPages) setTotlalPages(responseJson.totalPages);

                const responseBooksContentArray = responseJson.content;

                const loadedBooks: BookModel[] = [];

                for (const key in responseBooksContentArray) {

                    loadedBooks.push(responseBooksContentArray[key]);
                }

                setBooks(loadedBooks);
                setIsLoading(false);
                
                console.log("fetching");
            }

            fetchBooks().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, [currentPage]

    );

}