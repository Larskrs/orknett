import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/FileSharing.module.css'


function index({batches}) {
    return (
        <FileSharingLayout pageId={2}>
            <div className={styles.list}>
                {batches.map((batch, i) => {
                    return (
                        
                        <Link key={i} href={"/batches/" + batch.id}>
                            <p className={styles.downloadLink}>{batch.title}</p>
                        </Link>
                    )
                })}
            </div>
        </FileSharingLayout>
    );
}

export async function getServerSideProps(ctx){

    const { req, res} = ctx

    let { data, error } = await GetClient("public")
    .from("batches")
    .select("*")
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)

    return {
        props:{
            batches: data,
        }
    }
}

export default index;