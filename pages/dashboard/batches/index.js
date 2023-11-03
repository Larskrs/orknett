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
import { useSession } from "next-auth/react";


function BatchList ({batches}) {
    return <>
    {batches.map((batch, i) => {
        
        return (

            <Link key={i} href={"/dashboard/batches/" + batch.id}>
                <div  className={styles.article}>
                    <Image className={styles.thumbnail} src={batch.thumbnail} alt={batch.thumbnail} fill />
                </div>
                <p style={{zIndex: 5, color: "#ccc", position: "relative"}}>{batch.title} </p>
            </Link>

            // <Badge style={{cursor: "pointer", overflow: "hidden"}} key={batch.id} onClick={() => router.push("/dashboard/batches/" + batch.id)}>
            //     <ColorImage style={{zIndex: 0}} source={batch.thumbnail} />
            //     <h1 style={{zIndex: 1}}>{GetShortHandle(batch.title).combined}</h1>
            // </Badge>
        )
    })}
    </>
}

function BatchesPage ({batches}) {

    const router = useRouter()
    const session = useSession()

    let selfBatches = []
    let publicBatches = batches; 
    if (session.status === "authenticated") {
        selfBatches = batches.filter((b) => b?.owners?.includes(session.data.user.id))
        publicBatches = batches.filter((b) => !b?.owners?.includes(session.data.user.id) && b.data?.access !== "private")
    }

    return (
        <FileSharingLayout pageId={3} batches={batches}>
            <div className="grid">
                <div className="side">
                   {session.status === "authenticated" && <BatchList batches={selfBatches} />}
                   {session.status !== "authenticated" && <p>You need to be logged in to create your own batches.</p>}
                </div>
                <div className={`${styles.wrap} main`}> 

                    <div className="head">
                        <h2>Offentlige</h2>
                        <hr />
                    </div>
                    <div className="public">
                        <BatchList batches={publicBatches} />
                    </div>
                </div>


            </div>

            <style jsx>{`
                .public {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 2rem;
                    padding: 0 !important;
                    border: none !important;
                }
                .grid {
                    display: grid;
                    width: 100%;
                    height: 100%;
                    min-height: 100vh;
                    grid-template-columns: 500px 1fr;
                    grid-template-rows: 200px 1fr;
                    grid-template-areas: 
                        "side main"
                        "side main";
                    gap: 1rem;
                    padding: 1rem;
                    {/* position: fixed; */}
                }
                .grid div {
                    background: rgba(255, 255, 255, 0);
                    border-radius: 16px;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 1rem;
                }
                .side {
                    grid-area: side;
                }
                .main {
                    display: flex;
                    width: 100%;
                    grid-area: main;
                    justify-content: flex-start;
                    align-items: flex-start;
                    overflow: scroll;
                    flex-direction: column;
                }
                .head {
                    background: rgba(255,255,255,0.1) !important;
                    border: none !important;
                    flex-direction: column !important;
                    width: 100%;
                }

                @media screen and (max-height: 600px) {
                    
                }
                @media screen and (max-width: 1100px) {
                    .grid {
                        grid-template-columns: 300px 1fr;
                        grid-template-rows: 1fr 1fr;
                        grid-template-areas: 
                            "side main"
                            "side main";
                    } 
                }
                @media screen and (max-width: 700px) {
                    .grid {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto 1fr;
                        grid-template-areas: 
                            "side side"
                            "main main";
                    } 
                    .main, .side div {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                    }
                    .main div {
                        width: 100%;
                    }
                }
            `}</style>
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
            if (isSourceContentType(file.source, "image")) { thumbnail = file.source ; break; }
            if (isSourceContentType(file.source, "audio")) { thumbnail = `/api/v1/files/audio/cover?fileId=${file.source.split("fileId=").pop()}` ; break; }
            if (isSourceContentType(file.source, "video")) { thumbnail = `/api/v1/files/videos/thumbnail?fileId=${file.source.split("fileId=").pop()}` ; break; }
            thumbnail = ""
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