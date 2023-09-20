import { useEffect } from "react";
import { BookModel } from "../models/BookModel";

export const useFetchBooks = (setBooks: React.Dispatch<React.SetStateAction<BookModel[]>>,
                              setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                              setHttpError: React.Dispatch<React.SetStateAction<string | null>>) => {

    useEffect(

        () => {

            const fetchBooks = async () => {

                const url: string = "http://localhost:8080/api/books";

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Ooops, something went wrong!");
                }

                const responseJson = await response.json();

                const loadedBooks: BookModel[] = [];

                for (const key in responseJson) {

                    loadedBooks.push(responseJson[key]);
                }

                setBooks(loadedBooks);
                setIsLoading(false);            
            }

            fetchBooks().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, []

    );

}