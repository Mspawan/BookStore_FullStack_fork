import { useState } from "react";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { DiscussionModel } from "../../../../models/DiscussionModel";
import { useSubmitDiscussion } from "../../../../utils/useSubmitDiscussion";
import { FormLoader } from "../../../commons/form_loader/FormLoader";
import { FieldErrors } from "../../../commons/field_errors/FieldErrors";

export const NewDiscussionTab = () => {

    const { authentication } = useAuthenticationContext();

    const [discussionModel, setDiscussionModel] = useState<DiscussionModel>({ title: "", question: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {

        setDiscussionModel({ ...discussionModel, [event.target.name]: event.target.value });
    };

    const handleSubmitDiscussion = () => {
        
        useSubmitDiscussion(authentication, discussionModel, setDiscussionModel, setIsLoading, setHttpError, setDisplaySuccess);
    }

    console.log(discussionModel);

    return (

        <div className="flex max-lg:flex-col gap-10 items-center justify-start">

            <div className="flex-1 flex flex-col items-center gap-5 text-center px-5 max-w-lg">

                <p className="text-3xl max-lg:text-2xl font-semibold leading-snug">
                    What can we help you with?
                </p>

                <div className="text-xl max-lg:text-lg font-light">

                    If you feel like our service is insufficient,
                    or if you have any suggestion on possible improvements,
                    do not hesitate to write about it!

                </div>

                <div className="text-xl max-lg:text-lg font-light">

                    We strive to make our stock a good fit for everyone. 
                    If you have trouble finding something, feel free to 
                    contact us by sending our administration a personal message!

                </div>

                <div className="text-xl max-lg:text-lg font-light">

                    Your message is private, it will only be visible to you and our administration team.

                </div>

            </div>

            <div className="custom-form flex-1">

                {displaySuccess && 
                    
                    <div className="text-lg font-semibold bg-green-200 rounded-md px-5 py-1">
                        Your message is sent successfully!
                    </div>
                
                }

                <p className="text-center text-3xl font-semibold">Open discussion</p>

                <FormLoader isLoading={isLoading} />

                <form className="flex flex-col gap-5 w-full">

                    <div className="flex flex-col gap-1">

                        {httpError && <FieldErrors fieldName="title" httpError={httpError} />}
                        <input type="text" name="title" value={discussionModel.title} onChange={handleChange} placeholder="Discussion title" className="input shadow-md"/>
                    
                    </div>

                    <div className="flex flex-col gap-1">

                        {httpError && <FieldErrors fieldName="question" httpError={httpError} />}
                        <textarea rows={3} name="question" value={discussionModel.question} onChange={event => handleChange(event)} placeholder="Your question / suggestion here..." className="input shadow-md"/>

                    </div>

                </form>

                <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800" onClick={handleSubmitDiscussion}>Submit discussion</button>

            </div>

            

        </div>

    )

}