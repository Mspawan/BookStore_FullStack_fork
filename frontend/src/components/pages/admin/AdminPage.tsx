import { Navigate } from "react-router-dom";
import { useAuthenticationContext } from "../../../authentication/authenticationContext";
import { Quote } from "../../commons/quote/Quote"
import { useState } from "react";
import { AddBookTab } from "./components/AddBookTab";
import { QuantitiesTab } from "./components/QuantitiesTab";
import { DiscussionsTab } from "./components/DiscussionsTab";

export const AdminPage = () => {

    const { authentication } = useAuthenticationContext();

    if (!authentication.isAuthenticated) return <Navigate to={"/"} />

    const [isAddBookTabSelected, setIsAddBookTabSelected] = useState(true);
    const [isQuantitiesTabSelected, setIsQuantitiesTabSelected] = useState(false);
    const [isDiscussionsTabSelected, setIsDiscussionsTabSelected] = useState(false);

    const handleAddBookTabClick = () => {

        setIsAddBookTabSelected(true);
        setIsQuantitiesTabSelected(false);
        setIsDiscussionsTabSelected(false);
    };

    const handleQuantitiesTabClick = () => {

        setIsAddBookTabSelected(false);
        setIsQuantitiesTabSelected(true);
        setIsDiscussionsTabSelected(false);
    };

    const handleDiscussionsTabClick = () => {

        setIsAddBookTabSelected(false);
        setIsQuantitiesTabSelected(false);
        setIsDiscussionsTabSelected(true);
    };

    return (

        <section className="mt-[70px] w-full flex flex-col items-center gap-10">

            <Quote quoteId={5} />

            <div className="max-container w-full p-5 flex max-lg:flex-col gap-14 relative">                

                <div className="flex lg:flex-col gap-5">

                    <button className={`${isAddBookTabSelected && "bg-teal-100 shadow-custom lg:shadow-md"} nav-link`} onClick={handleAddBookTabClick}>
                        Add Book
                    </button>

                    <button className={`${isQuantitiesTabSelected && "bg-teal-100 shadow-custom lg:shadow-md"} nav-link`} onClick={handleQuantitiesTabClick}>
                        Quantities
                    </button>

                    <button className={`${isDiscussionsTabSelected && "bg-teal-100 shadow-custom lg:shadow-md"} nav-link`} onClick={handleDiscussionsTabClick}>
                        Discussions
                    </button>

                </div>

                <div className="bg-teal-600 absolute lg:w-[1px] lg:top-0 lg:bottom-0 lg:left-40 max-lg:h-[1px] max-lg:left-5 max-lg:right-5 max-lg:top-24" />

                <div className="w-full">

                    { isAddBookTabSelected && <AddBookTab /> }
                    { isQuantitiesTabSelected && <QuantitiesTab /> }
                    { isDiscussionsTabSelected && <DiscussionsTab /> }

                </div>

            </div>

        </section>

    )
}