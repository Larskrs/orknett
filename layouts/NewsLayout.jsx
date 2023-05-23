import styles from "@/styles/layouts/NewsLayout.module.css"
import Head from "next/head";
import Image from "next/image";

export default function({children, 
    color,
    image,
    title,
    description,
    editors,}) {


    return (
        <div className={styles.container}> 

        <Head>
            <title>{title}</title>
        </Head>
            

            <header className={styles.header} style={{backgroundColor: color}}>
                <div>
                    <div>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                    <div className={styles.image}>
                        <Image src={image} height={500} width={500} />
                    </div>
                </div>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            
        </div>
    );
}