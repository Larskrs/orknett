import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/LoginButton"
import styles from "@/styles/newUI/home.module.css"
import useViewDown from "@/hook/useViewDown";
import { useSession } from "next-auth/react";
import { UserDropMenu } from "@/components";

export default function Layout({children, current=0, background}) {

    const isNavDown = useViewDown(72)
    const router = useSession()
    const session = useSession()

    return (
        <div className={styles.container} style={{
          background: background,
        }}>
    
              <nav className={styles.nav}  style={{background: isNavDown ? "var(--midnight)" : "transparent"}}>
                  <Link href={"/"} style={{marginRight: "1.2em"}}>
                    <Image width={40} height={40} src={"/new_logo_symbol.svg"}></Image>
                    {/* <h2>.tv</h2> */}
                  </Link>
                  {/* <Link href={"/profiles"}>Profiler</Link> */}
                  <Link href={"/contact"}>Kontakt oss</Link>
                  <div style={{marginLeft: "auto"}}>
                    {session.status === "authenticated" && 
                        <UserDropMenu avatar={session.data.user.image} name={session.data.user.name} />
                    }
                    {session.status !== "authenticated" && <Link href={"/auth/signin"}>Logg inn</Link> }
                  </div>
            </nav>

            {children}

            <footer className={styles.footer}>
              <section>
                    <Image src={"/new_logo.svg"} width={125} height={50}/>
              </section>
                <p>Aktuelt Studio 2024©</p>
              
            </footer>
            
        </div>
      )
    }
