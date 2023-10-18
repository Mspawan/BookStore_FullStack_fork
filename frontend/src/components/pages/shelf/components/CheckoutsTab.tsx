import { useState } from "react";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { CheckoutModel } from "../../../../models/CheckoutModel";
import { useFetchCurrentCheckouts } from "../../../../utils/useFetchCurrentCheckouts";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../../commons/loading_spinner/LoadingSpinner";
import { CheckoutsTabCheckoutCard } from "./CheckoutsTabCheckoutCard";

export const CheckoutsTab = () => {

    const { authentication } = useAuthenticationContext();

    const [currentCheckouts, setCurrentCheckouts] = useState<CheckoutModel[]>([]);
    const [isLoadingCheckouts, setIsLoadingCheckouts] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    const [isBookReturned, setIsBookReturned] = useState(false);
    const [isCheckoutRenewed, setIsCheckoutRenewed] = useState(false);

    useFetchCurrentCheckouts(authentication, setCurrentCheckouts, setIsLoadingCheckouts, setHttpError, isBookReturned, isCheckoutRenewed);

    return (

        <div className="flex flex-col gap-10">

            {isLoadingCheckouts ? <LoadingSpinner /> : 
            
                <>

                    {httpError ? <div>{httpError}</div> : 
                        
                        <>

                            {currentCheckouts.length === 0 ? 
                            
                                <div className="flex flex-col gap-10 lg:items-start max-lg:items-center">

                                    <p className="text-2xl font-semibold">Currently no books checked out.</p>
                    
                                    <Link to={'/search'} className="custom-btn-2 text-center">
                                        Search for books
                                    </Link>
                    
                                </div>

                                :

                                <>

                                    {currentCheckouts.map(
                                            
                                        checkout => <CheckoutsTabCheckoutCard key={checkout.bookDTO.id} checkout={checkout} setIsBookReturned={setIsBookReturned} setIsCheckoutRenewed={setIsCheckoutRenewed} />

                                    )}

                                </>
                            
                            }

                        </>

                    }

                </>

            }
            
        </div>

    )

}