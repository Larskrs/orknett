
import Image from "next/image";
import styles from "./UserDropMenu.module.css"
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import useDynamicFetch from "@/hooks/useDynamicFetch";

export default function UserDropMenu ({}) {

    const [isExpanded, setIsExpanded] = useState(false)
    const router = useRouter()
    const session = useSession()

    const { isLoading, data, error, refetch, fetch } = useDynamicFetch()
    useEffect(() => {
        if (session.status !== "authenticated") { return }
        console.log("Loading from user drop menu")
        fetch("users/" + session?.data?.user?.id)
    }, [session])

    return (
        <div className={styles.wrap}>
            <div onClick={() => {setIsExpanded(!isExpanded)}} className={styles.avatar}>
                {data?.image && <Image alt={"Avatar"} src={data.image} fill />}
            </div>

            <div style={{
                    opacity: isExpanded ? 1 : 0,
                    pointerEvents: isExpanded ? "all" : "none",
                }}
            onClick={() => {setIsExpanded(false)}} className={styles.deadzone}></div>

            <div style={{
                    opacity: isExpanded ? 1 : 0,
                    translate: isExpanded ? "0 0" : "100% 0",
                    pointerEvents: isExpanded ? "all" : "none",
                }} className={styles.menu}>

                    <div className={styles.banner}>
                        <div className={styles.image}>
                           {data?.banner && <Image quality={25} alt={"Avatar_banner"} src={data.banner} fill /> }
                        </div>
                        <div className={styles.bar}></div>
                        <div onClick={() => {setIsExpanded(false)}} className={styles.avatar} >
                        {data?.image && <Image alt={"Avatar"} quality={25} src={data.image} fill /> }
                        </div>
                    </div>
                    <p className={styles.name}>{data.name}</p>
                    <div className={styles.buttons}>

                        <button disabled onClick={() => {router.push("/profile/" + session.data.user.name)}}><Image alt="user_icon" src={"/icons/user_icon.svg"} width={25} height={25} />Profil</button>
                        <button disabled onClick={() => {router.push("/settings")}}><Image alt="settings_icon" src={"/icons/settings_icon.svg"} width={25} height={25} /> Innstillinger </button>
                        <button disabled onClick={() => {router.push("/relationships")}}><Image alt="relationships_icon" src={"/icons/relationships_icon.svg"} width={25} height={25} /> Venner </button>
                        <br style={{marginBlock: 8}} />
                        <button onClick={() => {router.push("/dashboard")}}><Image alt="files_icon" src={"/icons/files_icon.svg"} width={25} height={25} /> Filer</button>
                        <button onClick={() => {router.push("/dashboard/batches")}}><Image alt="batches_icon" src={"/icons/batches_icon.svg"} width={25} height={25} /> Batcher</button>
                        <br style={{marginBlock: 8}} />
                        <button className={styles.signout} onClick={() => {signOut()}}><Image alt="leave_icon" src={"/icons/download_icon.svg"} style={{rotate: "90deg"}} width={25} height={25} />Log Ut</button>

                    </div>

                </div>
            
        </div>
    );

                
    
}
