import Image from "next/image"
import styles from "./ArticleCard.module.css"

export default function ArticleCard ({
    image,
    title,
    description,
    writer,
    writerAvatar,
    dataCreated,
    tags,
    contain = false,
}) {

    return (
        <div className={styles.card}>
            {/* <Image alt={"Bilde av: " + title} fill quality={1} style={{objectFit: "cover", filter: "blur(20px)", zIndex: 0, scale:"1.5", opacity: .2}} src={image} /> */}
            <div className={styles.image}>
                <Image alt={"Bilde av: " + title} quality={100} fill src={image}
                style={{objectFit: contain ? "contain" : "cover"}} />
            </div>
            {/* <div className={styles.bg}>
                <Image alt={"Bilde av: " + title} style={{background: "var(--background)"}} quality={1} fill src={image} />
            </div> */}
            <div className={styles.details}>

            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.tags}>
            {tags && tags.map((t) => {
                return (<span style={{background: t.color}} key={t.text}>{t.text}</span>)
            })}
            </div>
            </div>

        </div>
    )

}