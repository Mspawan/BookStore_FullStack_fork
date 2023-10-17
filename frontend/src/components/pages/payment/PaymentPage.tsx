import { Navigate } from "react-router-dom";
import { useAuthenticationContext } from "../../../authentication/authenticationContext";
import { Quote } from "../../commons/quote/Quote"

export const PaymentPage = () => {

    const { authentication } = useAuthenticationContext();

    if (!authentication.isAuthenticated) return <Navigate to={"/"} />

    return (

        <div className="page-container">

            <Quote quoteId={4} />

            Payment Page

        </div>

    )

}