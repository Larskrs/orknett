
import Image from "next/image";
import styles from "./seriesCard.module.css"

export default function SeriesCard ({children, poster, ...props}) {
    return (
        <div {...props} className={styles.wrap}>
            <Image src={poster} fill className={styles.poster}/>
            {children}
        </div>
    );
}