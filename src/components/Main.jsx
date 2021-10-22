import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Song from './Song';

const Main = () => {

    const [items, setItems] = useState([]);
    const [term, setTerm] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [total, setTotal] = useState(0);
    const [nextPage, setNextPage] = useState('');

    function SearchLyrics(url){
        const fetch = async () =>{
            const results = await axios(url);
            setLyrics('');
            setItems(results.data.data);
            setNextPage(results.data.next);
            setTotal(results.data.total);
            console.log(results.data.data);
            console.log(results.data);
        }
        fetch();
    }

    function fetchLyrics (artist, song){
        const fetch = async () =>{
            const results = await axios(`https://api.lyrics.ovh/v1/${artist}/${song}`);
            console.log(results.data.lyrics);
            setLyrics(results.data.lyrics.split('\n'));
        }
        fetch();
    }

    return (
        <div className={items.length === 0 ? ` flex min-h-screen items-center justify-center flex-col` : ` flex h-screen justify-start items-center flex-col`}>
            <div className='backdrop-filter p-5 rounded-3xl backdrop-blur-lg shadow flex flex-col w-4/5 sm:w-3/5 lg:w-2/5 my-10 transition-all'>
                <label htmlFor="song" className='text-center text-xl md:text-3xl pb-8'>Search for your loved songs</label>
                <div className='flex flex-row items-center bg-black pr-3 rounded-2xl'>
                    <input
                        type="text"
                        id='song'
                        value={term}
                        onChange={(e)=>setTerm(e.target.value)}
                        placeholder='Enter Song Name Here ...'
                        className="focus:bg-black border border-black w-full h-10 rounded-2xl pl-5 text-xl outline-none bg-black text-white"
                    />
                    <span onClick={()=>setTerm('')} className='text-white text-2xl cursor-pointer'>&#9747;</span>
                </div>
                <button 
                    onClick={()=>SearchLyrics(`https://api.lyrics.ovh/suggest/${term}`)} 
                    disabled={term.length === 0 ? true : false}
                    className="btn-active border disabled:cursor-not-allowed border-black w-2/4 md:w-2/5 mx-auto mt-10 px-3 py-1 text-xl rounded-2xl bg-transparent bg-black text-white transition-all transform hover:scale-110 duration-300"
                >
                    Search
                </button>
            </div>
            {lyrics.length ===0 ? 
                items.length === 0 ? '' 
                :
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
            :
                <div className="py-10 px-5">
                    <div className="shadow text-center  md:text-xl backdrop-filter backdrop-blur-3xl rounded-2xl p-10">
                        {lyrics.map(phrase=>(
                            <p>{phrase}</p>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Main
