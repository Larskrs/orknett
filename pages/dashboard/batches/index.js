import { GetAuthenticatedClient, GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/FileSharing.module.css'
import { GetCookie } from "@/lib/CookieHelper";
import Image from "next/image";
import { Badge, ColorImage } from "@/components";
import { RatioImage } from "@/components/RatioImage";
import { contentTypeList, isSourceContentType } from "@/lib/ExtensionHelper";
import { GetShortHandle } from "@/lib/ShorthandHelper";
import { useRouter } from "next/router";

function BatchesPage ({batches}) {

    const router = useRouter()

    return (
        <FileSharingLayout pageId={3} batches={batches}>
            <div className={styles.wrap}>
                {batches.map((batch, i) => {

                    return (
                        
                        <Link key={i} className={styles.article} href={"/dashboard/batches/" + batch.id}>
                        <Image className={styles.thumbnail} src={batch.thumbnail} alt={batch.thumbnail} fill />
                            <p style={{zIndex: 5, color: "#ccc", position: "relative"}}>{batch.title} </p>
                        </Link>

                        // <Badge style={{cursor: "pointer", overflow: "hidden"}} key={batch.id} onClick={() => router.push("/dashboard/batches/" + batch.id)}>
                        //     <ColorImage style={{zIndex: 0}} source={batch.thumbnail} />
                        //     <h1 style={{zIndex: 1}}>{GetShortHandle(batch.title).combined}</h1>
                        // </Badge>
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
    .select(`
        *,
        files (*)
    `)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .order("created_at", {ascending: false, foreignTable: "files"})
    // .filter('files.source', 'in', ['png','jpg'])
    .limit(15, { foreignTable: "files"})

    for (const i in data) {
        const batch = data[i]

        let thumbnail = ""
        for (const f in batch.files) {
            const file = batch.files[f]
            if (!isSourceContentType(file.source, "image")) { continue; }
            thumbnail = file.source
            break

        }

        if (thumbnail !== "")
        data[i].thumbnail = thumbnail
    }

    return {
        props:{
            batches: data,
        }
    }

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array
  }
export default BatchesPage;