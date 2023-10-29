export const useDeleteBook= async (bookId: string,
                                   authentication: { isAuthenticated: boolean; token: string; },
                                   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                   setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                   setIsBookDeleted: React.Dispatch<React.SetStateAction<boolean>>) => {

    const deleteBook = async () => {

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}`;

            const url = baseUrl + `/admin/secure/delete-book/${bookId}`;
            
            const requestOptions = {

                method: "DELETE",
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

            setIsBookDeleted(prev => !prev);
        }

        setHttpError(null);
        setIsLoading(false);
    }

    deleteBook().catch(
        
        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )
};