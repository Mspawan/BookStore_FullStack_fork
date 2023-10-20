import { GenreModel } from "../../../models/GenreModel"

type BookGenresProps ={
    genres: GenreModel[]
}

export const BookGenres = ({ genres }: BookGenresProps) => {

    return (

        <div className="flex gap-3 max-lg:justify-center">

            {genres.map(

                (genre) => <div key={genre.description} className="bg-teal-100 py-1 px-3 rounded-md">{genre.description}</div>

            )}

        </div>

    )

}