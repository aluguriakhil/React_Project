import "./App.css";
import Navbar from "./components/Navbar"
import Movies from "./components/Movies"
import WatchList from "./components/WatchList"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Banner from "./components/Banner";
import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddtoWatchList = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem('moviesApp',JSON.stringify(newWatchList));
    setWatchList(newWatchList);
    console.log(newWatchList);
  }

  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    setWatchList(filteredWatchlist);
    localStorage.setItem('moviesApp',JSON.stringify(filteredWatchlist));
    console.log(filteredWatchlist);
  };


  useEffect(()=>{
    let moviesFromLocalStorage=localStorage.getItem('moviesApp');
    if(!moviesFromLocalStorage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage));
  },[]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <Movies
                handleAddtoWatchList={handleAddtoWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                watchlist={watchlist} />
            </>
          } />

          <Route path="/watchlist" element={<WatchList watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
