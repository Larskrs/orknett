import { ClipboardWrap, InputField } from "@/components";
import styles from "@/styles/newUI/contact.module.css"
import Image from "next/image";
import Link from "next/link";

export default function Contact () {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                
                <div className={styles.main}>

                <div className={styles.information}>
                    <p>Kontakt oss på email</p>
                    <ClipboardWrap data={"aktueltstudio@gmail.com"}><p className={styles.detail}>aktueltstudio@gmail.com</p></ClipboardWrap>
                    </div>

                    <Link className={styles.action} href={"/"}>Hjem</Link>
                    </div>
                    <div className={styles.image}>
                        <Image className={styles.blur} fill src={"http://aktuelt.tv/api/v1/files?fileId=d8e5e400-ec12-4c7d-babe-3d95ad75d0e7.JPG"} />
                        <Image fill src={"http://aktuelt.tv/api/v1/files?fileId=d8e5e400-ec12-4c7d-babe-3d95ad75d0e7.JPG"} />
                    </div>
                </div>
        </div>
    );
}