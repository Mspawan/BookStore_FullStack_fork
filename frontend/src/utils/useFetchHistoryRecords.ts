import { useEffect } from "react";
import { HistoryRecordModel } from "../models/HistoryRecordModel";

export const useFetchHistoryRecords = (authentication: { isAuthenticated: boolean; token: string; },
                                       setHistoryRecords: React.Dispatch<React.SetStateAction<HistoryRecordModel[]>>,
                                       setTotalAmountOfRecords: React.Dispatch<React.SetStateAction<number>>,
                                       setTotlalPages: React.Dispatch<React.SetStateAction<number>>,
                                       setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
                                       setHttpError: React.Dispatch<React.SetStateAction<string | null>>,
                                       urlPaginationParams: string,
                                       currentPage: number) => {

    useEffect(

        () => {

            const fetchUserCurrentCheckouts = async () => {

                setIsLoading(true);

                if (authentication.isAuthenticated) {

                    const url = "http://localhost:8080/api/history-records/secure" + urlPaginationParams;

                    const requestOptions = {

                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${authentication.token}`,
                            "Content-type": "application/json"
                        }
                    };

                    const response = await fetch(url, requestOptions);

                    const responseJson = await response.json();

                    if (!response.ok) {
                        throw new Error(responseJson.message ? responseJson.message : "Oops, something went wrong!");
                    }

                    setTotalAmountOfRecords(responseJson.totalElements);
                    setTotlalPages(responseJson.totalPages);

                    const responseRecordsContentArray = responseJson.content;

                    const loadedHistoryRecords: HistoryRecordModel[] = [];

                    for (const key in responseRecordsContentArray) {

                        loadedHistoryRecords.push(responseRecordsContentArray[key]);
                    }

                    setHistoryRecords(loadedHistoryRecords);
                    setIsLoading(false);
                };

                setIsLoading(false);
            };

            fetchUserCurrentCheckouts().catch(

                (error: any) => {

                    setIsLoading(false);
                    setHttpError(error.message);
                }
            )

        }, [currentPage]

    );

}