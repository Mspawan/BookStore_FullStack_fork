import { Navigate } from "react-router-dom";
import { Quote } from "../../commons/quote/Quote"
import { useAuthenticationContext } from "../../../authentication/authenticationContext";
import { useState } from "react";
import { NewDiscussionTab } from "./components/NewDiscussionTab";
import { AllDiscussionsTab } from "./components/AllDiscussionsTab";

export const DiscussionsPage = () => {

    const { authentication } = useAuthenticationContext();

    if (!authentication.isAuthenticated) return <Navigate to={"/"} />

    const [isAllDiscussionsTabSelected, setIsAllDiscussionsTabSelected] = useState(false);

    return (

        <section className="mt-[70px] w-full flex flex-col items-center gap-10">

            <Quote quoteId={2} />

            <div className="max-container w-full p-5 flex max-lg:flex-col gap-14 relative">                

                <div className="flex lg:flex-col gap-5">

                    <button className={`${!isAllDiscussionsTabSelected && "bg-teal-100 shadow-custom lg:shadow-md"} nav-link`} onClick={() => setIsAllDiscussionsTabSelected(false)}>
                        New discussion
                    </button>

                    <button className={`${isAllDiscussionsTabSelected && "bg-teal-100 shadow-custom lg:shadow-md"} nav-link`} onClick={() => setIsAllDiscussionsTabSelected(true)}>
                        All discussions
                    </button>

                </div>

                <div className="bg-teal-600 absolute lg:w-[1px] lg:top-0 lg:bottom-0 lg:left-48 max-lg:h-[1px] max-lg:left-5 max-lg:right-5 max-lg:top-24" />

                <div className="w-full">

                    { isAllDiscussionsTabSelected ? <AllDiscussionsTab /> : <NewDiscussionTab /> }

                </div>

            </div>

        </section>

    )

}