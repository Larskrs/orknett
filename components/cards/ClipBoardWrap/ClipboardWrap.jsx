import { useEffect, useState } from "react"
import styles from "./ClipboardWrap.module.css"

export default function ClipboardWrap ({data, children}) {
    
    const [copied, setCopied] = useState(false)

    useEffect(() => {

        const timeout = setInterval(() => {
          setCopied(false);
        }, 5000);

        return () => clearInterval(timeout)
     }, [copied]);

    return (
        <div>
            <div className={styles.container}>
            <div onClick={() => {navigator.clipboard.writeText(data); setCopied(true)}}>
                {children}
                </div>
            {copied && <div className={styles.pop_up}>
                Kopiert til utklipstavle!
            </div>}
            </div>
        </div>
    )
}