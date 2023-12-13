import React, { useEffect, useState } from 'react'
import { BsRepeat, BsRepeat1, BsPlayBtnFill } from "react-icons/bs";
import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from "react-icons/tb";
import { IoPlayCircle, IoPauseCircle } from "react-icons/io5";
import { FaVolumeOff, FaSlideshare, FaRegHeart } from "react-icons/fa6";
import { CgMiniPlayer } from "react-icons/cg";
import { PiMicrophoneStage, PiShuffleBold } from "react-icons/pi";
import { HiQueueList } from "react-icons/hi2";
import { useSong } from '../utils/Context';
const Player = () => {
    const { currentSong ,songDetails } = useSong();
    useEffect(()=>{

    },[])
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState("00:00");
    const [currDuration,setcurrDuration] = useState("00:00");
    const audioRef = React.createRef();
    const playPauseHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100);
        setProgress(animation);
        const currentMinutes = Math.floor(current / 60);
        const currentSeconds = Math.floor(current % 60);
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
    
        const currentTime = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        const totalDuration = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    
        setDuration(currentTime);
        setcurrDuration(totalDuration)
    };

    const dragHandler = (e) => {
        const draggedTime = (e.target.value * audioRef.current.duration) / 100;
        audioRef.current.currentTime = draggedTime;
        setProgress(e.target.value);
    };
    return (
        <div className='player'>
            <div className="main_player">
                <div className="first">
                    <img src={songDetails?.images.background || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4AOGhxWLDTFwqJanZwC8r-AG5Fs1fNlsqg&usqp=CAU"} alt="banner" />
                    <div className="box">
                        <h2>{songDetails?.title.slice(0,12)+".."}</h2>
                        <small>{songDetails?.artists[0].alias}</small>
                    </div>
                    <FaRegHeart className='like' size={'15px'} />
                </div>
                <div className="seconds">
                    <div className="player_btn">
                        <PiShuffleBold className='pb' size={"25px"} />
                        <TbPlayerSkipBackFilled className='pb' size={"25px"} />
                        {isPlaying ? (
                            <IoPauseCircle
                                className='pb'
                                size={"40px"}
                                onClick={playPauseHandler}
                            />
                        ) : (
                            <IoPlayCircle
                                className='pb'
                                size={"40px"}
                                onClick={playPauseHandler}
                            />
                        )}
                        <TbPlayerSkipForwardFilled className='pb' size={"25px"} />
                        <BsRepeat className='pb' size={"25px"} />
                    </div>
                    <div className="progress">
                        <span>{duration}</span>
                        <input type="range"
                            value={progress}
                            onChange={dragHandler}
                            max={"100"}
                            min={"0"}

                        />
                        <audio
                            src={currentSong}
                            ref={audioRef}
                            onTimeUpdate={timeUpdateHandler}
                            onLoadedMetadata={timeUpdateHandler}
                        />
                        <span>{currDuration}</span>
                    </div>
                </div>
                <div className="third">
                    <BsPlayBtnFill size={"18px"} />
                    <PiMicrophoneStage size={"18px"} />
                    <HiQueueList size={"18px"} />
                    <FaSlideshare size={"18px"} />
                    <div className="volume">
                        <FaVolumeOff size={"18px"} />
                        <input type="range" name="" id="" />
                        <CgMiniPlayer size={"18px"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player
