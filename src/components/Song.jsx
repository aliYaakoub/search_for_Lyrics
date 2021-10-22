import React from 'react'

const Song = ({item, onClick}) => {

    function getImage () {
        if(window.innerWidth <= 550){
            return item.album.cover;
        }
        return item.album.cover_medium;
    }

    function calculateDuration(duration){
        const hours = Math.floor(duration/60);
        const minutes = duration % 60;
        return hours<10 ? '0' + hours + ' : '+ minutes : hours + ' : ' + minutes;
    }

    return (
        <div className='song-card relative shadow-2xl overflow-hidden flex flex-row my-5 cursor-pointer' onClick={()=>onClick(item.artist.name, item.title)}>
            <img src={getImage()} alt="" />
            <div className='pl-2 md:pl-5 py-5 flex flex-col justify-around'>
                <h1 className='sm:text-xl lg:text-2xl'>Song : {item.title}</h1>
                <h1 className='sm:text-xl lg:text-2xl'>Artist : {item.artist.name}</h1>
                {item.album.title==null? '' : <h1 className='sm:text-xl lg:text-2xl'>Album Name : {item.album.title}</h1>}
                <p>duration : {calculateDuration(item.duration)}</p>
                <a href={item.link} target='_blank' rel='noreferrer' className='underline text-xl'>Listen now </a>
            </div>
        </div>
    )
}

export default Song
