
import styles from "./Glossy.module.css"

export default function Glossy (props, {children}) {
    return (
        <div {...props} className={styles.container}>
            {children}
        </div>
    )
}
