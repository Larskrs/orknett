import { GetAuthenticatedClient, GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/FileSharing.module.css'
import { GetCookie } from "@/lib/CookieHelper";
import Image from "next/image";
import { Badge } from "@/components";
import { RatioImage } from "@/components/RatioImage";
import { isSourceContentType } from "@/lib/ExtensionHelper";

function index({batches}) {
    return (
        <FileSharingLayout pageId={2}>
            <div className={styles.wrap}>
                {batches.map((batch, i) => {

                    return (
                        
                        <Link key={i} className={styles.article} href={"/dashboard/batches/" + batch.id}>
                            {batch.thumbnail && <Image className={styles.thumbnail} style={{zIndex: -1}} src={batch.thumbnail} alt={"thumbnail"} objectFit={"cover"} fill /> } 
                            <p style={{zIndex: 2, color: "#ccc"}}>{batch.title} </p>
                            <div style={{position: "absolute", bottom: "1rem", marginRight: "1rem", display: "flex", gap: ".5rem", flexWrap: "wrap"}}>
                            {batch.owners.map((owner, i) => {
                                if (i > 1) return <Badge><span style={{height: 25}}></span>mer...</Badge>
                                return (
                                <Badge key={i}>
                                    <Image className="avatar" src={owner.image} alt={owner.name + "'s avatar"} width={25} height={25}  />
                                    <p style={{fontSize: "16px", maxWidth: "100px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{owner.name}</p>
                                </Badge>
                                )
                                
                                })}
                                
                            </div>
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
        const owners = await GetOwners(batch.owners)
        data[i].owners = owners

        var shuffled = shuffleArray(batch.files)
        var files = shuffled.filter((f) => isSourceContentType(f.source, "image"))
        var file = files[0]

        if (file)
        data[i].thumbnail = file.source
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

async function GetOwners(owners) {
    const data = await Promise.all(owners.map(async (owner) => await GetOwner(owner)))
    return data
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