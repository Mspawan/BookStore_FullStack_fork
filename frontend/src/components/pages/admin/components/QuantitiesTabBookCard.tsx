import { useState } from "react";
import { BookModel } from "../../../../models/BookModel"
import { FormLoader } from "../../../commons/form_loader/FormLoader";
import { useChangeBookQuantity } from "../../../../utils/useChangeBookQuantity";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { useDeleteBook } from "../../../../utils/useDeleteBook";

type BookCardProps = {
    book: BookModel,
    setIsBookDeleted: React.Dispatch<React.SetStateAction<boolean>>
}

export const QuantitiesTabBookCard = ({ book, setIsBookDeleted }: BookCardProps) => {

    const { authentication } = useAuthenticationContext();

    const [totalQuantity, setTotalQuantity] = useState(book.copies);
    const [availableQuantity, setAvailableQuantity] = useState(book.copiesAvailable);

    const [isLoadingChangeQuantity, setIsLoadingChangeQuantity] = useState(false);
    const [isLoadingDeleteBook, setIsLoadingDeleteBook] = useState(false);
    const [changeQuantityHttpError, setChangeQuantityHttpError] = useState<string | null>(null);
    const [deleteBookHttpError, setDeleteBookHttpError] = useState<string | null>(null);

    const handleChangeQuantityClick = (operation: string) => {

        useChangeBookQuantity(`${book.id}`, operation, authentication, setIsLoadingChangeQuantity, setChangeQuantityHttpError, setTotalQuantity, setAvailableQuantity);
    }

    const handleDeleteBookClick = () => {

        useDeleteBook(`${book.id}`, authentication, setIsLoadingDeleteBook, setDeleteBookHttpError, setIsBookDeleted);
    }

    return (

        <div className="flex max-lg:flex-col lg:items-start max-lg:items-center gap-10 p-5 rounded-md shadow-custom-2" key={book.id}>

            <img src={book.img} alt="cover" width={200} height={320} className="shadow-xl max-lg:w-[200px]"/>
            
            <div className="flex flex-col gap-10 xl:w-5/12 lg:flex-1">

                <div className="max-lg:text-center">
                
                    <p className="font-semibold lg:text-2xl max-lg:text-xl">{book.title}</p>
                    <p className="font-light lg:text-xl max-lg:text-lg">{book.author}</p>

                </div>

                <div className="max-lg:text-center">

                    {book.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quos nemo, sunt exercitationem consectetur sint expedita magni beatae placeat 
                    dolorem assumenda libero nobis impedit rem modi in a illum qui. Porro ad voluptate 
                    voluptas suscipit, libero facilis cumque? Nulla ut quia ad odio voluptatem autem 
                    molestiae deleniti corporis voluptas ab distinctio quaerat explicabo repellendus 
                    perferendis ullam fugit odit dolores porro obcaecati nostrum vero rerum, id laboriosam!

                </div>
            
            </div>

            <div className="flex-1 w-full border-2 border-teal-800 rounded-md p-4 flex flex-col gap-3 items-center">

                <p className="text-xl font-semibold">Manage book options</p>

                <div className="h-[1px] w-full bg-teal-800" />

                <div className="flex gap-2 items-center text-lg text-center">

                    <p>Total copies:</p>
                    
                    <p className="text-teal-600 font-semibold"> {totalQuantity}</p>

                </div>

                <div className="flex gap-2 items-center text-lg text-center">

                    <p>Copies Available:</p>
                    
                    <p className="text-teal-600 font-semibold"> {availableQuantity}</p>

                </div>

                <div className="flex flex-col gap-5">

                    {(isLoadingChangeQuantity || isLoadingDeleteBook) ? <FormLoader isLoading={true} /> :

                        <>

                            {changeQuantityHttpError && 

                                <div className="border border-red-500 py-1 px-2 bg-red-100 rounded-md text-center">
                                    {changeQuantityHttpError}
                                </div>

                            }

                            {deleteBookHttpError && 
                            
                                <div className="border border-red-500 py-1 px-2 bg-red-100 rounded-md text-center">
                                    {deleteBookHttpError}
                                </div>
                                
                            }

                            <div className="flex gap-3 max-xl:flex-col">

                                <button className="btn-main" onClick={() => handleChangeQuantityClick("increase")}>
                                    Increase Quantity
                                </button>

                                <button className="btn-main" onClick={() => handleChangeQuantityClick("decrease")}>
                                    Decrease Quantity
                                </button>

                            </div>

                        </>

                    }

                </div>

                <div className="h-[1px] w-full bg-teal-800" />

                <button className="btn-main" onClick={handleDeleteBookClick}>
                    Delete Book
                </button>

            </div>

        </div>

    )

}