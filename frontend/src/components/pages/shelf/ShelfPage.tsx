import { Navigate } from "react-router-dom";
import { Quote } from "../../commons/quote/Quote"
import { useAuthenticationContext } from "../../../authentication/authenticationContext";

export const ShelfPage = () => {

    const { authentication } = useAuthenticationContext();

    if (!authentication.isAuthenticated) return <Navigate to={"/"} />

    return (

        <section className="mt-[70px] w-full flex flex-col items-center gap-10">

            <Quote quoteId={2} />

            Shelf Page

        </section>

    )

}