import { useEffect, useRef, useState } from "react";
import jsmediatags from "jsmediatags";
import Image from "next/image";
import Badge from "../badge/badge";
import styles from "./AudioPlayer.module.css"
import Slider from "../Slider/Slider";
import { getContentIconSource } from "@/lib/FileHelper";
export default function AudioPlayer ({src, cover, alt, title, autoPlay=true, onCompleted=() => {}, defaultTitle=""}) {

    const [data, setData] = useState()
    const [volume, setVolume] = useState()
    const [time, setTime] = useState()
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [currentTime, setCurrentTime] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
    const [currentTimeSec, setCurrentTimeSec] = useState(); //current time of the video in seconds
    const [duration, setDuration] = useState([0, 0]); // // total duration of the video in the array. The first value represents the minute and the second represents seconds.
    const [durationSec, setDurationSec] = useState(); // // current duration of the 

    const [albumCover, setAlbumCover] = useState(cover)
    
    useEffect(() => {
        LoadMetaData()
    })

    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch(`/api/v1/files/audio/data?fileId=${src.split("fileId=").pop()}`);
            const data = await res.json()
            console.log(data, res.status, defaultTitle)
            if (!data.tags.picture) {
                setAlbumCover( getContentIconSource("audio") )
            }
            
            if (data.error ) {
                setData({
                    artist: src.split('fileId=').pop().split('.')[0],
                    track: "File does not support tracks",
                    error: "File not supported",
                })
                return
            }
            setData(data.tags)
            
        }

        fetchData()
    }, []);

    useEffect(() => {
        const { min, sec } = sec2Min(audioRef.current.duration);
        setDurationSec(audioRef.current.duration);
        setDuration([min, sec]);
    
        console.log(audioRef.current.duration);

        audioRef.current.addEventListener('play', () => {
            console.log("Starting playback...")
            setIsPlaying(true)
          });
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

      function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        
        const secondsDisplay = String(remainingSeconds).padStart(2, '0');

        return { min: minutes, sec: secondsDisplay, remainingSeconds: remainingSeconds};
      }

    useEffect(() => {
        const { min, sec } = formatTime(audioRef.current.duration);
        setDurationSec(audioRef.current.duration);
        setDuration([min, sec]);
    
        // console.log(audioRef.current.duration);
        const interval = setInterval(() => {
          const { min, sec } = formatTime(audioRef.current.currentTime);
          setCurrentTimeSec(audioRef.current.currentTime);
          setCurrentTime([min, sec]);
        }, 1000);
        return () => clearInterval(interval);
      }, [isPlaying]);

    //   console.log(currentTimeSec)

    return (
        <>
            <div className={styles.wrap} style={{width: "500px", userSelect: "none"}}>
                <div className={styles.coverContainer} onClick={() => {
                        handlePlay()
                    }}>
                    {data && data.error && <p style={{position: "absolute", bottom: "4px", left: "0px", margin: 0, width: "100%", textAlign: "center", fontSize: 20}}>.{src.split(".").pop()}</p> }
                    <Image src={albumCover} width={100} height={100} alt={albumCover} style={{
                        animationPlayState: (isPlaying && data && !data.error ? "running" : "paused"),
                        transition: (isPlaying ? "none" : "inherit"),
                        rotate: (isPlaying ? "0deg" : "0deg"),
                        background: "#333"
                    }} />
                    <div src={(isPlaying) ? "/pause.svg" : "/play.svg"} className={styles.play} width={75} height={75} alt={albumCover} >
                        <span style={!isPlaying ? {translate: "0px 14.75px", rotate: "45deg"} : {}} />
                        <span style={!isPlaying ? {translate: "0px -14.75px", rotate: "-45deg"} : {}} />
                    </div>
                </div>
                <div className={styles.column} style={{width: "100%", justifyContent: "center"}}>
                    <div className={styles.details}>
                        <p className={styles.title}>{defaultTitle}</p>
                        {data && data.artist && <p className={styles.artist}>{data.artist}</p>}
                        {data && data.track && <p className={styles.artist}>Track Id: {data.track}</p>}
                    </div>
                    <div className={styles.duration}>
                        <p>{currentTime[0]}:{currentTime[1]}</p>
                        <p>{duration[0]}:{duration[1]}</p>
                    </div>
                    <div className={styles.controls} style={{width: "100%"}}>
                         <Slider min={0} max={durationSec} currentValue={currentTimeSec} defaultValue={currentTime} smooth={false} progressStyle={{backgroundImage: `url(${cover})`, transform: "scaleY(5)"}} containerStyle={{height: "16px"}} onChange={(e) => {audioRef.current.currentTime = e}}/>
                        <audio alt={alt} src={src} autoPlay={autoPlay} ref={audioRef} onEnded={() => {
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