
import Image from "next/image";
import styles from "./UserDropMenu.module.css"
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";

export default function UserDropMenu ({}) {

    const [isExpanded, setIsExpanded] = useState(false)
    const router = useRouter()
    const session = useSession()

    const { isLoading, data, error, refetch } = useFetch("users/" + session?.data?.user?.id, null)
    useEffect(() => {
        if (data) {
            return;
        }
        if (session.status === "authenticated") {
            refetch()
        }
    }, [session, data])

    return (
        <div className={styles.wrap}>
            
            <div onClick={() => {setIsExpanded(!isExpanded)}} className={styles.avatar}>
                <Image src={data.image} fill />
            </div>


            <div style={{
                    opacity: isExpanded ? 1 : 0,
                    translate: isExpanded ? "0 0" : "100% 0",
                    pointerEvents: isExpanded ? "all" : "none",
                }} className={styles.menu}>

                    <div className={styles.banner}>
                        <div className={styles.image}>
                           {data && <Image quality={25} alt={data.banner} src={data.banner} fill /> }
                        </div>
                        <div className={styles.bar}></div>
                        <div onClick={() => {setIsExpanded(false)}} className={styles.avatar} >
                            <Image quality={25} src={data.image} fill />
                        </div>
                    </div>
                    <p className={styles.name}>{data.name}</p>
                    <div className={styles.buttons}>

                        <button onClick={() => {router.push("/profile/" + session.data.user.name)}}>Din Profil</button>
                        <button onClick={() => {router.push("/settings")}}>Innstillinger</button>
                        <button onClick={() => {router.push("/dashboard")}}>Dine Filer</button>
                        <button onClick={() => {router.push("/dashboard/batches")}}>Batcher</button>

                        <button style={{border: "1px solid #222"}} onClick={() => {signOut()}}>Log Ut</button>

                    </div>

                </div>
            
        </div>
    );

                
    
}
