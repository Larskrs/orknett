    
import FileSharingLayout from '@/layouts/FileSharingLayout';
import FileUpload from '@/components/FileUpload'
import LoginButton from '@/components/LoginButton'

import { useSession } from 'next-auth/react';
import { RatioMedia } from '@/components/RatioMedia';

import { GetClient } from "@/lib/Supabase";
import { GetContentTagFromSource, GetContentType, GetContentTypeFromSource, GetExtensionFromSource } from '@/lib/ExtensionHelper';
import { Image } from "next/image" 

export default function Secret({upload}) {
    
    const session = useSession({
        required: false,
    })

    return (


        <FileSharingLayout pageId={0}>

                <source
                    src={upload.source}
                    type={GetContentType(GetExtensionFromSource(upload.source))}
                >
                </source> 

           
        </FileSharingLayout>
    );
}

export async function getServerSideProps(ctx){

    const { data, error } = await GetClient().from("random_files")
    .select('*')
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .limit(1)
    .single()
    

    console.log({data, error})
    

    return {
        props:{
            upload: data,
            error: error
        }
    }
}




    