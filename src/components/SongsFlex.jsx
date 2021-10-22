import React from 'react'
import Song from './Song';

const SongsFlex = ({items, SearchLyrics, fetchLyrics, nextPage, total}) => {
    return (
        <div className='w-full'>
            <div className='w-full flex flex-col items-center'>
                <div className='my-10 bg-gradient-to-r from-transparent via-black w-3/4 md:w-3/5 py-5 text-center text-white to-transparent'>
                    <h2 className='text-3xl'>total : {total}</h2>
                    <p>click on the card the see the lyrics</p>
                </div>
                {items.map(item=>(
                    <Song key={item.id} item={item} onClick={(artist,song)=>fetchLyrics(artist,song)} />
                ))}
            </div>
            <div className='w-full flex items-center justify-center my-10'>
                <button
                    className="btn-active border disabled:cursor-not-allowed border-black  px-3 py-1 text-xl rounded-2xl bg-transparent bg-black text-white transition-all transform hover:scale-110 duration-300"
                    onClick={()=>SearchLyrics(`http://cors-anywhere.herokuapp.com/${nextPage}`)}
                >
                    Next Page
                </button>
            </div>
        </div>
    )
}

export default SongsFlex
