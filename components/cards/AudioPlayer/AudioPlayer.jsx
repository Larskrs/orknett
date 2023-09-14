import { useEffect, useRef, useState } from "react";
import jsmediatags from "jsmediatags";
import Image from "next/image";
import Badge from "../badge/badge";
import styles from "./AudioPlayer.module.css"
export default function AudioPlayer ({src, cover, alt, title, autoPlay=true, onCompleted=() => {}}) {

    const [data, setData] = useState()
    const [volume, setVolume] = useState()
    const [time, setTime] = useState()
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [currentTime, setCurrentTime] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
    const [currentTimeSec, setCurrentTimeSec] = useState(); //current time of the video in seconds
    const [duration, setDuration] = useState([0, 0]); // // total duration of the video in the array. The first value represents the minute and the second represents seconds.
    const [durationSec, setDurationSec] = useState(); // // current duration of the 
    
    useEffect(() => {
        LoadMetaData()
    })

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/v1/files/audio/data?fileId=${src.split("fileId=").pop()}`);
            const data = await res.json()
            console.log(data)
            setData(data.tags)
        }

        fetchData()
    }, []);

    useEffect(() => {
        const { min, sec } = sec2Min(audioRef.current.duration);
        setDurationSec(audioRef.current.duration);
        setDuration([min, sec]);
    
        console.log(audioRef.current.duration);
      }, [audioRef]);

    const handlePlay = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    const sec2Min = (sec) => {
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);
        return {
          min: min,
          sec: secRemain,
        };
      };

    useEffect(() => {
        const { min, sec } = sec2Min(audioRef.current.duration);
        setDurationSec(audioRef.current.duration);
        setDuration([min, sec]);
    
        // console.log(audioRef.current.duration);
        const interval = setInterval(() => {
          const { min, sec } = sec2Min(audioRef.current.currentTime);
          setCurrentTimeSec(audioRef.current.currentTime);
          setCurrentTime([min, sec]);
        }, 1000);
        return () => clearInterval(interval);
      }, [isPlaying]);

    //   console.log(currentTimeSec)

    return (
        <>
            <div className={styles.wrap}>
                <Image src={cover} width={100} height={100} style={{objectFit: "contain"}} alt={alt} onClick={() => {
                    handlePlay()
                }} />
                <div className={styles.column}>
                    <div className={styles.details}>
                        {data && <p className={styles.title}>{data.title}</p>}
                        {data && <p className={styles.artist}>{data.artist}</p>}
                        {data && <p className={styles.artist}>Track Id: {data.track}</p>}
                    </div>
                    <div className={styles.duration}>
                        <p>{currentTime[0]}:{currentTime[1]}</p>
                        <p>{duration[0]}:{duration[1]}</p>
                    </div>
                    <div className={styles.controls}>
                        <input type="range" min={0} max={durationSec} defaultValue={0} value={currentTimeSec} class="slider" id="myRange" onChange={(e) => {
                            audioRef.current.currentTime = e.target.value
                        }} />
                        <audio style={{display: "none"}} alt={alt} src={src} autoPlay={autoPlay} ref={audioRef} onEnded={() => {
                            onCompleted()
                        }} onPlay={(e) => {
                            const { min, sec } = sec2Min(audioRef.current.duration);
                            setDurationSec(audioRef.current.duration);
                            setDuration([min, sec]);
                        
                            console.log(audioRef.current.duration);
                        }} /> 

                        {/* <button onClick={() => {
                            setIsPlaying(!isPlaying)
                        }}>{isPlaying.toString()}</button> */}
                        {/* {audioRef && <p>{audioRef.current.duration}</p>} */}
                    </div>
                </div>

            </div>
        </>
    );

    async function LoadMetaData() {

        

    }
}