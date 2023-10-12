import { useState } from "react";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { DiscussionModel } from "../../../../models/DiscussionModel";
import { useSubmitDiscussion } from "../../../../utils/useSubmitDiscussion";

export const NewDiscussionTab = () => {

    const { authentication } = useAuthenticationContext();

    const [discussionModel, setDiscussionModel] = useState<DiscussionModel>({ title: "", question: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const handleSubmitDiscussion = () => {
        
        useSubmitDiscussion(authentication, discussionModel, setDiscussionModel, setIsLoading, setHttpError, setDisplaySuccess);
    }

    return (

        <div>
            
            NewDiscussionTab
            
        </div>

    )

}