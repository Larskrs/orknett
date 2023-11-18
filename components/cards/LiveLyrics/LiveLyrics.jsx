
import { Londrina_Sketch } from "next/font/google";
import { useState, useEffect } from "react";
import styles from "./LiveLyrics.module.css"
import Image from "next/image";

export default function LiveLyrics ({title, lyrics, audioRef, albumCover}) {

    const [currentLine, setCurrentLine] = useState(0)
    const [currentVerse, setCurrentVerse] = useState(0)
    const [currentMillis, setCurrentMillis] = useState(0)

    const lines = [].concat(...lyrics);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMillis(audioRef.current.currentTime)
          },100);
          return () => clearInterval(interval);
    }, [currentMillis, audioRef]);

    useEffect(() => {
        audioRef.current.addEventListener('play', () => {
            console.log("Starting playback...")
            setCurrentLine(0)
          });
      }, [audioRef]);

    useEffect(() => {
        const currentLineEl = lines[currentLine]
        if (lines[currentLine])
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.millis < currentMillis) {
                setCurrentLine(i)
            } else {
                continue;
            }
        }

    }, [currentLine, currentMillis])

    useEffect(() => {
        const lyric_element = document.getElementById("lyric_"+(currentLine-1))
        if (!lyric_element) {return; }
        lyric_element.scrollIntoView()
    }, [currentLine])
    

    function calculateOpacity(x, midpoint, maxOpacity) {
        // Calculate the absolute difference between x and the midpoint
        var difference = Math.abs(x - midpoint);
    
        // Calculate opacity based on the difference and a maximum opacity value
        var opacity = 1 - (difference / (midpoint * 2)) * maxOpacity;
    
        // Ensure opacity is within the range [0, 1]
        opacity = Math.max(0, Math.min(1, opacity));
    
        return opacity;
    }

    function Verse (verse) {
        return (
            <div className={styles.verse}>
    
                        {lines.map((line, i) => {
                                   
                                   if (!verse.includes(line)) {
                                    return ;
                                   }
                                   
                            return <p className={styles.line} id={`lyric_${i}`} key={i} style={{
                                opacity: currentLine == i ? 1 : .25,
                                display: "flex",
                                gap: 8,
                                transform: currentLine == i ? "scale(1.2)" : "scale(1)"
                            }}
                            onClick={() => {
                                console.log("Skipping to lyric point.")
                                audioRef.current.pause()
                                audioRef.current.currentTime = line.millis;
                                audioRef.current.play()
                            }}> {line.line} </p>
                            })}
            </div>
        )
    }

    return (
        <>
            <div className={styles.lyrics}>
                <h1>{title}</h1>
            {lyrics.map((verse, i) => {
                return Verse(verse)
            })}
            
            </div>
        </>
    )

}