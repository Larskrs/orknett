import { useEffect, useState } from "react"
import styles from "./ClipboardWrap.module.css"

export default function ClipboardWrap ({data, children}) {
    
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setTimeout(() => {
          setCopied(false);
        }, 5000);
     }, [copied]);

    return (
        <div  onClick={() => {navigator.clipboard.writeText(data); setCopied(true)}}>
            <div className={styles.container}>
            {children}
            {copied && <div className={styles.pop_up}>
                Kopiert til utklipstavle!
            </div>}
            </div>
        </div>
    )
}