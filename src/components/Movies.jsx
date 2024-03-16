import React, { useEffect } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import { useState } from 'react'
import Pagination from './Pagination'


const Movies = ({ handleAddtoWatchList,
    handleRemoveFromWatchList,
    watchlist }) => {

    const [movies, setMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);

    const handlePrev = () => {
        if (pageNo === 1) {
            setPageNo(pageNo);
        } else {
            setPageNo(pageNo - 1)
        }

    }

    const handleNext = () => {
        setPageNo(pageNo + 1)
    }

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b590163eb01e76da9415d7963b3569e7&language=en-US&page=${pageNo}`).then(function (res) {
            setMovies(res.data.results)
        })
    }, [pageNo])
    return (
        <div>
            <div className='text-xl font-bold text-center m-3'>Trending Movies</div>
            <div className='flex flex-row flex-wrap justify-around'>
                {
                    movies.map((movieObj => {
                        return <MovieCard
                            key={movieObj.id}
                            movieObj={movieObj}
                            poster_path={movieObj.poster_path}
                            name={movieObj.original_title}
                            handleAddtoWatchList={handleAddtoWatchList}
                            handleRemoveFromWatchList={handleRemoveFromWatchList}
                            watchlist={watchlist} />
                    }))
                }

            </div>
            <div>
                <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
            </div>
        </div>
    )
}

export default Movies

//https://api.themoviedb.org/3/movie/popular?api_key=b590163eb01e76da9415d7963b3569e7&language=en-US&page=2