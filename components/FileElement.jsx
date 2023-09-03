import styles from '@/styles/FileSharing.module.css'
import { RatioMedia } from './RatioMedia';
import Link from 'next/link';


export default function FileElement ({file, onSelect}) {

        const fileId = file.source.split('/').pop().split('=').pop();
                    const creationDate = new Date(file.created_at);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                    return (
                        <div className={styles.download} onClick={onSelect}>


                            
                            <div style={{pointerEvents: `none`, width: "100%", height: "100%"}}>
                                <RatioMedia alt={file.fileName} objectFit src={file.source} />
                            </div>
                            <div className={styles.download_detail}>
                                <a>{file.fileName}</a>
                                <div className={styles.links}>
                                    <a href={file.source} className={styles.downloadLink} download={file.source}>Download</a>
                                    <p onClick={() => {navigator.clipboard.writeText(document.domain +  file.source)}} className={styles.downloadLink} >Copy Link</p>
                                </div>
                                <a>{creationDate.toLocaleDateString("en-EN")}</a>
                            </div>
                        </div>
                        )
        
    
}