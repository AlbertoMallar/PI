import React from "react";

const Pagination = ({ gamesPerPage, totalGames, paginated }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }



    return (
        <div className="paginationContainer">
            <ul>
                {pageNumbers.length ? pageNumbers.map(number => (
                    <button key={number}>
                        <a 
                        onClick={(e) => {
                            e.preventDefault()
                            paginated(number)}}
                            href="#"
                        >
                            {number}
                        </a>
                    </button>
                )) : undefined}
            </ul>

        </div>
    )
}

export default Pagination