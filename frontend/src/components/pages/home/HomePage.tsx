import { Quote } from "../../commons/quote/Quote"
import { BeginJourneyHero } from "./components/BeginJourneyHero"
import { Carousel } from "./components/Carousel"

export const HomePage = () => {

    return (

        <section className="absolute top-[70px] w-full flex flex-col items-center justify-center gap-10 lg:px-10">

            <Quote quoteId={0} />

            <BeginJourneyHero />

            <Carousel />
        
            Home Page

        </section>

    )

}