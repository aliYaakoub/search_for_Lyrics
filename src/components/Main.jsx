import React, { useState } from 'react'
import axios from 'axios'
import Loading from './Loading';
import Input from './Input';
import SongsFlex from './SongsFlex';

const Main = () => {

    const [items, setItems] = useState([]);
    const [term, setTerm] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [total, setTotal] = useState(0);
    const [nextPage, setNextPage] = useState('');
    const [loading, setLoading] = useState(true);

    function SearchLyrics(url){
        const fetch = async () =>{
            const results = await axios(url);
            setLyrics('');
            setItems(results.data.data);
            setNextPage(results.data.next);
            setTotal(results.data.total);
            setLoading(false);
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
            <Input term={term} setTerm={(value)=>setTerm(value)} SearchLyrics={(url)=>SearchLyrics(url)} />
            {lyrics.length ===0 ? 
                items.length === 0 ? '' 
                :
                <div>
                    {loading ?
                        <Loading />
                        :
                        <SongsFlex 
                            items={items} 
                            total={total}
                            nextPage={nextPage}
                            SearchLyrics={(url)=>SearchLyrics(url)} 
                            fetchLyrics={(artist, song)=>fetchLyrics(artist, song)} 
                        />
                    }
                </div>
            :
                <div className="py-10 px-5">
                    <div className="shadow text-center  md:text-xl backdrop-filter backdrop-blur-3xl rounded-2xl p-10">
                        {lyrics.map((phrase,index)=>(
                            <p key={index}>{phrase}</p>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Main
