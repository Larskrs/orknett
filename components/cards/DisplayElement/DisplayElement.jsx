import styles from "./DisplayElement.module.css"

import { GetContentTypeFromSource, GetExtensionFromSource } from "@/lib/ExtensionHelper";
import Image from "next/image";
import { AudioPlayer } from "../..";


function Element ({file, id, onEnded=(() => {})}) {

    if (!file) {
        return <p style={{color: "white", zIndex: 9999}}>Whoops, We had an issue displaying this file in the DisplayElement.jsx</p>
    }
    const content = GetContentTypeFromSource(file.source)
    const contentType = content.split("/").shift();

    
    if (contentType == "image") {
        return (
            <div className={styles.display_element}>
                
                <Image
                style={{width: "100%", height: "100%"}}
                    quality={50}
                    width={1000}
                    height={1000}
                    className={styles.display_element}
                    priority={true}
                    fetchPriority
                    key={id}
                    alt={file.fileName}
                    src={file.source}
                    content={GetContentTypeFromSource(file.source)}
                    />
            </div>
        )
    }
    if (contentType == "audio") {

        return (
            <div className={styles.display_element} style={{
                display: "initial",
                height: "fit-content",
            }} key={id}>
                <AudioPlayer alt={file.fileName}
                src={file.source}
                defaultTitle={file.fileName.split('.').slice(0, -1).join('.')}
                onCompleted={() => {
                    onEnded()
                }} 
                cover={`/api/v1/files/audio/cover?fileId=${file.source.split("fileId=").pop()}`} />
            </div>
        )
    }
    if (contentType == "video") {
        return (
            <video 
                key={id}
                className={styles.display_element}
                alt={file.fileName}
                src={file.source}
                content={GetContentTypeFromSource(file.source)} 
                controls
                autoPlay
                onEnded={() => onEnded()}
                    
            />
        )
    }
    else {
        return (
            <div className={styles.display_unknown_element} key={id}>
                <h2>.{GetExtensionFromSource(file.source)}</h2>
                <h3>{file.fileName}</h3>
            </div>
        )
    }
    

}

export default function DisplayElement ({file, id, onEnded=(() => {})}) {
    return (
        <div className={styles.wrap}>
            <Element file={file} id={id} onEnded={onEnded} />
        </div>
    )
}