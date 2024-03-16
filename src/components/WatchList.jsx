import React, { useEffect } from 'react'
import { useState } from 'react';
import genreids from '../utility/Genre'


const WatchList = ({ watchlist, setWatchList,handleRemoveFromWatchList }) => {
  const [search, setSearch] = useState('');
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState('All Genres');

  let handleSearch = (e) => {
    setSearch(e.target.value);
  }

  let handleFilter = (genre) => {
    setCurrGenre(genre)
  }
  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average
    })
    setWatchList([...sortedIncreasing]);
  }

  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average
    })
    setWatchList([...sortedDecreasing]);
  }

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    })
    temp = new Set(temp);
    setGenreList(['All Genres', ...temp]);
    console.log(temp);
  }, [watchlist])


  return (
    <>
      <div className='flex justify-center flex-wrap m-4'>
        {
          genreList.map((genre) => {
            return <div onClick={() => handleFilter(genre)}
              className={
                currGenre == genre ? 'flex justify-center items-center bg-blue-400  h-[3rem] w-[9rem] rounded-xl text-white font-bold mx-4 my-2' : 'flex justify-center items-center bg-gray-400  h-[3rem] w-[9rem] rounded-xl text-white font-bold mx-4 my-2'
              }>{genre}</div>
          })
        }
      </div>

      <div className='flex justify-center my-4'>
        <input onChange={handleSearch} value={search} type="text" className='h-[3rem] w-[18rem] bg-gray-200 outline-none px-4' placeholder='Search Movies' />
      </div>

      <div className='overflow-hidden rounded-lg border border-gray-200 m-8'>
        <table className='w-full text-gray-500 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <div className='flex justify-center'>
                <div onClick={sortIncreasing} className='p-2 hover:cursor-pointer'><i class="fa-solid fa-arrow-up"></i></div>
                <div className='p-2'>Ratings</div>
                <div onClick={sortDecreasing} className='p-2 hover:cursor-pointer'><i class="fa-solid fa-arrow-down"></i></div>
              </div>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>

            {
              watchlist.filter((movieObj) => {
                if (currGenre == 'All Genres') {
                  return true;
                }
                else {
                  return genreids[movieObj.genre_ids[0]]==currGenre;
                }
              }).
                filter((movieObj) => {
                  return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
                }).map((movieObj) => {
                  return (
                    <tr className='border-b-2'>
                      <td className='flex items-center px-6'>
                        <img src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} className='w-[7rem] h-[10rem]' />
                        <div className='mx-10'>{movieObj.title}</div>
                      </td>
                      <td>{movieObj.vote_average}</td>
                      <td>{movieObj.popularity}</td>
                      <td>{genreids[movieObj.genre_ids[0]]}</td>
                      <td className='text-red-600 font-bold hover:cursor-pointer' onClick={()=>handleRemoveFromWatchList(movieObj)}>Delete</td>
                    </tr>

                  )
                })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default WatchList
