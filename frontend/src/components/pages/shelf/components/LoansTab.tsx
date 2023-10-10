import { useState } from "react";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { CheckoutModel } from "../../../../models/CheckoutModel";
import { useFetchCurrentCheckouts } from "../../../../utils/useFetchCurrentCheckouts";
import { Link } from "react-router-dom";

export const LoansTab = () => {

    const { authentication } = useAuthenticationContext();

    const [currentCheckouts, setCurrentCheckouts] = useState<CheckoutModel[]>([]);
    const [isLoadingCheckouts, setIsLoadingCheckouts] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    useFetchCurrentCheckouts(authentication, setCurrentCheckouts, setIsLoadingCheckouts, setHttpError);

    return (

        <div className="flex flex-col gap-10">

            {currentCheckouts.map(
                
                checkout => (
                
                    <div className="flex max-lg:flex-col lg:items-start max-lg:items-center gap-5 p-5 rounded-md shadow-custom-2" key={checkout.bookDTO.id}>

                        <img src={checkout.bookDTO.img} alt="cover" width={200} height={320} className="shadow-xl" />

                        <div className="flex flex-col gap-10 xl:w-5/12 lg:flex-1">

                            <div className="max-lg:text-center">
                            
                                <p className="font-semibold lg:text-2xl max-lg:text-xl">{checkout.bookDTO.title}</p>
                                <p className="font-light lg:text-xl max-lg:text-lg">{checkout.bookDTO.author}</p>

                            </div>
                            
                            <div className="flex gap-5 max-lg:justify-center">

                                {checkout.bookDTO.genres.map(

                                    (genre) => <div key={genre.description} className="bg-teal-100 py-2 px-4 rounded-md">{genre.description}</div>

                                )}

                            </div>
                        
                        </div>

                        <div className="flex-1 border-2 border-teal-800 rounded-md p-4 flex flex-col gap-3 items-center">

                            <p className="text-xl font-semibold">Checkout options</p>

                            <div className="h-[1px] w-full bg-teal-800" />

                            {checkout.daysLeft > 0 &&

                                <p className="text-green-600 text-lg font-semibold">
                                    Due in {checkout.daysLeft} days.
                                </p>
                            }

                            {checkout.daysLeft === 0 &&

                                <p className="text-amber-500 text-lg font-semibold">
                                    Due today.
                                </p>
                            }

                            {checkout.daysLeft < 0 &&

                                <p className="text-red-600 text-lg font-semibold">
                                    Overdue by {checkout.daysLeft} days.
                                </p>
                            }

                            <div className="flex flex-col gap-5">

                                <div className="flex gap-3 max-xl:flex-col">

                                    <button className="btn-main">Return book</button>

                                    <button className="btn-main">Renew for 7 days</button>

                                </div>

                                <Link to={'/search'} className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800 text-center">
                                    Search for more books
                                </Link>

                            </div>

                            <div className="h-[1px] w-full bg-teal-800" />

                            <p className="text-center">Help others find their adventure by reviewing this book.</p>

                            <Link to={`/book/${checkout.bookDTO.id}`} className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800 text-center">
                                Leave a review
                            </Link>

                        </div>
                        
                    </div>
                    
                )
            )}
            
        </div>

    )

}