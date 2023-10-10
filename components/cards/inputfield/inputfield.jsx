
import styles from "./inputfield.module.css"
import { useState } from "react";

export default function InputField ({children, maxInputLength = 25, defaultValue=""},  ...props) {

    const [length, setLength] = useState(defaultValue.length)

    return (
        <div className={styles.wrap} onClick={() => {}}>
            <input 
                className={styles.input}
                maxLength={maxInputLength}
                defaultValue={defaultValue}
                {...props}

            onChange={(e) => {

                const value = e.target.value
                if (value > maxInputLength) { return; }

                setLength(e.target.value.length)
            }} {...props} />
            <p 
                style={{color: (length == 0 ? "transparent" : (length == maxInputLength ? "red" : "white"))}}
                className={styles.counter}
                >{length}/{maxInputLength}</p>
        </div>
    );
}