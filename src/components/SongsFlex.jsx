import React from 'react'
import Song from './Song';

const SongsFlex = ({items, SearchLyrics, fetchLyrics, nextPage, total}) => {
    return (
        <div className='w-full'>
            <div className='w-full flex flex-col items-center'>
                <h2 className='my-10 text-3xl bg-gradient-to-r from-transparent via-black w-3/4 md:w-2/5 py-5 text-center text-white to-transparent'>total : {total}</h2>
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
