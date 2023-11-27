import { InputField } from "@/components";
import styles from "@/styles/newUI/contact.module.css"
import Link from "next/link";

export default function Contact () {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <header>
                    <p>Kontakt oss, vi vil svare så fort som over hodet mulig.</p>
                </header>
                <Link className={styles.action} href={"/"}>Hjem</Link>
            </div>
        </div>
    );
}