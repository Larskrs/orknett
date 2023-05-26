import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";

function index({batches}) {
    return (
        <FileSharingLayout pageId={2}>
            <div>
                {batches.map((batch, i) => {
                    return (
                        <Link key={i} href={"/batches/" + batch.id}>{batch.title}</Link>
                    )
                })}
            </div>
        </FileSharingLayout>
    );
}

export async function getServerSideProps(ctx){

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