import { useState } from "react";
import { useAuthenticationContext } from "../../../../authentication/authenticationContext";
import { BookModel } from "../../../../models/BookModel";
import { FormLoader } from "../../../commons/form_loader/FormLoader";
import { FieldErrors } from "../../../commons/field_errors/FieldErrors";
import { genres } from "../../../../constants/constants";
import { GenreModel } from "../../../../models/GenreModel";
import { useAddNewBook } from "../../../../utils/useAddNewBook";

export const AddBookTab = () => {

    const { authentication } = useAuthenticationContext();

    const [newBook, setNewBook] = useState<BookModel>({ title: "", author: "", description: "", copies: 0, copiesAvailable: 0, genres: [], img: "" });
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {

        setNewBook({ ...newBook, [event.target.name]: event.target.value });
    };

    const handleGenreClick = (genre: string) => {

        if (selectedGenres.length === 0) {
            setSelectedGenres([...selectedGenres, genre]);
        } else if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(item => item !== genre));            
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }

        setNewBook(prev => ({ ...prev, genres: selectedGenres.map(item => new GenreModel(item)) }));
    }

    const handleSubmitBookClick = async () => {

        await useAddNewBook(authentication, newBook, setNewBook, setIsLoading, setHttpError, setDisplaySuccess);
    };

    

    return (

        <div className="custom-form max-w-full">

            <p className="text-center text-3xl max-lg:text-2xl font-semibold">Add Book</p>

            <FormLoader isLoading={isLoading} />

            <form className="flex flex-col gap-5 w-full">

                <div className="flex max-lg:flex-col gap-5 w-full">
                    
                    <div className="flex flex-col gap-1 lg:w-7/12">

                        {httpError && <FieldErrors fieldName="title" httpError={httpError} />}
                        <input type="text" name="title" value={newBook.title} onChange={handleChange} placeholder="Book title" className="input shadow-md"/>
                    
                    </div>

                    <div className="flex flex-col gap-1 lg:w-5/12">

                        {httpError && <FieldErrors fieldName="author" httpError={httpError} />}
                        <input type="text" name="author" value={newBook.author} onChange={handleChange} placeholder="Author" className="input shadow-md"/>

                    </div>

                </div>

                <div className="flex flex-col gap-1">

                    {httpError && <FieldErrors fieldName="description" httpError={httpError} />}
                    <textarea rows={3} name="description" value={newBook.description} onChange={handleChange} placeholder="Book description" className="input shadow-md"/>

                </div>

                <div className="flex max-lg:flex-col gap-5 w-full">
                
                    <div className="flex flex-col gap-1 lg:w-3/12">

                        {httpError && <FieldErrors fieldName="copies" httpError={httpError} />}

                        <div className="flex gap-5 items-center whitespace-nowrap pl-1">

                            Copies :

                            <input type="number" name="copies" value={newBook.copies} onChange={handleChange} className="input shadow-md"/>
                        
                        </div>

                    </div>

                    <div className="flex flex-col gap-1 lg:w-4/12">

                        {httpError && <FieldErrors fieldName="copiesAvailable" httpError={httpError} />}

                        <div className="flex gap-5 items-center whitespace-nowrap pl-1">

                            Copies Available :

                            <input type="number" name="copiesAvailable" value={newBook.copiesAvailable} onChange={handleChange} className="input shadow-md"/>
                        
                        </div>

                    </div>

                    <div className="flex flex-col gap-1 lg:w-5/12">

                        {httpError && <FieldErrors fieldName="img" httpError={httpError} />}
                        <input type="file" name="img" onChange={handleChange} className="input shadow-md text-base"/>
                    
                    </div>

                </div>

                <div className="flex max-lg:flex-col items-center gap-5 p-5 rounded-md border-2 border-teal-600 bg-white">

                    Select genres: 

                    <div className="grid grid-cols-4 max-lg:grid-cols-2 gap-5">

                        {genres.map(

                            genre => (

                                <label key={genre.id} className="border-2 border-teal-600 rounded-md p-2 bg-teal-50 flex gap-2 items-center">

                                    <input type="checkbox" onClick={() => handleGenreClick(genre.name)} />

                                    {genre.name}

                                </label>
                            )
                        )}

                    </div>

                </div>

            </form>

            <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800" onClick={handleSubmitBookClick}>Submit Book</button>

        </div>

    )

}