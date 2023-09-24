import { Link } from "react-router-dom"

export const BookStoreServices = () => {

    return (

        <div className="relative bg-home-hero-4 bg-cover max-lg:bg-right w-full max-container mb-20">
            
            <div className=" bg-white bg-opacity-60 w-full flex items-center justify-end p-5">

                <div className="flex flex-col items-center lg:gap-16 gap-10 lg:w-1/2 text-center">

                    <p className="text-5xl max-lg:text-3xl font-semibold leading-snug w-4/6">
                        Missing something?
                    </p>

                    <div className="text-xl max-lg:text-lg font-light w-4/6">

                        We strive to make our stock a good fit for everyone. 
                        If you have trouble finding something, feel free to 
                        contact us by sending our administration a personal message!

                    </div>

                    <Link to={"/discussions"} type="button" className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800">
                        Open discussion
                    </Link>

                </div>

            </div>

        </div>

    )

}