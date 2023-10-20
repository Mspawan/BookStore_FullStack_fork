import { Link } from "react-router-dom"
import { HistoryRecordModel } from "../../../../models/HistoryRecordModel"
import { BookGenres } from "../../../commons/book_genres/BookGenres"

type HistoryTabRecordCardProps = {
    record: HistoryRecordModel
}

export const HistoryTabRecordCard = ({ record }: HistoryTabRecordCardProps) => {

    const renderDate = (dateValue: Date) => {

        const date = new Date(dateValue);

        const longMonth = date.toLocaleDateString("en-us", { month: "long" });
        const dateDay = date.getDate();
        const dateYear = date.getFullYear();

        return longMonth + " " + dateDay + ", " + dateYear;
    }

    return (

        <div className="flex max-lg:flex-col lg:items-start max-lg:items-center lg:gap-4 gap-6 p-5 rounded-md shadow-custom-2">

            <img src={record.bookDTO.img} alt="cover" width={200} height={320} className="shadow-xl" />

            <div className="flex flex-col gap-10 max-lg:gap-5 xl:w-5/12 lg:flex-1">

                <div className="max-lg:text-center">
                
                    <p className="font-semibold lg:text-2xl max-lg:text-xl">{record.bookDTO.title}</p>
                    <p className="font-light lg:text-xl max-lg:text-lg">{record.bookDTO.author}</p>

                </div>

                <BookGenres genres={record.bookDTO.genres} />
            
            </div>

            <div className="flex-1 border-2 border-teal-800 rounded-md p-4 flex flex-col gap-3 items-center">

                <p className="text-xl font-semibold">History record info</p>

                <div className="h-[1px] w-full bg-teal-800" />

                <div className="flex gap-2 items-center text-lg text-center">

                    <p>Checked-out:</p>
                    
                    <p className="text-teal-600 font-semibold"> {renderDate(record.checkoutDate)}</p>

                </div>

                <div className="flex gap-2 items-center text-lg text-center">

                    <p>Returned:</p>
                    
                    <p className="text-teal-600 font-semibold"> {renderDate(record.returnDate)}</p>

                </div>

                <div className="h-[1px] w-full bg-teal-800" />

                <p className="text-center">Help others find their adventure by reviewing this book or find more exciting books in our collection.</p>

                <div className="flex max-xl:flex-col gap-5 items-center">

                    <Link to={`/book/${record.bookDTO.id}`} className="custom-btn-2 text-center">
                        Leave a review
                    </Link>
                    
                    <Link to={'/search'} className="custom-btn-2 text-center">
                        Search for more books
                    </Link>

                </div>

            </div>
            
        </div>

    )

}