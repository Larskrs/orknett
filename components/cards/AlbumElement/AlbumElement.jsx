import styles from './AlbumElement.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { GetContentTypeFromSource, isSourceContentType } from '@/lib/ExtensionHelper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getContentIconSource } from '@/lib/FileHelper';


export default function AlbumElement ({file, onSelect, download=true, rating=0}) {


        const [image, setImage] = useState()

        useEffect(() => {
            
            if (isSourceContentType(file.source, "audio")) {
                setImage(`/api/v1/files/audio/cover?fileId=${file.source.split("fileId=").pop()}`)
            }

        })

        const fileId = file.source.split('/').pop().split('=').pop();
                    const creationDate = new Date(file.created_at);
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const contentType = GetContentTypeFromSource(file.source)
                    const type = contentType.split('/')[0];

                    return (
                        <div className={styles.element}>
                            <div className={styles.info} onClick={() => onSelect()}>
                                <Image alt={file.fileName} height={75} width={75} src={image} /> 
                                <a>{file.fileName}</a>
                            </div>
                        </div>
                        )
        
    
}