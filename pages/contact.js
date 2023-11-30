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
                <div className={styles.form}>
                    <InputField placeholder={"Fornavn"} maxInputLength={30}></InputField>
                    <InputField placeholder={"Etternavn"} maxInputLength={30}></InputField>
                </div>
                <div className={styles.form}>
                    <InputField placeholder={"Selskap"} maxInputLength={30}></InputField>
                    <textarea placeholder="Melding..."/>
                </div>
                <Link className={styles.action} href={"/"}>Hjem</Link>
            </div>
        </div>
    );
}