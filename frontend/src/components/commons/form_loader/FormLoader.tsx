type FormLoaderProps = {
    isLoading: boolean
}

export const FormLoader = ({ isLoading }: FormLoaderProps) => {

    return (

        <div className="h-[1px] bg-teal-900 w-full flex items-center justify-center">

            {isLoading && <div className="w-5 h-5 rounded-full border-2 border-dashed border-teal-600 animate-rotate bg-teal-100"/>}

        </div>

    )

}