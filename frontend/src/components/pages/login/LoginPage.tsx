import { Link } from "react-router-dom"
import { Quote } from "../../commons/quote/Quote"

export const LoginPage = () => {

    return (

        <div className="mt-[70px] w-full max-container flex flex-col gap-20 items-center justify-center mb-20 px-5">

            <Quote quoteId={1} />
            
            <div className="border border-teal-900 rounded-md bg-teal-50 w-full max-w-lg py-10 px-10 shadow-xl flex flex-col items-center gap-10">

                <p className="text-center text-3xl font-semibold">Sign In</p>

                <div className="flex flex-col gap-5 w-full">
                    
                    <input type="text" placeholder="E-mail" className="input shadow-md"/>

                    <input type="password" placeholder="Password" className="input shadow-md"/>

                </div>

                <div className="w-full flex justify-between">
                    
                    <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800">Sign In</button>

                    <div className="flex gap-5 items-center">

                        Or create an account :

                        <Link to={"/register"} className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800">Register</Link>

                    </div>
                
                </div>

            </div>
            
        </div>

    )

}