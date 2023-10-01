import { useState } from "react"
import { Quote } from "../../commons/quote/Quote"
import { RegistrationModel } from "../../../models/RegistrationModel";
import { useRegister } from "../../../utils/useRegister";
import { FieldErrors } from "../../commons/field_errors/FieldErrors";

export const RegistrationPage = () => {

    const [personDetails, setPersonDetails] = useState<RegistrationModel>({firstName: "", lastName: "", dateOfBirth: new Date("1800-01-01"), email: "", password: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState<string | null>(null);
    const [token, setToken] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setPersonDetails({ ...personDetails, [event.target.name]: event.target.value });
    };

    const handleRegisterClick = () => {

        useRegister(personDetails, setIsLoading, setHttpError, setToken);
    };

    return (

        <div className="mt-[70px] w-full max-container flex flex-col gap-20 items-center justify-center mb-20 px-5">

            <Quote quoteId={1} />
            
            <div className="custom-form">

                <p className="text-center text-3xl font-semibold">Register</p>

                <form className="flex flex-col gap-5 w-full">

                    <div className="flex flex-col gap-1">

                        {httpError && <FieldErrors fieldName="firstName" httpError={httpError} />}
                        <input type="text" name="firstName" onChange={handleChange} placeholder="First name" className="input shadow-md"/>
                    
                    </div>

                    <div className="flex flex-col gap-1">

                        {httpError && <FieldErrors fieldName="lastName" httpError={httpError} />}
                        <input type="text" name="lastName" onChange={handleChange} placeholder="Last name" className="input shadow-md"/>

                    </div>
                    
                    <div className="flex flex-col gap-1">

                        {httpError && <FieldErrors fieldName="dateOfBirth" httpError={httpError} />}

                        <div className="flex gap-5 items-center whitespace-nowrap pl-1">

                            Date of birth :

                            <input type="date" name="dateOfBirth" onChange={handleChange} className="input shadow-md"/>
                        
                        </div>

                    </div>

                    <div className="flex flex-col gap-1">

                        {httpError && <FieldErrors fieldName="email" httpError={httpError} />}
                        <input type="text" name="email" onChange={handleChange} placeholder="E-mail" className="input shadow-md"/>
                    
                    </div>

                    <div className="flex flex-col gap-1">

                        {httpError && <FieldErrors fieldName="password" httpError={httpError} />}
                        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="input shadow-md"/>
                    
                    </div>

                </form>
                    
                <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800" onClick={handleRegisterClick}>Register</button>

            </div>
            
        </div>

    )

}