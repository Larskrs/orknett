
import styles from "./inputfield.module.css"
import { useState } from "react";

export default function DateField ({children, placeholder, style={}, maxInputLength = 25, defaultValue=""},  ...props) {

    const [length, setLength] = useState(defaultValue.length)
    const [value, setValue] = useState("")

    return (
        <div className={styles.wrap} onClick={() => {}}>
            <input 
                type="date"
                name={placeholder}
                className={styles.input}
                maxLength={maxInputLength}
                defaultValue={defaultValue}
                style={style}
                required={true}

            onChange={(e) => {
                
                const _value = e.target.value
                setValue(_value)
                if (value > maxInputLength) { return; }
                
                setLength(e.target.value.length)
            }} {...props} />
            <p className={styles.nameStatic}>{placeholder}</p>
            <p 
                className={styles.counter}
                >{length}/{maxInputLength}</p>
        </div>
    );
}