import { ClipboardWrap, InputField } from "@/components";
import Layout from "@/layouts/newUI/ArticleLayout";
import styles from "@/styles/newUI/contact.module.css"
import Image from "next/image";
import Link from "next/link";

export default function Contact () {
    return (
        <Layout>

        <div className={styles.container}>
            <div className={styles.grid}>
                
                <div className={styles.main}>

                <div className={styles.information}>
                    <h1>Finn ut hva som gjør oss unike!</h1>
                    <p>Kontakt oss i dag for å sikre din plass for produksjon!</p>
                    <ClipboardWrap data={"aktueltstudio@gmail.com"}><p className={styles.detail}>aktueltstudio@gmail.com</p></ClipboardWrap>

                    </div>

                    </div>
                    <div className={styles.image}>
                        <video muted style={{objectFit: "cover"}} autoPlay loop src={"http://aktuelt.tv/api/v1/files?fileId=ce3359a0-8176-4fa7-aa6d-7b1a4aea2167.mp4"} />
                    </div>


                </div>
                <Image className={styles.blur} quality={1} fill src={"http://aktuelt.tv/api/v1/files?fileId=6ae7ec9b-9bf9-4032-baa3-c0b3f96e172b.JPG"} />
        </div>
        </Layout>
    );
}