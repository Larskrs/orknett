
import { AudioPlayer, LiveLyrics } from "@/components";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LyricsTest () {

    const fileId = "69a70312-01c5-407e-bd02-b3d7a70ab7b5.mp3"

    return (<div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
        {/* <span style={{display: "flex", alignItems: "center", gap: 8}}>
            <h1 style={{fontWeight: "500"}}><span style={{color: "var(--folly)",fontWeight: "900",fontFamily: "monospace"}}>Live</span>Lyric</h1>
            <span style={{display: "flex", alignItems: "center", flexDirection: "row"}}><Image width={75} height={25} src={"/new_logo.svg"} /></span>
        </span>
        <p>Version v0.2</p>

        <h2>Carl William - Two Words</h2> */}

            <AudioPlayer
            src={`http://aktuelt.tv/api/v1/files?fileId=${fileId}`}
            cover={`http://aktuelt.tv/api/v1/files/audio/cover?fileId=${fileId}`}
            lyrics={
                [
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
                            line: "Mormons, Muslims, Christians"
                        },
                        {
                            millis: 28,
                            line: "Hoes"
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
                            line: "Two words, young Willy, spit fire"
                        },
                        {
                            millis: 38.75,
                            line: "Praise god, get higher, admire"
                        },
                        {
                            millis: 40.75,
                            line: "My talents, stay balanced"
                        },
                        {
                            millis: 42.4,
                            line: "Get back, be silent"
                        },
                        {
                            millis: 43.75,
                            line: "I’m violent, your private, I’m pilot"
                        },
                        {
                            millis: 45.85,
                            line: "The climate"
                        },
                        {
                            millis: 46.5,
                            line: "Everybody Move!"
                        },
                        {
                            millis: 48,
                            line: "Two words, ben shap, good rap, gun clap"
                        },
                        {
                            millis: 50.75,
                            line: "Big mac, eat crap, get hit, eat shit"
                        },
                        {
                            millis: 53.5,
                            line: "Ye flip, big dick, bad trip, evil ship"
                        },
                        {
                            millis: 56.4,
                            line: "I blip, blood not crip"
                        },
                        {
                            millis: 57.75,
                            line: "Everybody Move!"
                        },
                        {
                            millis: 59,
                            line: "Two words Hypeman, Dutch plan"
                        },
                        {
                            millis: 61,
                            line: "Plain sand, pure lamb, my land"
                        },
                        {
                            millis: 63.25,
                            line: "Get canned, get rammed, get slammed"
                        },
                        {
                            millis: 65.5,
                            line: "Get clammed, get hammed"
                        },
                        {
                            millis: 67,
                            line: "You don’t have a band"
                        },
                        {
                            millis: 68.75,
                            line: "Everybody move!"
                        }
                    ],
                    [
                        {
                            millis: 70.5,
                            line: "Two words, Young Willy, K West"
                        },
                        {
                            millis: 72.4,
                            line: "Hot shit"
                        },
                        {
                            millis: 73,
                            line: "Calm down, roblox, nut socks"
                        },
                        {
                            millis: 75,
                            line: "Big cocks"
                        },
                        {
                            millis: 76,
                            line: "I’m hot, you’re not"
                        },
                        {
                            millis: 77.5,
                            line: "I will never stop"
                        },
                        {
                            millis: 79,
                            line: "Everybody move!"
                        },
                        {
                            millis: 90,
                            line: ""
                        },
                    ],
        
                ]
            }
            />
    
    </div>)

}