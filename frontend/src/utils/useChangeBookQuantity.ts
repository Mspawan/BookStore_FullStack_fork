export const useChangeBookQuantity= async (bookId: string,
                                           operation: string,
                                           authentication: { isAuthenticated: boolean; token: string; },
                                           setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                           setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                           setTotalQuantity: React.Dispatch<React.SetStateAction<number>>,
                                           setAvailableQuantity: React.Dispatch<React.SetStateAction<number>>) => {

    const changeBookQuantity = async () => {

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const url = `http://localhost:8080/api/admin/secure/${operation}-quantity/${bookId}`;
            
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
            
            if (operation === "increase") {

                setTotalQuantity(prev => prev + 1);
                setAvailableQuantity(prev => prev + 1);

            } else if (operation === "decrease") {
                
                setTotalQuantity(prev => prev - 1);
                setAvailableQuantity(prev => prev - 1);
            }

        }

        setHttpError(null);
        setIsLoading(false);
    }

    changeBookQuantity().catch(
        
        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )
};