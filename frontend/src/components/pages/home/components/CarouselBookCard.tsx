import { BookModel } from "../../../../models/BookModel"

type BookCardProps = {
    book: BookModel
}

export const CarouselBookCard = ({ book }: BookCardProps) => {

    return (

        <div className="flex flex-col gap-5 items-center">

            <img src={book.img} alt="cover" width={200} height={320} />
            
            <div className="text-center">
                
                <p className="font-semibold text-lg">{book.title}</p>

                <p>{book.author}</p>
            
            </div>

            <button className="btn-main">
                See Details
            </button>

        </div>

    )

}