import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/layouts/FileSharingLayout.module.css"
import { useState } from "react";
import LoginButton from "@/components/LoginButton"
import Image from "next/image";
import { Badge, ColorImage, UserDropMenu } from "@/components";
import useFetch from "@/hooks/useFetch";  
import { GetShortHandle } from "@/lib/ShorthandHelper";
import { useRouter } from "next/router";
import { isSourceContentType } from "@/lib/ExtensionHelper";
import { useSession } from "next-auth/react";

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
                      <Link className={current === 2 ? styles.element : styles.default} href={"/dashboard"}><Image width={30} height={30} src={"/icons/files_icon.svg"} /></Link>
                      <Link className={current === 3 ? styles.element : styles.default} href={"/dashboard/batches"}><Image width={30} height={30} src={"/icons/batches_icon.svg"} /></Link>
                      <Link className={current === 4 ? styles.element : styles.default} href={"/dashboard/articles"}>Articles</Link>
                      {/* <Link className={current === 5 ? styles.element : styles.default} href={"/dashboard/series"}>Series</Link> */}
                      <UserDropMenu />
                  </nav>
                  </div>

                  <main className={styles.main}>
                    {children}
                  </main>
        </div>
    );

    
}