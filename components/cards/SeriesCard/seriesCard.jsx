
import Image from "next/image";
import styles from "./seriesCard.module.css"

export default function SeriesCard ({children, poster,  title, ...props}) {
    return (
        <div {...props} className={styles.wrap}>
            <Image src={poster} fill alt={title} style={{objectFit: "cover"}} className={styles.poster}/>
            {children}
        </div>
    );
}