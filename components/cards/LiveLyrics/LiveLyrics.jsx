
import { Londrina_Sketch } from "next/font/google";
import { useState, useEffect } from "react";
import styles from "./LiveLyrics.module.css"

export default function LiveLyrics ({lyrics, audioRef}) {

    const [currentLine, setCurrentLine] = useState(0)
    const [currentVerse, setCurrentVerse] = useState(0)
    const [currentMillis, setCurrentMillis] = useState(0)

    const lines = [].concat(...lyrics);
    console.log(lines)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMillis(audioRef.current.currentTime)
          },10);
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

    function calculateOpacity(x, midpoint, maxOpacity) {
        // Calculate the absolute difference between x and the midpoint
        var difference = Math.abs(x - midpoint);
    
        // Calculate opacity based on the difference and a maximum opacity value
        var opacity = 1 - (difference / (midpoint * 2)) * maxOpacity;
    
        // Ensure opacity is within the range [0, 1]
        opacity = Math.max(0, Math.min(1, opacity));
    
        return opacity;
    }

    return (
        <div className={styles.verse}>

                    {lines.map((line, i) => {
                                            
                        return <p style={{
                            opacity: currentLine == i ? 1 : .5,
                            display: "flex",
                            gap: 8,
                            transform: currentLine == i ? "scale(1.2)" : "scale(1)"
                        }}
                        onClick={() => {
                            audioRef.current.pause()
                            audioRef.current.currentTime = line.millis;
                            audioRef.current.play()
                        }}> {line.line}</p>
                        })}
        </div>
    )

}