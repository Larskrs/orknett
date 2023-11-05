import { Badge, VideoPlayer } from "@/components";
import StreamingLayout from "@/layouts/StreamingLayout";
import Image from "next/image";
import styles from "../../styles/Streaming.module.css"

export default function() {

    const thumbnailPoster = "http://aktuelt.tv/api/v1/files?fileId=0bc0ab33-0f26-46af-91e0-d06f8c3b35c2.JPG"
    const logo = "http://aktuelt.tv/api/v1/files?fileId=95104a79-3f79-4671-845e-d1aafca2af60.png"

    return (
        <StreamingLayout >
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <div className={styles.image}>
                        <Image fill style={{objectFit: "cover"}} src={thumbnailPoster} />
                    </div>
                    <div className={styles.blurred}>
                        <Image fill style={{objectFit: "cover"}} src={thumbnailPoster} />
                    </div>

                    {/* DETAILS */}

                    <div className={styles.details}>
                        <div className={styles.logo}>
                            <Image fill style={{objectFit: "contain"}} src={logo} />
                        </div>
                        <div className={styles.tags}>
                            <Badge>16+</Badge>
                            <p>Western</p>
                            <p>Drama</p>
                            <p>Comedy</p>
                        </div>

                        <button className={styles.playShow} >Spill av</button>
                    </div>  
                </div>
            </div>
        </StreamingLayout>
    );
}