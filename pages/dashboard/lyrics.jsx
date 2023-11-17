
import { LiveLyrics } from "@/components";
import { useEffect, useRef, useState } from "react";

export default function LyricsTest () {

    const audioRef = useRef(null)

    return (<div>
        <h2>Live Lyric Test 1</h2>
        <audio ref={audioRef} style={{width: "100%"}}src="http://aktuelt.tv/api/v1/files?fileId=69a70312-01c5-407e-bd02-b3d7a70ab7b5.mp3" controls />
        <LiveLyrics audioRef={audioRef} lyrics={[
            [
                {
                    millis: 0,
                    line: "(Intro)"
                },
                {
                    millis: 14.4,
                    line: "We in the chruch, playa, get your mail"
                },
                {
                    millis: 16.75,
                    line: "It's only two places you end up, either gay or in jail"
                },
                {
                    millis: 19.5,
                    line: "Still nowhere to go (nowhere to go)"
                },
                {
                    millis: 22.25,
                    line: "Still nowhere to go (nowhere to go)"
                },
                {
                    millis: 25.25,
                    line: "So keep your hands up"
                },
                {
                    millis: 26,
                    line: "Mormons, Muslims, Christians, hoes"
                },
                {
                    millis: 29,
                    line: "Everybody, fuck that"
                },
                {
                    millis: 30.75,
                    line: "Still nowhere to go (nowhere to go)"
                },
                {
                    millis: 33.5,
                    line: "Still nowhere to go (nowhere to go)"
                },
            ],
            [
                {
                    millis: 36.5,
                    line: "Two words, young Willy, spit fire, praise god"
                },
                {
                    millis: 39.5,
                    line: "get higher, admire my talents, stay balanced, get back me"
                },
            ],

        ]} />
    </div>)

}