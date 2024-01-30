import Image from "next/image"
import styles from "./FileCard.module.css"
import { useEffect, useState } from "react"
import { GetContentTypeFromSource, isSourceContentType } from "@/lib/ExtensionHelper"
import ClipboardWrap from "../ClipBoardWrap/ClipboardWrap"
import { useRouter } from "next/router"
import Link from "next/link"
import axios from "axios"

export default function Filecard ( {
    onDelete = (()=>{}),
    file, 
    onSelect, 
    download=true,
    rating=0,
    owner
} ) {

    const router = useRouter()
    const [image, setImage] = useState()
    const [deleted, setDeleted] = useState(false)

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

    const [showTools, setShowTools] = useState(false)

    if (deleted) {
        return
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrap}>
                    <div className={styles.details} style={showTools
                        ? {background: "var(--midnight)"}
                        : {background: "transparent", scale: 0, pointerEvents: "none"}
                     }>
                        <p className={styles.fileName}>{file.fileName}</p>
                        <ClipboardWrap data={`${process.env.NEXT_PUBLIC_URL}${file.source}`}><button>
                            <Image width={20} height={20} alt="copy_icon" src={"/icons/share_icon.svg"} />
                            Kopier
                            </button></ClipboardWrap>
                        <a href={file.source} download={true} >
                            <Image width={20} height={20} alt="download_icon" src={"/icons/download_icon.svg"} />
                            Last ned
                        </a>
                        <button disabled={deleted} onClick={() => {DeleteFile()}} >Slett</button>
                        <button disabled >Flytt</button>
                        <button disabled >Endre navn</button>

                    </div>
                    <div className={styles.image} onClick={onSelect}>
                        {image && <Image quality={25} alt={file.fileName} src={image} onError={(img) => {setImage(null)}} width={200} height={200} /> }
                        {!image && <p style={{background: "red"}}>{file.fileName}</p> }
                    </div>
                    <div className={styles.tools} onClick={() => {setShowTools(!showTools)}}>
                        <span style={{rotate: showTools ? "45deg" : "0deg", width: showTools ? "25px" : "5px", scale: showTools ? "1" : "1", borderRadius: showTools ?  "8px" : "50%", translate: showTools ? "0% 0%" : "0% 150%"}}></span>
                        <span style={{rotate: showTools ? "135deg" : "0deg", width: showTools ? "25px" : "5px", scale: showTools ? "1" : "1", borderRadius: showTools ? "8px" : "50%", translate: showTools ? "0% 0%" : "0% 0%"}}></span>
                        <span style={{rotate: showTools ? "45deg" : "0deg", width: showTools ? "25px" : "5px", scale: showTools ? "0" : "1", borderRadius: showTools ?  "8px" : "50%", translate: showTools ? "0% 0%" : "0% -150%"}}></span>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </>
    )

    async function DeleteFile() {
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_URL}/api/v1/files/delete?fileId=${file.source.split("fileId=").pop()}`
            )
            setDeleted(true)
            console.log(`API Response:`, response.data)
        } catch (error) {
            console.error("Error occured when deleting, client error.")
            console.error(error)
        }
    }
    
}