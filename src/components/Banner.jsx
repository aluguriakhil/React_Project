import React from 'react'

function Banner() {
    return (
        <div className='h-[50vh] md:h-[75vh] bg-cover bg-center flex items-end' style={{ backgroundImage: `url(https://images.hdqwalls.com/download/avengers-end-game-4k-banner-cb-1920x1080.jpg)` }}>
            <div className='text-white text-xl bg-red-900/60 text-center w-full p-4'>
                Avengers Endgame
            </div>
        </div>
    )
}

export default Banner
