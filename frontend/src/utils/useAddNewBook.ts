import { BookModel } from "../models/BookModel";

export const useAddNewBook= async (authentication: { isAuthenticated: boolean; token: string; },
                                          bookModel: BookModel,
                                          setNewBook: React.Dispatch<React.SetStateAction<BookModel>>,
                                          setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                          setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                          setDisplaySuccess: React.Dispatch<React.SetStateAction<boolean>>) => {

    const addNewBook = async () => {

        console.log("------------------------");

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const url = "http://localhost:8080/api/admin/secure/add-book";
            
            const requestOptions = {

                method: "POST",
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(bookModel)
            };

            const response = await fetch(url, requestOptions);

            const responseJson = await response.json();
                        
            console.log(responseJson);

            if (!response.ok) {
                throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
            }
            
            setDisplaySuccess(true);

        }

        setNewBook({ title: "", author: "", description: "", copies: 0, copiesAvailable: 0, genres: [], img: "" });
        setHttpError(null);
        setIsLoading(false);

        console.log("add new book fetch");
        console.log("------------------------");
    }

    addNewBook().catch(
        
        (error: any) => {

            setDisplaySuccess(false);
            setIsLoading(false);
            setHttpError(error.message);
        }
    )
};