import { useEffect } from "react";
import { BookModel } from "../models/BookModel";

export const useFetchBook = (bookId: string,
                             setBook: React.Dispatch<React.SetStateAction<BookModel>>,
                             setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                             setHttpError: React.Dispatch<React.SetStateAction<string | null>>) => {

    useEffect(

        () => {

            const fetchBook = async () => {

                const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}`;
                
                const url = baseUrl + `/books/${bookId}`;

                const response = await fetch(url);

                const responseJson = await response.json();

                if (!response.ok) {
                    throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
                }

                const loadedBook: BookModel = responseJson;

                setBook(loadedBook);
                setIsLoading(false);
            }

            fetchBook().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, []

    );

}