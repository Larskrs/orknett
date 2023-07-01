
import FileUpload from '@/components/FileUpload';
import FileSharingLayout from '@/layouts/FileSharingLayout'
import { GetClient } from '@/lib/Supabase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '@/styles/FileSharing.module.css'
import { GetContentType, GetContentTypeFromSource, GetExtensionFromSource } from '@/lib/ExtensionHelper';
import { RatioImage } from '@/components/RatioImage';
import Image from 'next/image';
import { RatioMedia } from '@/components/RatioMedia';
import FileElement from '@/components/FileElement';
import { useState } from 'react';

function BatchPage ({batch}) {

    const session = useSession()

    const [display, setDisplay] = useState(null)

    return (
        <FileSharingLayout pageId={2}>
            <h2>{batch.title}</h2>
            <p>Owner of batch: {batch.owner.name}</p>
            {session.status == "authenticated" && session.data.user.id == batch.owner && <FileUpload batchPreset={batch.id} /> }
            <div className={styles.list}>

            {display && <div className={styles.display} onClick={() => {setDisplay(null)}}>

                <source src={file.source} content={GetContentTypeFromSource(file.source)} />

            </div> }

                {batch.files.map((file, i) => {

                        return <FileElement key={i} file={file} />                    

                    } ) }
            </div>
        </FileSharingLayout>
    );
}

function mediaPreview(source) {

    const content = GetContentTypeFromSource(source).split("/").shift()
    
    if (content == "image") {
        return <div className={styles.image}>
            <Image width={100} objectFit={'cover'} height={100} src={source} />
        </div>
    }
}

export async function getStaticProps({ params }){

    
    const batchId = params.id
    const { data, error } = await GetClient()
    .from("batches")
    .select(`
        *,
        files (*)
    `)
    .eq("id", batchId)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .single()

    console.log({data, error})

    return {
        props:{
            batch: data
        },
        revalidate: 5, // In seconds
    }
}

export async function getStaticPaths() {
    const { data, error } = await GetClient("public")
    .from("batches")
    .select("id")
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)

    const paths = data.map( (batch, i) => {return {params: {id: batch.id } } } )
    console.log({data, paths})
    return {
      paths,
      fallback: 'blocking',
    };
  }

export default BatchPage;