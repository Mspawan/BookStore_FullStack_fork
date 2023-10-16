export const useDeleteBook= async (bookId: string,
                                   authentication: { isAuthenticated: boolean; token: string; },
                                   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                   setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                   setIsBookDeleted: React.Dispatch<React.SetStateAction<boolean>>) => {

    const deleteBook = async () => {

        console.log("------------------------");

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const url = `http://localhost:8080/api/admin/secure/delete-book/${bookId}`;
            
            const requestOptions = {

                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                    "Content-type": "application/json"
                }
            };

            const response = await fetch(url, requestOptions);

            const responseJson = await response.json();
                        
            console.log(responseJson);

            if (!response.ok) {
                throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
            }

            setIsBookDeleted(prev => !prev);
        }

        setHttpError(null);
        setIsLoading(false);

        console.log("delete book fetch");
        console.log("------------------------");
    }

    deleteBook().catch(
        
        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )
};