import styles from "./DisplayElement.module.css"

import { GetContentTypeFromSource, GetExtensionFromSource } from "@/lib/ExtensionHelper";
import Image from "next/image";
import { AudioPlayer, VideoPlayer } from "../..";
import { useEffect, useState } from "react";


function Element ({file, id, onEnded=(() => {})}) {

    const [quality, setQuality] = useState()
    useEffect(() => {
        if (!file.quality) { setQuality(360); return; }
        
        setQuality(file.quality[file.quality.length -1])
    }, [file])

    if (!file) {
        return <p style={{color: "white", zIndex: 9999}}>Whoops, We had an issue displaying this file in the DisplayElement.jsx</p>
    }
    const content = GetContentTypeFromSource(file.source)
    const contentType = content.split("/").shift();

    

    
    if (contentType == "image") {
        return (
                
                <Image
                    className={styles.display_element}
                    fill
                    key={id}
                    alt={file.fileName}
                    src={file.source}
                    priority={true}
                    quality={70}
                    content={GetContentTypeFromSource(file.source)}
                    />
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

        let _source = file.source
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("quality", quality)  
        _source = file.source.replace("quality=360", urlParams.toString())
        console.log(_source) 

        return (
            <div key={id} className={styles.display_element} style={{background: "transparent"}}> 
            <VideoPlayer 
                source={_source}
                qualities={file.quality ? file.quality : [100, 360]}
                />

                {/* <div className={styles.qualityContainer}>
                    {file?.quality?.map((q) =>{
                        return <button
                            key={q} 
                            onClick={() => setQuality(q)}
                            style={{outline: q == quality ? "1px solid white" : "unset"}}>{q}</button>
                    })}
                </div> */}
                </div>
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

export default function DisplayElement ({file, id, onClose=(() => {}), onEnded=(() => {})}) {

    return (
        <div className={styles.wrap}>
            <Element file={file} id={id} onEnded={onEnded} />
            <button className={styles.close} onClick={() => onClose()}><Image src={"/icons/close_icon.svg"} height={32} width={32} /></button>
        </div>
    )
}