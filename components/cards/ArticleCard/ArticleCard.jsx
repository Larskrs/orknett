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
            <Image alt={"Bilde av: " + title} fill quality={1} style={{objectFit: "cover", filter: "blur(20px)", zIndex: 0, scale:"1.5", opacity: .2}} src={image} />
            <div className={styles.image}>
                <Image alt={"Bilde av: " + title} style={{background: "var(--background)"}} quality={25}fill src={image} />
            </div>
            <div style={{zIndex: 2, display: "flex", flexDirection: "column", gap: 8, padding: "8px"}}>

            {tags && tags.map((t) => {
                return (<span key={t.text}>{t.text}</span>)
            })}
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            </div>

        </div>
    )

}