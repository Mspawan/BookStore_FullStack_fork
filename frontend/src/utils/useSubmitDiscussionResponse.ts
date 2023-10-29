import { DiscussionModel } from "../models/DiscussionModel";

export const useSubmitDiscussionResponse = async (authentication: { isAuthenticated: boolean; token: string; },
                                                  discussionModel: DiscussionModel,
                                                  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                                  setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                                  setIsDiscussionClosed: React.Dispatch<React.SetStateAction<boolean>>) => {

    const submitDiscussionResponse = async () => {

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}`;

            const url = baseUrl + "/admin/secure/close-discussion";
            
            const requestOptions = {

                method: "POST",
                headers: {
                    Authorization: `Bearer ${authentication.token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(discussionModel)
            };

            const response = await fetch(url, requestOptions);

            const responseJson = await response.json();

            if (!response.ok) {
                throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
            }

            setIsDiscussionClosed(prev => !prev);
        }

        setHttpError(null);
        setIsLoading(false);
    }

    submitDiscussionResponse().catch(
        
        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )
};