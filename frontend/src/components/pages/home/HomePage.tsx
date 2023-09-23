import { Quote } from "../../commons/quote/Quote"
import { BeginJourneyHero } from "./components/BeginJourneyHero"
import { Carousel } from "./components/Carousel"
import { FavouriteGenresHero } from "./components/FavouriteGenresHero"
import { GrowingCollectionHero } from "./components/GrowingCollectionHero"

export const HomePage = () => {

    return (

        <div className="absolute top-[70px] w-full flex flex-col items-center justify-center gap-20 lg:px-10">

            <Quote quoteId={0} />

            <BeginJourneyHero />

            <Carousel />

            <div>

                <GrowingCollectionHero />
                
                <FavouriteGenresHero />          

            </div>

        </div>

    )

}