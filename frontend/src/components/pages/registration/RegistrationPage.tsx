import { useState } from "react"
import { Quote } from "../../commons/quote/Quote"
import { RegistrationModel } from "../../../models/RegistrationModel";
import { useRegister } from "../../../utils/useRegister";

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


    // -----------------------------------------------------------

    const extractFieldErrors = (fieldName: string) => {

        const regex = `(?:${fieldName}:\\s([\\w\\s-]*))`;

        const fieldErrorsIterator = httpError?.matchAll(RegExp(regex, "gi"));

        const fieldErrors = [];

        if (fieldErrorsIterator) {

            for (const validationError of fieldErrorsIterator) fieldErrors.push(validationError[0]);
        }

        return (

            <>

                {fieldErrors.map(

                    error => (

                        <div key={error} className="border border-red-500 p-2 bg-red-100 rounded-md">

                            {error.replace(RegExp(`${fieldName}: `), "")}

                        </div>

                    )

                )}

            </>

        )

    };

    
    extractFieldErrors("firstName");
    

    // -----------------------------------------------------------













    return (

        <div className="mt-[70px] w-full max-container flex flex-col gap-20 items-center justify-center mb-20 px-5">

            <Quote quoteId={1} />
            
            <div className="border border-teal-900 rounded-md bg-teal-50 w-full max-w-lg py-10 px-10 shadow-xl flex flex-col items-center gap-10">

                <p className="text-center text-3xl font-semibold">Register</p>

                <form className="flex flex-col gap-5 w-full">

                    <div className="flex flex-col gap-1">

                        {httpError && extractFieldErrors("firstName")}
                        <input type="text" name="firstName" onChange={handleChange} placeholder="First name" className="input shadow-md"/>
                    
                    </div>

                    <div className="flex flex-col gap-1">

                        {httpError && extractFieldErrors("lastName")}
                        <input type="text" name="lastName" onChange={handleChange} placeholder="Last name" className="input shadow-md"/>

                    </div>
                    
                    <div className="flex flex-col gap-1">

                        {httpError && extractFieldErrors("dateOfBirth")}

                        <div className="flex gap-5 items-center whitespace-nowrap pl-1">

                            Date of birth :

                            <input type="date" name="dateOfBirth" onChange={handleChange} className="input shadow-md"/>
                        
                        </div>

                    </div>

                    <div className="flex flex-col gap-1">

                        {httpError && extractFieldErrors("email")}
                        <input type="text" name="email" onChange={handleChange} placeholder="E-mail" className="input shadow-md"/>
                    
                    </div>

                    <div className="flex flex-col gap-1">

                        {httpError && extractFieldErrors("password")}
                        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="input shadow-md"/>
                    
                    </div>

                </form>
                    
                <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800" onClick={handleRegisterClick}>Register</button>

            </div>
            
        </div>

    )

}