
import { useState, useEffect } from "react";
import styles from "./LiveLyrics.module.css"

export default function LiveLyrics ({lyrics, currentMillis}) {

    const [currentLine, setCurrentLine] = useState(0)

    useEffect(() => {
        const currentLineEl = lyrics[currentLine]
        if (lyrics[currentLine])
        for (let i = 0; i < lyrics.length; i++) {
            const line = lyrics[i];
            if (line.millis < currentMillis) {
                setCurrentLine(i+1)
            }
        }

    }, [currentLine, currentMillis])

    return (
        <div className={styles.wrap}>
                    <p>Current Millis: [{currentMillis}]</p>
                    <p>Current Line: [{currentLine}]</p>

                    {lyrics.map((line, i) => {
                        return <p style={{opacity: currentLine == i ? 1 : .5}}> {line.line}</p>
                    })}
        </div>
    )

}