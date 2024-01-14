import styles from '@/styles/FileSharing.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { AudioPlayer, Badge, Stars } from '.';
import { GetContentTypeFromSource, isSourceContentType } from '@/lib/ExtensionHelper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getContentIconSource } from '@/lib/FileHelper';


export default function FileElement ({file, onSelect, download=true, rating=0, owner}) {

        const [image, setImage] = useState()

        useEffect(() => {
            
            if (isSourceContentType(file.source, "audio")) {
                setImage(`/api/v1/files/audio/cover?fileId=${file.source.split("fileId=").pop()}`)
            }

        }, [image])

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
                                <Image alt={file.fileName} width={10} height={10} style={{objectFit: "cover"}} src={image} />
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
                                    <Link style={{borderColor: "white"}} href={file.source} target="_blank" onClick={() => {navigator.clipboard.writeText(document.domain +  file.source)}} className={styles.downloadLink} ><Image  alt="Share_ICON"  src={"/icons/share_icon.svg"} height={16} width={16} /></Link>
                                </div>
                                {rating > 0 && <Stars max={5} rating={rating} ><span> your rating</span></Stars>}

                                {/* <a>{creationDate.toLocaleDateString("en-EN")}</a> */}
                            </div>
                        </div>
                        )
        
    
}