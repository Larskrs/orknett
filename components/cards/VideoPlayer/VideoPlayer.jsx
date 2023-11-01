
import { useEffect, useRef, useState } from "react";
import Slider from "../Slider/Slider";
import styles from "./VideoPlayer.module.css"

export default function VideoPlayer ({source, qualities, videoProps}) {

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
    const [buffered, setBuffered] = useState(0)
    
    const [timeLeft, setTimeLeft] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
    const [currentTime, setCurrentTime] = useState([0, 0]); // current time of the video in array. The first value represents the minute and the second represents seconds.
    const [currentTimeSec, setCurrentTimeSec] = useState(); //current time of the video in seconds
    const [duration, setDuration] = useState([0, 0]); // // total duration of the video in the array. The first value represents the minute and the second represents seconds.
    const [durationSec, setDurationSec] = useState(); // // current duration of the 

    useEffect(() => {
        const { min, sec } = sec2Min(videoRef.current.duration);
        setDurationSec(videoRef.current.duration);
        setDuration([min, sec]);
    
        console.log(videoRef.current);

        videoRef.current.addEventListener('play', () => {
            console.log("Starting playback...")
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
        const m = Math.round((seconds / 60) % 60);
        const h = Math.round((seconds / (60 * 60)) % 24);

        const timeCode = [
          m >= 1 ? m : "0",
          String(s).padStart(2, '0'),
        ]

        if (h >= 1) { timeCode.push(h+"") }

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
    
            console.log(`Video has been buffered from ${startTime} to ${endTime} seconds.`);
          }
        
        },1);
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

    //   console.log(currentTimeSec)

    return (
        <div className={styles.wrapper}>
            <video
                onClick={() => handlePlay()}
                ref={videoRef}
                src={source}
                {...videoProps}
            />

            <div className={styles.controls}>
                <div className={styles.sliderContainer}>
                    <Slider containerStyle={{position: "absolute"}}
                        progressStyle={{borderRadius: 0, background: "gray"}}
                        trackStyle={{borderRadius: 4, height: 6, }}
                        min={0} maxr={durationSec*1000} currentValue={buffered*1000} defaultValue={currentTime*1000}
                        smooth={"1000ms"}
                        />
                    <Slider
                        interactive containerStyle={{position: "absolute"}}
                        progressStyle={{borderRadius: 0, background: "white"}}
                        trackStyle={{borderRadius: 4, background: "transparent", height: 6, }}
                        thumbStyle={{borderRadius: "50%", width: 50, opacity: 1, scale: 1}}
                        ThumbChildren={({value}) => {

                          let _value = value/1000

                          const { hours, min, sec } = formatTime(_value);

                          return (
                            <div className={styles.slider_preview}>
                              {hours}:{min}:{sec}
                            </div>
                          )
                        }}
                        min={0} max={durationSec*1000} currentValue={currentTimeSec*1000} defaultValue={currentTime*1000}
                        smooth={"0ms"} onChange={(e) => {videoRef.current.currentTime = e/1000; handleChangeSlider()}}/>
                </div>
                <div className={styles.controlsRow}> 
                  <div className={styles.timeCode}>
                    <p>{currentTime.join(":")}</p>
                    <p>/</p>
                    <p>{duration.join(":")}</p>
                  </div>
                  <div>
                  </div>
                </div>
            </div>

        </div>
    );
}