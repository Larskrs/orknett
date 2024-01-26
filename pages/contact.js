import { InputField } from "@/components";
import styles from "@/styles/newUI/contact.module.css"
import Image from "next/image";
import Link from "next/link";

export default function Contact () {
    return (
        <div className={styles.container}>
            <div className={styles.main}>

                <div className={styles.image}>
                    <h1>Kontakt oss</h1>
                    <Image fill src={"http://aktuelt.tv/api/v1/files?fileId=97b9c093-b87c-49bd-a4dc-1bbabdd644e1.jpeg"} />
                </div>
                
                <p className={styles.detail}>aktueltstudio@gmail.com</p>

                <Link className={styles.action} href={"/"}>Hjem</Link>
            </div>
        </div>
    );
}