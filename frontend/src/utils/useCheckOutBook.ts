export const useCheckOutBook = async (bookId: string,
                                      authentication: { isAuthenticated: boolean; token: string; },
                                      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                      setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                      setCopiesAvailable: React.Dispatch<React.SetStateAction<number>>,
                                      setIsCheckedOut: React.Dispatch<React.SetStateAction<boolean>>,
                                      setCurrentCheckoutsCount: React.Dispatch<React.SetStateAction<number>>) => {

    const checkOutBook = async () => {

        if (authentication.isAuthenticated) {
            
            setIsLoading(true);

            const url = `http://localhost:8080/api/books/secure/checkout/${bookId}`;

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

            setCopiesAvailable(prev => prev - 1);
            setIsCheckedOut(true);
            setCurrentCheckoutsCount(prev => prev + 1);
            setIsLoading(false);
        }
    }

    checkOutBook().catch(

        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )

};