
import { LiveLyrics } from "@/components";
import { useEffect, useRef, useState } from "react";

export default function LyricsTest () {

    const [currentMillis, setCurrentMillis] = useState(0)
    const audioRef = useRef(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMillis(audioRef.current.currentTime)
          },10);
          return () => clearInterval(interval);
    }, [currentMillis, audioRef]);

    return (<div>
        <h2>Live Lyric Test 1</h2>
        <audio ref={audioRef} src="http://aktuelt.tv/api/v1/files?fileId=69a70312-01c5-407e-bd02-b3d7a70ab7b5.mp3" controls />
        <LiveLyrics currentMillis={currentMillis} lyrics={[
            {
                millis: 14.5,
                line: "(Intro)"
            },
            {
                millis: 17,
                line: "We in the chruch, playa, get your mail"
            },
            {
                millis: 20,
                line: "It's only two places you end up, either gay or in jail"
            },
            {
                millis: 21.5,
                line: "Still nowhere to go (nowhere to go)"
            },
            {
                millis: 23.5,
                line: "Still nowhere to go (nowhere to go)"
            },
        ]} />
    </div>)

}