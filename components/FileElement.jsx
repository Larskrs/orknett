import styles from '@/styles/FileSharing.module.css'
import { RatioMedia } from './RatioMedia';



export default function({file}) {

        const fileId = file.source.split('/').pop().split('=').pop();
                    const creationDate = new Date(file.created_at);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                    return (
                        <div className={styles.download} key={file.id}>
                            <RatioMedia objectFit src={file.source} />
                            <div className={styles.download_detail}>
                                <a>{file.fileName}</a>
                                <div className={styles.links}>
                                    <a download={fileId} href={file.source} className={styles.downloadLink}>Download</a>
                                    <a href={file.source} className={styles.downloadLink} >View</a>
                                </div>
                                <a>{creationDate.toLocaleDateString("en-EN")}</a>
                            </div>
                        </div>
                        )
        
    
}