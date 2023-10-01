import { Link } from "react-router-dom"
import { Quote } from "../../commons/quote/Quote"
import { FieldErrors } from "../../commons/field_errors/FieldErrors"
import { useState } from "react";
import { LoginModel } from "../../../models/LoginModel";
import { useLogin } from "../../../utils/useLogin";

export const LoginPage = () => {

    const [personDetails, setPersonDetails] = useState<LoginModel>({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [token, setToken] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setPersonDetails({ ...personDetails, [event.target.name]: event.target.value });
    };

    const handleSignInClick = () => {

        useLogin(personDetails, setIsLoading, setHttpError, setToken);
    };

    return (

        <div className="mt-[70px] w-full max-container flex flex-col gap-20 items-center justify-center mb-20 px-5">

            <Quote quoteId={1} />
            
            <div className="custom-form">

                <p className="text-center text-3xl font-semibold">Sign In</p>

                <form className="flex flex-col gap-5 w-full">

                    <div className="flex flex-col gap-1">

                        {httpError && <FieldErrors fieldName="email" httpError={httpError} />}
                        <input type="text" name="email" onChange={handleChange} placeholder="E-mail" className="input shadow-md"/>

                    </div>

                    <div className="flex flex-col gap-1">

                        {httpError && <FieldErrors fieldName="password" httpError={httpError} />}
                        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="input shadow-md"/>

                    </div>

                </form>

                <div className="w-full flex justify-between">
                    
                    <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800" onClick={handleSignInClick}>Sign In</button>

                    <div className="flex gap-5 items-center">

                        Or create an account :

                        <Link to={"/register"} className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800">Register</Link>

                    </div>
                
                </div>

            </div>
            
        </div>

    )

}