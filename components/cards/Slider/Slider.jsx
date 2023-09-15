import styles from "./Slider.module.css"
import { useState, useEffect } from "react"

export default function Slider ({
    min, max, defaultValue, currentValue,
    onChange=() => {},
    trackStyle, thumbStyle, progressStyle, containerStyle, draggingStyle,
    smooth=true,

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
        <div className={styles.container} style={containerStyle}>
            <div className={styles.track} 
                style={trackStyle}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onMouseMove={handleDrag}
                onClick={handleClick}
            >
                <div
                    className={styles.progress}
                    style={Object.assign({}, progressStyle, progressStyleLocal)}
                >

                </div>
                <div className={styles.thumb} style={{left: `${getPercentage(value)}%`, opacity: (isDragging) ? 1 : 0, transform: isDragging ? "scale(1)" : "scale(0)"}}>
                </div>
            </div>
        </div>
    );
}