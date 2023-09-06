
import styles from "./LargeCard.module.css"

export default function LargeCard ({media, children}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}