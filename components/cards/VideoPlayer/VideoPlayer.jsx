
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "../Slider/Slider";
import styles from "./VideoPlayer.module.css"

export default function VideoPlayer ({source, qualities, videoProps, defaultQuality}) {

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const [buffered, setBuffered] = useState(0)
    
    const [timeLeft, setTimeLeft] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
    const [currentTime, setCurrentTime] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
    const [currentTimeSec, setCurrentTimeSec] = useState(); //current time of the video in seconds
    const [duration, setDuration] = useState([0, 0]); // // total duration of the video in the array. The first value represents the minute and the second represents seconds.
    const [durationSec, setDurationSec] = useState(); // // current duration of the 

    const [capturedCurrentTime, setCapturedCurrentTime] = useState(0)

    const [quality, setQuality] = useState(qualities.length - 1)

    function GetQualitySource (source, newQuality) {
      let urlObject = null;
      if (!source.includes("://")) {
        urlObject = new URL(process.env.NEXT_PUBLIC_URL + source)
      } else {
        urlObject = new URL(source)
      }
      console.log(urlObject.href)
      urlObject.searchParams.set('quality', newQuality);
      return urlObject.href;
    }

    function changeQuality (q) {
      setCapturedCurrentTime(videoRef.current.currentTime)
      setQuality(q)

      // setLoadedSource(GetQualitySource(source, qualities[q]))
    }
    useEffect(() => {
      videoRef.current.currentTime = capturedCurrentTime
    }, [quality])

    useEffect(() => {

        const { min, sec } = sec2Min(videoRef.current.duration);
        setDurationSec(videoRef.current.duration);
        setDuration([min, sec]);

        videoRef.current.addEventListener('play', () => {

            setIsPlaying(true)
          });

        
      }, [videoRef]);

    const handlePlay = () => {
        if (isPlaying) {
            videoRef.current.pause()
            setIsPlaying(false)
        } else {
            videoRef.current.play()
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
        const s = Math.round(seconds % 60);
        const m = Math.floor((seconds / 60) % 60);
        const h = Math.floor((seconds / (3600)) % 24);

        const timeCode = [
          
        ]

        if (h >= 1) { timeCode.push(h) }
        timeCode.push(h >= 1 ? String(m).padStart(2, '0') : m)
        timeCode.push(String(s).padStart(2, '0'))

        return {
          timeCode,
          remainingSeconds: s
        }
      }

    function updateTimeLeft () {
      const timeLeftMillis = videoRef.current.duration - videoRef.current.currentTime
      const { timeCode } = formatTime(timeLeftMillis);
      setTimeLeft(timeCode);
    }

    useEffect(() => {

        const { timeCode } = formatTime(videoRef.current.duration);
        setDurationSec(videoRef.current.duration);
        setDuration(timeCode);
    
        // console.log(videoRef.current.duration);
        const interval = setInterval(() => {
          const { timeCode } = formatTime(videoRef.current.currentTime);
          setCurrentTimeSec(videoRef.current.currentTime);
          setCurrentTime(timeCode);
          
          updateTimeLeft ()
          
 
          const buffered = videoRef.current.buffered;

          // Check if there are buffered time ranges
          if (buffered && buffered.length > 0) {
            // Get the start and end times of the first buffered range
            const startTime = buffered.start(0);
            const endTime = buffered.end(0);

            setBuffered(endTime)
          }
        
        },0);
        return () => clearInterval(interval);
      }, [isPlaying]);

      function handleChangeSlider () {
        const buffered = videoRef.current.buffered;

          // Check if there are buffered time ranges
          if (buffered && buffered.length > 0) {
            // Get the start and end times of the first buffered range
            const startTime = buffered.start(0);
            const endTime = buffered.end(0);

            setBuffered(endTime)
          }
      }

      function OpenFullscreen () {

        if (document.fullscreenElement) {
          document.exitFullscreen()
        }

        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) { /* Safari */
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) { /* IE11 */
          containerRef.current.msRequestFullscreen();
        }

      }


    return (
        <div className={styles.wrapper} ref={containerRef}>
            <video
                preload="meta"
                autoPlay
                onClick={() => handlePlay()}
                ref={videoRef}
                src={GetQualitySource(source, qualities[quality])}
                {...videoProps}
            />

            <div className={styles.controls}>
                <div className={styles.sliderContainer}>
                    <Slider containerStyle={{position: "absolute"}}
                        progressStyle={{borderRadius: 0, background: "gray"}}
                        trackStyle={{borderRadius: 4, height: 6, }}
                        min={0} max={durationSec*1000} currentValue={buffered*1000} defaultValue={currentTime*1000}
                        smooth={"1000ms"}
                        />
                    <Slider
                        interactive containerStyle={{position: "absolute"}}
                        progressStyle={{borderRadius: 0, background: "white"}}
                        trackStyle={{borderRadius: 4, background: "transparent", height: 6, }}
                        thumbStyle={{borderRadius: "50%", width: 50, opacity: 1, scale: 1}}
                        ThumbChildren={({value}) => {

                          let _value = value/1000
                          setCapturedCurrentTime(_value)

                          const { timeCode } = formatTime(_value);

                          return (
                            <div className={styles.slider_preview}>
                              {timeCode.join(":")}
                            </div>
                          )
                        }}
                        min={0} max={durationSec*1000} currentValue={videoRef.current?.currentTime*1000} defaultValue={currentTime*1000}
                        smooth={"100ms"} onChange={(e) => {videoRef.current.currentTime = e/1000; handleChangeSlider()}}/>
                </div>
                <div className={styles.controlsRow}> 
                <div style={{display: "flex",gap: 8}}>
                    <button onClick={() => {handlePlay()}} style={{padding: "0px", background: "none",outline: "none", border: "none", heigh: "unset", margin: 0, width: 32, height: 32, position: "relative"}}>
                      <Image alt="play_icon" style={{opacity: isPlaying ? 0 : 1 , transitionDuration: "500ms"}} src={`/icons/play_icon.svg`} fill />
                      <Image alt="pause_icon" style={{opacity: isPlaying ? 1 : 0 , transitionDuration: "500ms"}} src={`/icons/pause_icon.svg`} fill />
                    </button>

                    <div className={styles.timeCode}>
                      <p>{currentTime.join(":")}</p>
                      <p>/</p>
                      <p>{duration.join(":")}</p>
                    </div>
                     
                </div>
                <div style={{display: "flex",gap: 8, overflowX: "scroll"}}>
                {qualities && qualities.map((q, i) => {
                  return <button key={q} style={{
                    borderBottom: i == quality ? "rgba(255,255,255,1) 2px solid" : "2px solid rgba(255,255,255,.1)",
                    padding: ".25rem .5rem",
                    borderRadius: 0
                  }}
                  onClick={() => {changeQuality(i)}}
                  >
                    {q}
                  </button>
                 })}
                 <button onClick={() => {OpenFullscreen()}}>
                    <Image alt="fullscreen_icon" src={`/icons/fullscreen_open_icon.svg`} height={32} width={32} />
                 </button>
                </div>
                </div>
            </div>

        </div>
    );
}