import React from 'react'

const MovieCard = ({ poster_path,
  name,
  handleAddtoWatchList,
  movieObj,
  handleRemoveFromWatchList,
  watchlist }) => {

  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id === movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <div className='h-[40vh] w-[180px] bg-center bg-cover rounded-xl hover:cursor-pointer hover:scale-110 duration-75 m-2' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})` }}>

        <div className='text-white w-full p-2 text-center bg-red-800/60 rounded-xl'>
          {name}
        </div>

        {
          doesContain(movieObj) ? (
            <div onClick={() => handleRemoveFromWatchList(movieObj)} className='h-8 w-8 items-center rounded-lg bg-white flex justify-center mt-10'>&#10060;</div>
          ) : (
            <div onClick={() => (handleAddtoWatchList(movieObj))} className='h-8 w-8 items-center rounded-lg bg-white flex justify-center mt-10' >
              &#128151;
            </div>
          )
        }
      </div>

    </>
  )
}

export default MovieCard
