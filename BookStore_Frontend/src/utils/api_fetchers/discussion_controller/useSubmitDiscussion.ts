import { DiscussionModel } from "../../../models/DiscussionModel";

export const useSubmitDiscussion = async (authentication: { isAuthenticated: boolean; token: string; },
                                          discussionModel: DiscussionModel,
                                          setDiscussionModel: React.Dispatch<React.SetStateAction<DiscussionModel>>,
                                          setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                          setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                          setDisplaySuccess: React.Dispatch<React.SetStateAction<boolean>>) => {

    const submitDiscussion = async () => {

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}`;

            const url = baseUrl + "/discussions/secure/add-discussion";
            
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
            
            setDisplaySuccess(true);
        }

        setDiscussionModel({ title: "", question: "" });
        setHttpError(null);
        setIsLoading(false);
    }

    submitDiscussion().catch(
        
        (error: any) => {

            setDisplaySuccess(false);
            setIsLoading(false);
            setHttpError(error.message);
        }
    )
};