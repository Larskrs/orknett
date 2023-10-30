import styles from "./Slider.module.css"
import { useState, useEffect } from "react"

export default function Slider ({
    min, max, defaultValue, currentValue,
    onChange=() => {},
    trackStyle, thumbStyle, progressStyle, containerStyle, draggingStyle,
    smooth=true,
    interactive=false,
    ThumbChildren,

}) {

    const getPercentage = (value) => ((value - min) / (max - min)) * 100;
    const handleDragEnd = () => {
        setIsDragging(false)
    }
    const handleDragStart = () => {
        setIsDragging(true);
      };
    const handleDrag = (e) => {
        if (!isDragging) {
            return 
        }
        const { left, width } = e.currentTarget.getBoundingClientRect()
            const percentage = (event.clientX - left) / width
            const newValue = Math.round(min + percentage * (max - min))
            setValue(newValue)
    }
    const handleClick = (e) => { 

        const { left, width } = e.currentTarget.getBoundingClientRect()
        const percentage = (event.clientX - left) / width
        const newValue = Math.round(min + percentage * (max - min))
        setValue(newValue)
        onChange(newValue)

    }

    const [isDragging, setIsDragging] = useState(false)
    const [value, setValue] = useState(defaultValue || currentValue)

    useEffect(() => {
        if (isDragging) return;
        setValue(currentValue)
    }, [currentValue])
        
    const progressStyleLocal = {width: `${getPercentage(value)}%`, transition: smooth ? "inherit" : "none"}

    return (
        <div className={styles.container} style={containerStyle}
        onMouseDown={interactive ? handleDragStart : () => {}}
        onMouseUp={interactive ? handleDragEnd : () => {}}
        onMouseMove={interactive ? handleDrag : () => {}}
        onClick={interactive ? handleClick : () => {}}
        >
            { interactive && <div 
                className={styles.thumb} style={{left: `${getPercentage(value)}%`}} ></div> }
            <div style={{left: `${getPercentage(value)}%`, position: "absolute", transition: "translate .25s ease-in-out"}} >{ThumbChildren && <ThumbChildren value={value} />}</div>
            <div className={styles.track} 
                style={trackStyle}
            >
                <div
                    className={styles.progress}
                    style={Object.assign({transitionProperty: "width", transitionDuration: isDragging ? "0s" : smooth}, progressStyle, progressStyleLocal)}
                >
                </div>
            </div>
        </div>
    );
}