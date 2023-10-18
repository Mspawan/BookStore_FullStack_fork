export const useReturnBook = async (bookId: string,
                                    authentication: { isAuthenticated: boolean; token: string; },
                                    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                    setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                    setIsBookReturned: React.Dispatch<React.SetStateAction<boolean>>) => {

    const returnBook = async () => {

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const url = `http://localhost:8080/api/books/secure/return/${bookId}`;
            
            const requestOptions = {

                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                    "Content-type": "application/json"
                }
            };

            const response = await fetch(url, requestOptions);

            const responseJson = await response.json();

            if (!response.ok) {
                throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
            }
            
            setIsBookReturned(prev => !prev);
        }

        setIsLoading(false);
    }

    returnBook().catch(
        
        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )

};