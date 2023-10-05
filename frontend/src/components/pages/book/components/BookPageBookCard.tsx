import { BookModel } from "../../../../models/BookModel"
import { ReviewStars } from "../../../commons/review_stars/ReviewStars"
import { CheckoutBox } from "./CheckoutBox"

type BookCardProps = {
    book: BookModel | null,
    totalStars: number
}

export const BookPageBookCard = ({ book, totalStars }: BookCardProps) => {

    if (book === null) return <div>Something went wrong - cannot read the book data</div>

    return (

        <div className="flex max-lg:flex-col items-start max-lg:items-center gap-10 p-10 rounded-lg w-full shadow-custom-2 relative" key={book.id}>

            <img src={book.img} alt="cover" width={250} height={400} className="shadow-xl "/>
            
            <div className="flex flex-col gap-10 xl:w-5/12 lg:flex-1">

                <div className="max-lg:text-center">
                
                    <p className="font-semibold lg:text-3xl max-lg:text-2xl">{book.title}</p>
                    <p className="font-light lg:text-2xl max-lg:text-xl">{book.author}</p>

                </div>
                
                <div className="flex gap-5 max-lg:justify-center">

                    {book.genres.map(

                        (genre) => <div key={genre.description} className="bg-teal-100 py-2 px-4 rounded-md">{genre.description}</div>

                    )}

                </div>

                <div className="flex max-lg:justify-center">
                    <ReviewStars ratingProp={totalStars} size={25} />
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

            <div className="flex-1">
            
                <CheckoutBox bookId={`${book.id}`} copies={book.copies} copiesAvailable={book.copiesAvailable} />

            </div>

        </div>

    )

}