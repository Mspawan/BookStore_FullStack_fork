import { Quote } from "../../commons/quote/Quote"
import { BeginJourneyHero } from "./components/BeginJourneyHero"

export const HomePage = () => {

    return (

        <section className="border-red-500 absolute top-[70px] w-full flex flex-col items-center gap-10 lg:px-10">

            <Quote quoteId={0} />

            <BeginJourneyHero />
        
            Home Page

        </section>

    )

}