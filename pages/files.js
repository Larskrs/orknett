
import FileUpload from '@/components/FileUpload';
import FileSharingLayout from '@/layouts/FileSharingLayout'
import { GetClient } from '@/lib/Supabase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '@/styles/FileSharing.module.css'
import { GetContentType, GetContentTypeFromSource, GetExtensionFromSource } from '@/lib/ExtensionHelper';
import { RatioImage } from '@/components/RatioImage';
import Image from 'next/image';
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]';
import { RatioMedia } from '@/components/RatioMedia';

function FilePage ({files}) {

    const session = useSession()



    return (
        <FileSharingLayout pageId={2}>

            {session.status == "authenticated" && <FileUpload /> }
            <div className={styles.list}>
                {files.map((file, i) => {

                    const fileId = file.source.split('/').pop().split('=').pop();
                    return (
                        <div className={styles.download} key={i}>
                            <RatioMedia src={file.source} />
                            <a download={fileId} href={file.source} className={styles.downloadLink}>Download</a>
                            <a href={file.source} >{fileId}</a>
                        </div>
                        )
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

export async function getServerSideProps(ctx){

    const session = await getServerSession(
        ctx.req,
        ctx.res,
        authOptions,
    )
    const userId = session.user.id
    
    const { data, error } = await GetClient()
    .from("files")
    .select(`
        *
    `)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .eq("user", userId)
    .order("created_at", {ascending: false})

    return {
        props:{
            files: data
        },
    }
}


export default FilePage;