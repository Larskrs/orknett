import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/layouts/FileSharingLayout.module.css"
import { useState } from "react";
import LoginButton from "@/components/LoginButton"
import Image from "next/image";
import { Badge, ColorImage } from "@/components";
import useFetch from "@/hooks/useFetch";  
import { GetShortHandle } from "@/lib/ShorthandHelper";
import { useRouter } from "next/router";
import { isSourceContentType } from "@/lib/ExtensionHelper";

export default function Layout({children, pageId = 0, theme = "dark"}) {
    const router = useRouter()
    const [current, setCurrent] = useState(pageId)

    return (
        <div>
                  <Head>
                    <title>Aktuelt.tv Dashboard</title>
                  </Head>
                  <div className={styles.navContainer}>
                  <nav className={styles.nav} style={{
                    backgroundColor: (theme == "dark" ? "var(--dark-green)" : "transparent")
                  }}>
                      <Link className={current === -1 ? styles.element : styles.default} href={"/"}><Image width={30} height={30} src={"/new_logo_symbol.svg"} /></Link>
                      <Link className={current === 2 ? styles.element : styles.default} href={"/dashboard"}>Files</Link>
                      <Link className={current === 3 ? styles.element : styles.default} href={"/dashboard/batches"}>Batches</Link>
                      <Link className={current === 4 ? styles.element : styles.default} href={"/dashboard/articles"}>Articles</Link>
                      {/* <Link className={current === 5 ? styles.element : styles.default} href={"/dashboard/series"}>Series</Link> */}
                      <LoginButton />
                  </nav>
                  </div>

                  <main className={styles.main}>
                    {children}
                  </main>
        </div>
    );

    
}