import { quotes } from "../../../constants/constants";

type QuoteProps = {
    quoteId: number;
}

export const Quote = ({quoteId}: QuoteProps) => {

  return (

    <div className="text-teal-800 flex flex-col items-center gap-5 mt-5 w-full">

        <div className="flex gap-5 max-lg:hidden">
            
            <div className="[clip-path:polygon(97%_0,100%_50%,97%_100%,0%_50%)] w-[450px] h-[6px] bg-teal-500" />
            <div className="[clip-path:polygon(50%_0,100%_50%,50%_100%,0%_50%)] w-[10px] h-[8px] bg-teal-500" />
            <div className="[clip-path:polygon(3%_0,100%_50%,3%_100%,0%_50%)] w-[450px] h-[6px] bg-teal-500" />

        </div>

        <div className="text-center px-5">

            <p className="italic">"{quotes[quoteId].text}"</p>
            <p>- {quotes[quoteId].author}</p>

        </div>
        
    </div>

  )

}