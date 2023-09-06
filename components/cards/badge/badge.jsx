
import styles from "./badge.module.css"

export default function Badge ({children, ...props}) {
    return (
        <div {...props} className={styles.wrap}>
            {children}
        </div>
    );
}