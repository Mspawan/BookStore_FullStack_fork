import { Navigate } from "react-router-dom";
import { useAuthenticationContext } from "../../../authentication/authenticationContext";
import { Quote } from "../../commons/quote/Quote"

export const AdminPage = () => {

    const { authentication } = useAuthenticationContext();

    if (!authentication.isAuthenticated) return <Navigate to={"/"} />

    return (

        <section className="mt-[70px] w-full flex flex-col items-center gap-10">

            <Quote quoteId={5} />

            Admin Page

        </section>

    )
}