import { useEffect } from "react";
import { GenreModel } from "../models/GenreModel";

export const useFetchAllGenres = (setAllGenres: React.Dispatch<React.SetStateAction<GenreModel[]>>,
                                  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                  setHttpError: React.Dispatch<React.SetStateAction<string | null>>) => {

    useEffect(

        () => {

            const fetchGenres = async () => {
                
                const url = "http://localhost:8080/api/genres";

                const response = await fetch(url);

                const responseJson = await response.json();

                if (!response.ok) {
                    throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
                }

                const loadedGenres: GenreModel[] = [];

                for (const key in responseJson) {

                    loadedGenres.push(responseJson[key]);
                }

                setAllGenres(loadedGenres);
                setIsLoading(false);
            }

            fetchGenres().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, []

    );

}