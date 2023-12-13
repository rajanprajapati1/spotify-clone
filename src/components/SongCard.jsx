import React from 'react'
import { FaPlayCircle } from "react-icons/fa";
import { useSong } from '../utils/Context';
const SongCard = ({ value }) => {
    const { handleSong } = useSong();
    return (
        <div className='CARD'>
            <img src={value?.images.coverart} alt={value?.title} width={"200px"} />
                <div className="details">
                    <h1>{value?.title}</h1>
                    <p>{value?.share?.text.slice(0, 75)}
                    </p>
                </div>
            <div className="overlay">
                <FaPlayCircle color='springgreen' fontSize={"3rem"} onClick={()=>handleSong(value)} />
            </div>
        </div>
    )
}

export default SongCard
