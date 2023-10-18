import { useState } from "react"
import { useAuthenticationContext } from "../../../../authentication/authenticationContext"
import { CheckoutModel } from "../../../../models/CheckoutModel"
import { useRenewCheckout } from "../../../../utils/useRenewCheckout"
import { useReturnBook } from "../../../../utils/useReturnBook"
import { FormLoader } from "../../../commons/form_loader/FormLoader"
import { Link } from "react-router-dom"

type CheckoutsTabCheckoutCardProps = {
    checkout: CheckoutModel,
    setIsBookReturned: React.Dispatch<React.SetStateAction<boolean>>,
    setIsCheckoutRenewed: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckoutsTabCheckoutCard = ({ checkout, setIsBookReturned, setIsCheckoutRenewed }: CheckoutsTabCheckoutCardProps) => {

    const { authentication } = useAuthenticationContext();

    const [isLoadingReturnBook, setIsLoadingReturnBook] = useState(false);
    const [returnBookHttpError, setReturnBookHttpError] = useState<string | null>(null);

    const [isLoadingRenewCheckout, setIsLoadingRenewCheckout] = useState(false);
    const [renewCheckoutHttpError, setRenewCheckoutHttpError] = useState<string | null>(null);

    const handleReturnBookClick = (bookId: number | undefined) => {

        useReturnBook(`${bookId}`, authentication, setIsLoadingReturnBook, setReturnBookHttpError, setIsBookReturned);
    }

    const handleRenewCheckoutClick = (bookId: number | undefined) => {

        useRenewCheckout(`${bookId}`, authentication, setIsLoadingRenewCheckout, setRenewCheckoutHttpError, setIsCheckoutRenewed);
    }

    const renderDueDays = () => {

        if (checkout.daysLeft > 0) {
            
            return <p className="text-green-600 text-lg font-semibold">Due in {checkout.daysLeft} days.</p>
        
        } else if (checkout.daysLeft === 0) {
            
            return <p className="text-amber-500 text-lg font-semibold">Due today.</p>

        } else {
            
            return <p className="text-red-600 text-lg font-semibold">Overdue by {checkout.daysLeft} days.</p>
        }
    }

    return (

        <div className="flex max-lg:flex-col lg:items-start max-lg:items-center gap-5 p-5 rounded-md shadow-custom-2">

            <img src={checkout.bookDTO.img} alt="cover" width={200} height={320} className="shadow-xl" />

            <div className="flex flex-col gap-10 xl:w-5/12 lg:flex-1">

                <div className="max-lg:text-center">
                
                    <p className="font-semibold lg:text-2xl max-lg:text-xl">{checkout.bookDTO.title}</p>
                    <p className="font-light lg:text-xl max-lg:text-lg">{checkout.bookDTO.author}</p>

                </div>
                
                <div className="flex gap-5 max-lg:justify-center">

                    {checkout.bookDTO.genres.map(

                        (genre) => <div key={genre.description} className="bg-teal-100 py-1 px-3 rounded-md">{genre.description}</div>

                    )}

                </div>
            
            </div>

            <div className="flex-1 border-2 border-teal-800 rounded-md p-4 flex flex-col gap-3 items-center">

                <p className="text-xl font-semibold">Checkout options</p>

                <div className="h-[1px] w-full bg-teal-800" />

                {renderDueDays()}

                <div className="flex flex-col gap-5">

                    {(isLoadingReturnBook || isLoadingRenewCheckout) ? <FormLoader isLoading={true} /> :

                        <>

                            {returnBookHttpError && 

                                <div className="border border-red-500 py-1 px-2 bg-red-100 rounded-md text-center">
                                    {returnBookHttpError}
                                </div>

                            }

                            {renewCheckoutHttpError && 
                            
                                <div className="border border-red-500 py-1 px-2 bg-red-100 rounded-md text-center">
                                    {renewCheckoutHttpError}
                                </div>
                                
                            }

                            <div className="flex gap-3 max-xl:flex-col">

                                <button className="custom-btn-1" onClick={() => handleReturnBookClick(checkout.bookDTO.id)}>
                                    Return book
                                </button>

                                <button className="custom-btn-1" onClick={() => handleRenewCheckoutClick(checkout.bookDTO.id)}>
                                    Renew for 7 days
                                </button>

                            </div>

                        </>

                    }

                    <Link to={'/search'} className="custom-btn-2 text-center">
                        Search for more books
                    </Link>

                </div>

                <div className="h-[1px] w-full bg-teal-800" />

                <p className="text-center">Help others find their adventure by reviewing this book.</p>

                <Link to={`/book/${checkout.bookDTO.id}`} className="custom-btn-2 text-center">
                    Leave a review
                </Link>

            </div>
            
        </div>

    )

}