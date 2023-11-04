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
import { useState, useEffect } from "react";


function BatchList ({batches}) {
    return <>
    {batches.map((batch, i) => {
        
        return (

            <Link key={i} href={"/dashboard/batches/" + batch.id}>
                <div className={styles.batchElement}>
                    <Image src={batch.thumbnail} alt={batch.thumbnail} fill />
                </div>
                <p style={{zIndex: 5, color: "#777", position: "relative"}}>{batch.title} </p>
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
    let sharedBatches = batches; 
    if (session.status === "authenticated") {
        selfBatches = batches.filter((b) => b?.owner === session.data.user.id)
        sharedBatches = batches.filter((b) => b?.owners.includes(session.data.user.id) && b?.owner !== session.data.user.id)
    }

    const [batchPreview, setBatchPreview] = useState(0)

    useEffect(() => {
    
        // console.log(videoRef.current.duration);
        const interval = setInterval(() => {
            console.log("SEX")
            let id = batchPreview + 1
            if (id > batches.length -1) {
                id = 0
            }
            setBatchPreview(id)
        },3000);
        return () => clearInterval(interval);
      }, [batchPreview]);

      

    return (
        <FileSharingLayout pageId={3} batches={batches}>
            <div className="grid">
                {/* <div className="side">
                   {session.status === "authenticated" && <BatchList batches={selfBatches} />}
                   {session.status !== "authenticated" && <p>You need to be logged in to create your own batches.</p>}
                </div> */}
                <div className={`main`}> 

                    <div className="header">
                        <div className="background">
                            {batches.map((b, i) => {
                               return  <Image key={b.id} alt={"Batch header"} fill style={{objectFit: "cover", borderRadius: 8, transitionDuration: "1s", translate: batchPreview != i ? "100% 0": "0%", opacity: batchPreview == i ? 1: 0}} src={b.thumbnail}/>
                            })

                            }
                        </div>
                        <div className="info">
                            <h1>{batches?.[batchPreview].title}</h1>
                            <p>{batches?.[batchPreview].owners.length} participent{batches?.[batchPreview].owners.length == 1 ? "" : "s"}</p>
                        </div>
                    </div>

                    <div className="head">
                        <h3>Dine ({selfBatches.length})</h3>
                    </div>
                    <div className="public">
                        <BatchList batches={selfBatches} />
                    </div>
                    <div className="head">
                        <h3>Delt med deg ({sharedBatches.length})</h3>
                    </div>
                    <div className="public">
                        <BatchList batches={sharedBatches} />
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
                    border: none;
                    border-radius: 0 !important;
                    border-bottom: 1px solid #999;
                    padding: 1rem;
                }
                .grid {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    min-height: 100vh;
                    gap: 1rem;
                    padding: 1rem;
                    {/* position: fixed; */}
                }
                .grid div {
                    background: rgba(255, 255, 255, 0);
                    border-radius: 8px;
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                    position: relative;
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    {/* border: 1px solid rgba(255, 255, 255, 0.3); */}
                    {/* padding: 1rem; */}
                }
                .head {
                        flex-direction: column !important;
                        width: 100%;
                        border-radius: 0px !important;
                }
                .header {
                    height: 250px !important;
                    max-height: 250px !important;
                    width: 100%;
                    padding: 1rem;
                    background: rgba(255, 255, 255, .5)
                }
                .header * {
                    z-index: 2;
                    position: relative;
                }
                .header .background {
                    top: 0;
                    left: 0;
                    z-index: 0;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    overflow: hidden;
                    opacity: 0.5;
                }
                .header .info {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin: 0;
                    translate: -50% -50%;
                    background: transparent;
                    padding: 1rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    text-align: center;
                    box-shadow: none;
                }
                .main {
                    display: flex;
                    width: 100%;
                    grid-area: main;
                    justify-content: flex-start;
                    align-items: flex-start;
                    overflow: scroll;
                    flex-direction: column;
                    gap: 1rem;
                }
                h3 {
                    font-size: 18px;
                    margin: 0;
                    font-weight: 400;
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