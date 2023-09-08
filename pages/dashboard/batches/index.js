import { GetAuthenticatedClient, GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/FileSharing.module.css'
import { GetCookie } from "@/lib/CookieHelper";
import Image from "next/image";
import { Badge } from "@/components";
import { RatioImage } from "@/components/RatioImage";

function index({batches}) {
    return (
        <FileSharingLayout pageId={2}>
            <div className={styles.wrap}>
                {batches.map((batch, i) => {
                    return (
                        
                        <Link key={i} className={styles.article} href={"/dashboard/batches/" + batch.id}>
                            <p >{batch.title}</p>
                            <div style={{display: "flex", gap: 8, padding: 8}}>
                                {shuffleArray(batch.files).map((file, i) => {
                                    if (i > 2) { return}
                                    return <Image key={file.id} src={file.source} style={{borderRadius: 8}} width={50} height={50} />
                                })}
                            </div>
                            <Badge style={{position: "absolute", bottom: "1rem", marginRight: "1rem"}}>
                                <Image className="avatar" src={batch.owner.image} alt={batch.owner.name + "'s avatar"} width={25} height={25}  />
                                <p style={{fontSize: "16px", maxWidth: "100px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{batch.owner.name}</p>
                            </Badge>
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
    .select(`
        *,
        files (*)
    `)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)

    for (const i in data) {
        const batch = data[i]
        const owner = await GetOwner(batch.owner)
        data[i].owner = owner
    }

    return {
        props:{
            batches: data,
        }
    }


async function GetOwner(owner) {
    const url = process.env.NEXTAUTH_URL + "/api/v1/users/" + owner
    // const accessTokenSecret = GetCookie( req.headers.cookie, "next-auth.session-token" )
    
    const request = await fetch(url, {
        // headers: { Cookie: "next-auth.session-token=" + accessTokenSecret}
    })
    const json = await request.json()
    return json
}
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array
  }
export default index;