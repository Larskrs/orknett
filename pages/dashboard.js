
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
import FileElement from '@/components/FileElement'
import { useState } from 'react';

function FilePage ({files}) {

    const [display, setDisplay] = useState(null)

    const session = useSession({
        required: true
    })

    if (session.status !== "authenticated" && session.status) {
        return;
    }




    return (
        <FileSharingLayout pageId={0}>

            {session.status == "authenticated" && <FileUpload /> }
            <div className={styles.list}>
                {display && <div className={styles.display} onClick={() => {setDisplay(null)}}>

                        <RatioMedia axis='width' canPlay={true} src={display.source} autoPlay={true} />

                    </div> }
                {files.map((file, i) => {



                  return <FileElement key={i} file={file} onSelect={() => {
                    console.log("Uploading file: \n" + file.fileName)
                    setDisplay(file)
                  }}/>

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

    if (!session) {
        ctx.res.end;
        return {props: {}};
    }

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