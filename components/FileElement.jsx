import styles from '@/styles/FileSharing.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { AudioPlayer, Badge, ClipboardWrap, Filecard, Stars } from '.';
import { GetContentTypeFromSource, isSourceContentType } from '@/lib/ExtensionHelper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getContentIconSource } from '@/lib/FileHelper';
import axios from 'axios';


export default function FileElement ({file, onSelect, download=true, rating=0, owner}) {

    
    const [image, setImage] = useState()
    
    const baseUrl = (process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    ? "http://aktuelt.tv"
    : "http://localhost"
    )
    
    useEffect(() => {
        
        if (isSourceContentType(file.source, "audio")) {
            setImage(`/api/v1/files/audio/cover?fileId=${file.source.split("fileId=").pop()}`)
        }
        
    }, [image])
    return <Filecard file={file} onSelect={onSelect} download={download} />

                    const creationDate = new Date(file.created_at);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const contentType = GetContentTypeFromSource(file.source)
                    const type = contentType.split('/')[0];

                    return (

                        <div className={styles.download}>
                            
                            <div onClick={onSelect} style={{width: "100%", height: "100%"}}>
                                {owner && <Image src={owner.image} alt='OWNER_AVATAR' width={16} height={16} style={{borderRadius: "50%", bottom: 16, right: 16, position: "absolute", zIndex: 10}} />}
                                {type == "video" && <div>
                                <Image alt={file.fileName} fill style={{objectFit: "cover"}} src={`/api/v1/files/videos/thumbnail?fileId=${file.id}.webm`} />
                                <div style={{width: 50, height: 50, position: "absolute", left: 8, top: 8, background: "rgba(0,0,0,.25)", borderRadius: "50%"}}><Image alt={file.fileName} fill src={"/video.svg"} /></div> 
                                    </div> }
                                {/* {type == "audio" && <Image alt={file.fileName} fill src={"/audio.svg"} /> } */}
                                {type == "audio" && <>
                                    
                                <div>
                                {/* <Image alt={file.fileName} width={10} height={10} style={{objectFit: "cover"}} src={image} /> */}
                                <div style={{width: 50, height: 50, position: "absolute", left: 8, top: 8, background: "rgba(0,0,0,.25)", borderRadius: "50%"}}><Image alt={file.fileName} fill src={"/audio.svg"} /></div> 
                                    </div>
                                    
                                </> }
                                {type == "image" && <Image alt={file.fileName} quality={1} style={{objectFit: "contain"}} sizes={[]} fill src={file.source} onError={(e) => {
                                    setImage(getContentIconSource(GetContentTypeFromSource().split("/")[0]))
                                }} /> }

                                {type == "application" && <Badge style={{with: "100%", minHeight: "100%", textAlign: "center"}}><h2>{file.source.split(".").pop()}</h2></Badge>}
                            </div>
                            <div className={styles.download_detail}>
                                <a>{file.fileName}</a>
                                <div className={styles.links}>
                                    {download && <a style={{borderColor: "white"}} href={file.source} className={styles.downloadLink} download><Image src={"/icons/download_icon.svg"}  alt="Download_ICON"  height={16} width={16} /></a>}
                                    <ClipboardWrap data={baseUrl + file.source}>
                                        <p style={{borderColor: "white"}} href={file.source} target="_blank" className={styles.downloadLink} ><Image  alt="Share_ICON"  src={"/icons/share_icon.svg"} height={16} width={16} /></p>
                                    </ClipboardWrap>
                                    <button className={styles.delete} onClick={() => {DeleteFile()}}><Image alt="Share_ICON"  src={"/icons/delete_icon.svg"} height={16} width={16} /></button>
                                </div>
                                {rating  > 0 && <Stars max={5} rating={rating} ><span> your rating</span></Stars>}

                                {/* <a>{creationDate.toLocaleDateString("en-EN")}</a> */}
                            </div>
                        </div>
                        )
        
            async function DeleteFile() {
                try {
                    const response = await axios.delete(
                        `${process.env.NEXT_PUBLIC_URL}/api/v1/files/delete?fileId=${file.source.split("fileId=").pop()}`
                    )
                    console.log(`API Response:`, response.data)
                } catch (error) {
                    console.error("Error occured when deleting, client error.")
                    console.error(error)
                }
            }
    
}