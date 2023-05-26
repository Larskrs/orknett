
import FileUpload from '@/components/FileUpload';
import FileSharingLayout from '@/layouts/FileSharingLayout'
import { GetClient } from '@/lib/Supabase';
import Link from 'next/link';


function BatchPage ({batch}) {
    return (
        <FileSharingLayout pageId={2}>
            Filelist
            <FileUpload batchPreset={batch.id} />
            <div>
                {batch.files.map((file, i) => {

                    const fileId = file.source.split('/').pop().split('=').pop();
                    return (
                        <div key={i}>
                            <a download={fileId}  href={file.source}>{fileId}</a>
                        </div>
                        )
                    } ) }
            </div>
        </FileSharingLayout>
    );
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

    return {
        props:{
            batch: data
        }
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
      fallback: false,
    };
  }

export default BatchPage;