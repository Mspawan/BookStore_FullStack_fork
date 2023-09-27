import { useState } from "react"
import { Quote } from "../../commons/quote/Quote"
import { RegistrationModel } from "../../../models/RegistrationModel";

export const RegistrationPage = () => {

    const [personDetails, setPersonDetails] = useState<RegistrationModel>({firstName: "", lastName: "", dateOfBirth: new Date("1800-01-01"), email: "", password: ""});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setPersonDetails({ ...personDetails, [event.target.name]: event.target.value });
    };

    console.log(personDetails);

    return (

        <div className="mt-[70px] w-full max-container flex flex-col gap-20 items-center justify-center mb-20 px-5">

            <Quote quoteId={1} />
            
            <div className="border border-teal-900 rounded-md bg-teal-50 w-full max-w-lg py-10 px-10 shadow-xl flex flex-col items-center gap-10">

                <p className="text-center text-3xl font-semibold">Register</p>

                <form className="flex flex-col gap-5 w-full">
                    
                    <input type="text" name="firstName" onChange={handleChange} placeholder="First name" className="input shadow-md"/>

                    <input type="password"  name="lastName" onChange={handleChange} placeholder="Last name" className="input shadow-md"/>

                    <div className="flex gap-5 items-center whitespace-nowrap pl-1">

                        Date of birth :

                        <input type="date"  name="dateOfBirth" onChange={handleChange} className="input shadow-md"/>
                    
                    </div>

                    <input type="text"      name="email" onChange={handleChange} placeholder="E-mail" className="input shadow-md"/>

                    <input type="password"  name="password" onChange={handleChange} placeholder="Password" className="input shadow-md"/>

                </form>
                    
                <button className="btn-main bg-teal-800 text-teal-100 hover:text-teal-800">Register</button>

            </div>
            
        </div>

    )

}