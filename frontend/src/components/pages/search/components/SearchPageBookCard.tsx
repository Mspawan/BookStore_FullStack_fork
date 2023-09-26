import { BookModel } from "../../../../models/BookModel"

type BookCardProps = {
    book: BookModel
}

export const SearchPageBookCard = ({ book }: BookCardProps) => {

    return (

        <div className="flex max-lg:flex-col items-start max-lg:items-center gap-10 p-10 rounded-lg w-full shadow-custom relative" key={book.id}>

            <img src={book.img} alt="cover" width={250} height={400} className="shadow-xl max-lg:w-[200px]"/>
            
            <div className="flex flex-col gap-10 lg:w-1/2">

                <div className="max-lg:text-center">
                
                    <p className="font-semibold lg:text-3xl max-lg:text-2xl">{book.title}</p>
                    <p className="font-light lg:text-2xl max-lg:text-xl">{book.author}</p>

                </div>
                
                <div className="flex gap-5 max-lg:justify-center">

                    {book.genres.map(

                        (genre) => <div key={genre.description} className="bg-teal-100 py-2 px-4 rounded-md">{genre.description}</div>

                    )}

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

            <button className="btn-main max-lg:static absolute bottom-10 right-10">
                See Details
            </button>

        </div>

    )

}