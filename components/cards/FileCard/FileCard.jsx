import Image from "next/image"
import styles from "./FileCard.module.css"
import { useEffect, useState } from "react"
import { GetContentTypeFromSource, isSourceContentType } from "@/lib/ExtensionHelper"

export default function Filecard ( {
    onDelete = (()=>{}),
    file, 
    onSelect, 
    download=true,
    rating=0,
    owner
} ) {

    const [imageLoaded, setImageLoaded] = useState(false)
    const [image, setImage] = useState()

    const baseUrl = (process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
        ? "http://aktuelt.tv"
        : "http://localhost"
    )

    useEffect(() => {

        const urlParams = new URLSearchParams(file.source)
        const fileName  = urlParams.get("fileId")
        
        if (isSourceContentType(file.source, "audio")) {
            setImage(`/api/v1/files/audio/cover?fileId=${file.source.split("fileId=").pop()}`)
        }  else if (isSourceContentType(file.source, "video")) {
            setImage(`/api/v1/files/videos/thumbnail?fileId=${
                fileName
            }`)
        } else if (isSourceContentType(file.source, "image")) {
            setImage(file.source)
        } else {
            setImage(null)
        }

    }, [image])



    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrap}>
                    <div className={styles.image} onClick={onSelect}>
                        {image && <Image quality={25} alt={file.fileName} src={image} onLoadingComplete={(img) => console.log(img.naturalWidth)} onError={(img) => {setImage(null)}} width={200} height={200} /> }
                        {!image && <p style={{background: "red"}}>{file.fileName}</p> }
                    </div>
                    <Tools />
                </div>

                <div>

                </div>
            </div>
        </>
    )

    function Tools () {


        const [showTools, setShowTools] = useState(false)

        return (
        <div className={styles.tools} onClick={() => {setShowTools(!showTools)}}>
            <span style={{rotate: showTools ? "45deg" : "0deg", width: showTools ? "25px" : "5px", scale: showTools ? "1" : "1", borderRadius: showTools ?  "8px" : "50%", translate: showTools ? "0% 0%" : "0% 150%"}}></span>
            <span style={{rotate: showTools ? "135deg" : "0deg", width: showTools ? "25px" : "5px", scale: showTools ? "1" : "1", borderRadius: showTools ? "8px" : "50%", translate: showTools ? "0% 0%" : "0% 0%"}}></span>
            <span style={{rotate: showTools ? "45deg" : "0deg", width: showTools ? "25px" : "5px", scale: showTools ? "0" : "1", borderRadius: showTools ?  "8px" : "50%", translate: showTools ? "0% 0%" : "0% -150%"}}></span>
        </div>
        )
    }
    
}