
import styles from "./inputfield.module.css"
import { useState } from "react";

export default function InputField ({children, placeholder, style={}, maxInputLength = 25, defaultValue=""},  ...props) {

    const [length, setLength] = useState(defaultValue.length)

    return (
        <div className={styles.wrap} onClick={() => {}}>
            <input 
                type="text"
                name={placeholder}
                className={styles.input}
                maxLength={maxInputLength}
                defaultValue={defaultValue}
                style={style}
                required={true}

            onChange={(e) => {
                
                const value = e.target.value
                if (value > maxInputLength) { return; }
                
                setLength(e.target.value.length)
            }} {...props} />
            <p className={styles.name}>{placeholder}</p>
            <p 
                className={styles.counter}
                >{length}/{maxInputLength}</p>
        </div>
    );
}