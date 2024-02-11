    
import FileSharingLayout from '@/layouts/FileSharingLayout';
import FileUpload from '@/components/FileUpload'
import LoginButton from '@/components/LoginButton'

import { useSession } from 'next-auth/react';
import { RatioMedia } from '@/components/RatioMedia';

import { GetClient } from "@/lib/Supabase";
import { GetContentTagFromSource, GetContentType, GetContentTypeFromSource, GetExtensionFromSource } from '@/lib/ExtensionHelper';
import { Image } from "next/image" 
import Link from 'next/link';
import { DisplayElement } from '@/components';
import FileElement from '@/components/FileElement';

export default function Secret({upload}) {
    
    const session = useSession({
        required: false,
    })

    return (

        <FileSharingLayout pageId={0}>

            {upload.map((file) => {
                return <FileElement key={file.id} file={file} />
            })}

           
        </FileSharingLayout>
    );
}

export async function getServerSideProps(ctx){

    const search = ctx.query.s

    const { data, error } = await GetClient().from("files")
    .select('*')
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .textSearch("fileName", search)

    console.log({data, error})
    

    return {
        props:{
            upload: data,
            error: error
        }
    }
}




    