import Image from "next/image"
import styles from "./ArticleCard.module.css"

export default function ArticleCard ({
    image,
    title,
    description,
    writer,
    writerAvatar,
    dataCreated,
    tags
}) {

    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <Image fill src={image} />
            </div>
            {tags && tags.map((t) => {
                return (<span key={t.text}>{t.text}</span>)
            })}
            <h2 className={styles.title}>{title}</h2>
            <p>{description}</p>
        </div>
    )

}