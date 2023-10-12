import { DiscussionModel } from "../models/DiscussionModel";

export const useSubmitDiscussion = async (authentication: { isAuthenticated: boolean; token: string; },
                                          discussionModel: DiscussionModel,
                                          setDiscussionModel: React.Dispatch<React.SetStateAction<DiscussionModel>>,
                                          setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                          setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                          setDisplaySuccess: React.Dispatch<React.SetStateAction<boolean>>) => {

    const submitDiscussion = async () => {

        console.log("------------------------");

        setIsLoading(true);

        if (authentication.isAuthenticated) {

            const url = "http://localhost:8080/api/discussions/secure/add-discussion";
            
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
                        
            console.log(responseJson);

            if (!response.ok) {
                throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
            }
            
            setDisplaySuccess(true);

        }

        setDiscussionModel({ title: "", question: "" });
        setIsLoading(false);

        console.log("submit discussion fetch");
        console.log("------------------------");
    }

    submitDiscussion().catch(
        
        (error: any) => {

            setIsLoading(false);
            setHttpError(error.message);
        }
    )
};