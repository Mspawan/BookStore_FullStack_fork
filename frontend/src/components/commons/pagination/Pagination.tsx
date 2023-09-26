type PaginationProps = {
    currentPage: number,
    totalPages: number,
    totalAmountOfBooks: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    setResultRange: React.Dispatch<React.SetStateAction<{ start: number; end: number; }>>
}

export const Pagination = ({ currentPage, totalPages, totalAmountOfBooks, setCurrentPage, setResultRange }: PaginationProps) => {

    const pageNumbers = [];

    if (totalPages <= 5) {

        for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

    } else {

        if (currentPage < 3) {

            for (let i = 1; i <= 5; i++) pageNumbers.push(i);
        }

        if (currentPage >= 3 && currentPage + 2 <= totalPages) {

            for (let i = currentPage - 2; i <= currentPage + 2; i++) pageNumbers.push(i);
        }

        if (currentPage > totalPages - 2) {

            for (let i = totalPages - 4; i <= totalPages; i++) pageNumbers.push(i);
        }

    }
    
    const handleFirstClick = () => {

        if (currentPage !== 1) {

            setResultRange({ start: 1, end: 5 });
            setCurrentPage(1);
        }
    }
    
    const handlePageButtonClick = (p: number) => {

        if (p === 1) handleFirstClick();
        else if (p === totalPages) handleLastClick();
        else {
            setResultRange({ start: ((p - 1) * 5) + 1, end: (p * 5) });
            setCurrentPage(p);
        }
    };

    const handleLastClick = () => {

        if (currentPage !== totalPages) {

            setResultRange({ start: totalAmountOfBooks - (totalAmountOfBooks - ((totalPages * 5 - 4))), end: totalAmountOfBooks });
            setCurrentPage(totalPages);
        }
    }

    return (

        <div className="flex gap-5 border border-red-500 p-5">
            
            <button className="btn-main" onClick={handleFirstClick}>First</button>

            {pageNumbers.map(p =>

                <button className={`${currentPage === p && "bg-teal-700 hover:bg-teal-700 text-teal-100 text-xl font-bold"} + btn-main`} 
                    onClick={() => handlePageButtonClick(p)} key={p}
                >
                    {p}
                </button>

            )}

            <button className="btn-main" onClick={handleLastClick}>Last</button>

        </div>

    )

}