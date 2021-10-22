import React from 'react'

const Input = ({term, setTerm, SearchLyrics}) => {
    return (
        <div className='backdrop-filter p-5 rounded-3xl backdrop-blur-lg shadow flex flex-col w-4/5 sm:w-3/5 lg:w-2/5 my-10 transition-all'>
            <label htmlFor="song" className='text-center text-xl md:text-3xl pb-8'>Search for your loved songs</label>
            <div className='flex flex-row items-center bg-black pr-2 rounded-2xl'>
                <input
                    type="text"
                    id='song'
                    value={term}
                    onChange={(e)=>setTerm(e.target.value)}
                    placeholder='Enter Song Name Here ...'
                    className="w-full h-10 rounded-2xl pl-5 text-xl outline-none bg-black text-white"
                />
                <span onClick={()=>setTerm('')} className='text-white px-3 text-2xl cursor-pointer'>&#9747;</span>
            </div>
            <button 
                onClick={()=>SearchLyrics(`https://api.lyrics.ovh/suggest/${term}`)} 
                disabled={term.length === 0 ? true : false}
                className="btn-active border disabled:cursor-not-allowed border-black w-2/4 md:w-2/5 mx-auto mt-10 px-3 py-1 text-xl rounded-2xl bg-transparent bg-black text-white transition-all transform hover:scale-110 duration-300"
            >
                Search
            </button>
        </div>
    )
}

export default Input
