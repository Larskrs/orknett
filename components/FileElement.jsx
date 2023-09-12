import styles from '@/styles/FileSharing.module.css'
import { RatioMedia } from './RatioMedia';
import Link from 'next/link';
import Image from 'next/image';
import { Badge, Stars } from '.';
import { GetContentTypeFromSource } from '@/lib/ExtensionHelper';


export default function FileElement ({file, onSelect}) {

        const fileId = file.source.split('/').pop().split('=').pop();
                    const creationDate = new Date(file.created_at);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const contentType = GetContentTypeFromSource(file.source)
                    const type = contentType.split('/')[0];

                    return (
                        <div className={styles.download} onClick={onSelect}>


                            
                            <div style={{pointerEvents: `none`, width: "100%", height: "100%"}}>
                                
                                {type == "video" && <RatioMedia alt={file.fileName} objectFit src={"/video.svg"} /> }
                                {type == "audio" && <RatioMedia alt={file.fileName} objectFit src={"/audio.svg"} /> }
                                {type == "image" && <RatioMedia alt={file.fileName} quality={1} objectFit src={file.source} /> }
                            </div>
                            <div className={styles.download_detail}>
                                <a>{file.fileName}</a>
                                <div className={styles.links}>
                                    <a href={file.source} className={styles.downloadLink} download={file.source}>Download</a>
                                    <p onClick={() => {navigator.clipboard.writeText(document.domain +  file.source)}} className={styles.downloadLink} >Copy Link</p>
                                </div>
                                <Stars max={5} rating={3} ><span> your rating</span></Stars>

                                {/* <a>{creationDate.toLocaleDateString("en-EN")}</a> */}
                            </div>
                        </div>
                        )
        
    
}