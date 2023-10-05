import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/LoginButton"
import styles from "@/styles/newUI/layout/layout.module.css"

export default function Layout({children, current=0}) {
    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                    <Link className={current === -1 ? styles.element : styles.default} href={"/"}><Image width={30} height={30} src={"/aktueltstudio_logo.svg"} /></Link>
                      {/* <Link className={current === 0 ? styles.element : styles.default} href={"/dashboard"}>files</Link> */}
                      <div>
                        
                        <Link className={current === 2 ? styles.element : styles.default} href={"/dashboard/batches"}>Batches</Link>
                        <Link className={current === 3 ? styles.element : styles.default} href={"/dashboard/articles"}>Articles</Link>
                        <Link className={current === 4 ? styles.element : styles.default} href={"/dashboard/series"}>Series</Link>
                      
                      </div>
                      <LoginButton />
            </div>
            <div className={styles.navList}>

            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    );
}