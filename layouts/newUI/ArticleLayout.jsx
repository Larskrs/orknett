import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/LoginButton"
import styles from "@/styles/newUI/home.module.css"
import useViewDown from "@/hook/useViewDown";
import { useSession } from "next-auth/react";
import { UserDropMenu } from "@/components";

export default function Layout({children, current=0}) {

    const isNavDown = useViewDown(72)
    const router = useSession()
    const session = useSession()

    return (
        <div className={styles.container}>
    
              <nav className={styles.nav}  style={{background: isNavDown ? "var(--midnight)" : "transparent"}}>
                  <Link href={"/"} style={{marginRight: "1.2em"}}>
                    <Image width={40} height={40} src={"/new_logo_symbol.svg"}></Image>
                    {/* <h2>.tv</h2> */}
                  </Link>
                  {/* <Link href={"/profiles"}>Profiler</Link> */}
                  <p style={{cursor: "pointer"}} onClick={() => {setTransitionPage("contact")}}>Kontakt Oss</p>
                  <div style={{marginLeft: "auto", marginRight: 24}}>
                    {session.status === "authenticated" && 
                        <UserDropMenu avatar={session.data.user.image} name={session.data.user.name} />
                    }
                    {session.status !== "authenticated" && <Link href={"/auth/signin"}>Logg In</Link> }
                  </div>
            </nav>

            {children}
            
        </div>
      )
    }
