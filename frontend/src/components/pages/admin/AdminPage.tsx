import { Quote } from "../../commons/quote/Quote"

export const AdminPage = () => {

    return (

        <section className="absolute top-[70px] w-full flex flex-col items-center gap-10">

            <Quote quoteId={5} />

            Admin Page

        </section>

    )
}