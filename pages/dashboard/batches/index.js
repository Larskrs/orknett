import { GetAuthenticatedClient, GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/Batches.module.css'
import { GetCookie } from "@/lib/CookieHelper";
import Image from "next/image";
import { Badge, ColorImage, CreateBatch } from "@/components";
import { RatioImage } from "@/components/RatioImage";
import { contentTypeList, isSourceContentType } from "@/lib/ExtensionHelper";
import { GetShortHandle } from "@/lib/ShorthandHelper";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


function BatchList ({batches}) {
    return <>
    {batches.map((batch, i) => {
        
        return (

            <Link className={styles.article} key={i} href={"/dashboard/batches/" + batch.id}>
                <div className={styles.thumbnail}>
                    <Image src={batch.thumbnail} alt={batch.thumbnail} fill />
                </div>
                <div className={styles.info}>
                    <p className={styles.title}>{batch.title} </p>
                    <p>{batch.owners.length} medlem{batch.owners.length > 1 ? "mer" : ""}</p>
                    <p>{batch.files.length} fil{batch.files.length > 1 ? "er" : ""}</p>
                </div>
            </Link>

            // <Badge style={{cursor: "pointer", overflow: "hidden"}} key={batch.id} onClick={() => router.push("/dashboard/batches/" + batch.id)}>
            //     <ColorImage style={{zIndex: 0}} source={batch.thumbnail} />
            //     <h1 style={{zIndex: 1}}>{GetShortHandle(batch.title).combined}</h1>
            // </Badge>
        )
    })}
    </>
}


function BatchTable ({batches, onBatchClick=() => {}}) {
    return <table className={styles.table}>
        <tbody>
        <tr>
            <th>Batch Name</th>
            <th>Last edited</th>
            <th>Members</th>
        </tr>

    {batches.map((batch, i) => {
        
        return (

            
            <tr key={batch.id} className={styles.batchRow} onClick={() => onBatchClick(batch, i)}>
                    <td className={styles.title}>{batch.title} </td>
                    <td>{batch.owners.length} medlem{batch.owners.length > 1 ? "mer" : ""}</td>
                    <td>{batch.files.length} fil{batch.files.length > 1 ? "er" : ""}</td>
            </tr>

            // <Badge style={{cursor: "pointer", overflow: "hidden"}} key={batch.id} onClick={() => router.push("/dashboard/batches/" + batch.id)}>
            //     <ColorImage style={{zIndex: 0}} source={batch.thumbnail} />
            //     <h1 style={{zIndex: 1}}>{GetShortHandle(batch.title).combined}</h1>
            // </Badge>
        )
    })}
    </tbody>
    </table>
}

function BatchesPage ({batches, thumbnailBatches}) {

    const router = useRouter()
    const session = useSession()

    const [batchTab, setBatchTab] = useState(0)

    let selfBatches = []
    let sharedBatches = batches; 
    if (session.status === "authenticated") {
        selfBatches = batches.filter((b) => b?.owner === session.data.user.id)
        sharedBatches = batches.filter((b) => b?.owners.includes(session.data.user.id) && b?.owner !== session.data.user.id)
    }

    const [batchPreview, setBatchPreview] = useState(0)

    function nextBatchPreview () {
        let id = batchPreview + 1
        if (id > thumbnailBatches.length -1) {
            id = 0
        }
        setBatchPreview(id)
    }

    useEffect(() => {
    
        // console.log(videoRef.current.duration);
        const interval = setInterval(() => {
            console.log("SEX")
            nextBatchPreview()
        },3 * 1000);
        return () => clearInterval(interval);
      }, [batchPreview,nextBatchPreview]);


    if (session.status !== "authenticated") { 
        return (
            <FileSharingLayout pageId={3} batches={batches}>
                <h1>Seger</h1>
            </FileSharingLayout>
        )    
    }

    return (
        
        <FileSharingLayout pageId={3} batches={batches}>
            <div className={styles.grid}>
                {/* <div className="side">
                   {session.status === "authenticated" && <BatchList batches={selfBatches} />}
                   {session.status !== "authenticated" && <p>You need to be logged in to create your own batches.</p>}
                </div> */}


                <div className={styles.main}> 

                    <div className={styles.header}>
                        
                        <div className={styles.background}>
                            {thumbnailBatches.map((b, i) => {
                               return  <Image key={b.id} alt={"Batch header"} fill style={{objectFit: "cover", borderRadius: 8, transitionDuration: "1s", translate: batchPreview != i ? "100% 0": "0%", opacity: batchPreview == i ? 1: 0}} src={b.thumbnail}/>
                            })

                            }
                        </div>

                        
                        
                        <Link className={styles.info} href={"/dashboard/batches/" + thumbnailBatches[batchPreview].id}>
                            <div className={styles.previewItem}>
                                <div>
                                {thumbnailBatches.map((b, i) => {
                                    return     <Image key={b.id} alt={"Batch header"} fill style={{objectFit: "cover", borderRadius: 8, transitionDuration: "1s", translate: batchPreview != i ? "-100% 0": "0%", scale: batchPreview != i ? "0": "1", opacity: batchPreview == i ? 1: 0}} src={b.thumbnail}/>
                                })}
                                </div>
                                <div className={styles.blurred}>
                                {thumbnailBatches.map((b, i) => {
                                    return     <Image key={b.id} quality={1} alt={"Batch header"} fill style={{objectFit: "cover", borderRadius: 8, transitionDuration: "1s", translate: batchPreview != i ? "-100% 0": "0%", scale: batchPreview != i ? "0": "1", opacity: batchPreview == i ? 1: 0}} src={b.thumbnail}/>
                                   
                                })}
                                </div>
                            </div>
                            <div className={styles.details}>
                                <h1>{thumbnailBatches?.[batchPreview].title}</h1>
                                <p>{thumbnailBatches?.[batchPreview].owners.length} medlem{thumbnailBatches?.[batchPreview].owners.length == 1 ? "" : "mer"}</p>
                                <p>{thumbnailBatches?.[batchPreview].files.length} fil{thumbnailBatches?.[batchPreview].files.length == 1 ? "" : "er"}</p>
                            </div>
                        </Link>
                    </div>


                    <div className={styles.tabWrap}>
                        <button style={{borderBottomColor: batchTab == 0 ? "#444" : "transparent"}} onClick={() => {setBatchTab(0)}}> Your Batches </button>
                        <button style={{borderBottomColor: batchTab == 1 ? "#444" : "transparent"}} onClick={() => {setBatchTab(1)}}> Shared with you </button>
                    </div>
                    <div className={styles.public}>
                        {batchTab === 0 && <>
                            <CreateBatch session={session}>
                                <button className="button">Create Batch</button>
                            </CreateBatch>
                            <BatchTable batches={selfBatches} onBatchClick={(batch, i) => {router.push("/dashboard/batches/" + batch.id)}} />
                            
                        </> }
                        {batchTab === 1 && <BatchTable batches={sharedBatches} onBatchClick={(batch, i) => {router.push("/dashboard/batches/" + batch.id)}} /> }
                    </div>

                </div>


            </div>

            <style jsx>{`
                
            `}</style>
        </FileSharingLayout>
    );
}

export async function getServerSideProps(ctx){

    const { req, res} = ctx
    const session = await getServerSession(req, res, authOptions)
    let userId = ""
    if (session != null) {
        userId = session.user.id
    }


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
        }

        if (thumbnail !== "")
        data[i].thumbnail = thumbnail
    }

    const thumbnailBatches = data.filter((b) => b.thumbnail !== undefined)
    console.log(thumbnailBatches.map((b) => { return b.thumbnail}))

    return {
        props:{
            batches: data,
            thumbnailBatches
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