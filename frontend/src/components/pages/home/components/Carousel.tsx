import { useState } from "react"
import { BookModel } from "../../../../models/BookModel";
import { LoadingSpinner } from "../../../commons/loading_spinner/LoadingSpinner";
import { useFetchBooks } from "../../../../utils/useFetchBooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
// import 'swiper/css/effect-coverflow';
import { EffectCoverflow, A11y } from 'swiper/modules';

export const Carousel = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState<string | null>(null);

    useFetchBooks(setBooks, setIsLoading, setHttpError);

    console.log(books);

    if (isLoading) { return <LoadingSpinner /> }

    if (httpError) { return <div className="container m-5">{httpError}</div> }

    return (

        <div className="flex flex-col items-center gap-20 max-container w-full border border-green-500">
            
            Carousel

                <Swiper modules={[Navigation, A11y, EffectCoverflow]}
                    effect={'coverflow'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 1.5,
                        slideShadows: false,
                    }} 
                    loop={true} 
                    navigation={true} 
                    slidesPerView={3} 
                    spaceBetween={50} 
                    className="w-full max-w-[1000px]"
                >

                    {books.map((book) => (

                        <SwiperSlide className="flex items-center justify-center border border-red-500" key={book.id}>
                            
                            <div className="border border-black h-[100px] w-[100px]">

                                <p>{book.title}</p>

                            </div>

                        </SwiperSlide>

                    ))}

                </Swiper>
            
        </div>

    )

}