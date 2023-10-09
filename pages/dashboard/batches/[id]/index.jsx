
import NewFileUpload from '@/components/NewFileUpload';
import FileSharingLayout from '@/layouts/FileSharingLayout'
import { GetClient, GetServiceClient } from '@/lib/Supabase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '@/styles/FileSharing.module.css'
import { GetContentType, GetContentTypeFromSource, GetExtensionFromSource, isSourceContentType } from '@/lib/ExtensionHelper';
import { RatioImage } from '@/components/RatioImage';
import Image from 'next/image';
import { RatioMedia } from '@/components/RatioMedia';
import FileElement from '@/components/FileElement';
import { useState, useEffect } from 'react';
import Arrow from '@/components/Arrow';
import Head from 'next/head';
import { AudioPlayer, Badge, ImprovedFileUpload } from '@/components';
import axios from "axios";
import { GetBatches } from '@/lib/BatchLib';




export default function BatchPage ({batch, batches}) {

    function NoAccessPage () {
        return (
            <FileSharingLayout pageId={2}>

                    <Head>
                        <title>{batch.title}</title>
                        <meta content={batch.title} property="og:title" />
                        <meta content="Ingen Beskrivelse funnet" property="og:description" />
                        <meta content={batch?.files?.[0]?.source} property="og:image" />
                    </Head>

                    <div style={{position: "fixed", top: "50%", left: "50%", translate: "-50% -50%"}}>
                        <h2>You do not have access to this batch.</h2>
                        <Link href={"/dashboard/batches"}>Go Back</Link>
                    </div>
                </FileSharingLayout>
        )
    }

    const session = useSession()

    const [display, setDisplay] = useState(null)
    const [displayId, setDisplayId] = useState(-1)
    const [filter, setFilter] = useState("")
    const [current, setCurrent] = useState(0)

    function getPossibleExtensionFilters () {
        var files = batch.files
        let filters = []
        files.map((f) => {
            const ext = GetContentTypeFromSource(f.source).split("/")[0]
            if (!filters.includes(ext)) {
                filters.push(ext)
            }
        })
        return filters
    }

    function moveDisplay (newID) {

        if (newID + 1 > getFilteredFiles().length) {
            newID = getFilteredFiles().length;
        }

        setDisplayId(newID)
        setDisplay(getFilteredFiles()[newID])
    }

    function PlayNextFile() {
        moveDisplay(displayId + 1)
    }
    
    function DisplayElement () {

        const content = GetContentTypeFromSource(display.source)
        const contentType = content.split("/").shift();
        
        if (contentType == "image") {
            return (
                <Image className={styles.display_element}
                    quality={50}
                    width={1200}
                    height={1200}
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    key={displayId}
                    alt={display.fileName}
                    src={display.source}
                    content={GetContentTypeFromSource(display.source)}
                 />
            )
        }
        if (contentType == "audio") {

            return (
                <div className={styles.display_element} key={displayId}>
                    <AudioPlayer alt={display.fileName}
                    src={display.source}
                    onCompleted={() => {
                        PlayNextFile()
                    }} 
                    cover={`/api/v1/files/audio/cover?fileId=${display.source.split("fileId=").pop()}`} />
                </div>
            )
        }
        if (contentType == "video") {
            return (
                <video 
                    key={displayId}
                    className={styles.display_element}
                    alt={display.fileName}
                    src={display.source}
                    content={GetContentTypeFromSource(display.source)} 
                    controls
                    autoPlay
                    onEnded={() => PlayNextFile()}
                        
                />
            )
        }
        else {
            return (
                <div className={styles.display_unknown_element} key={displayId}>
                    <h2>.{GetExtensionFromSource(display.source)}</h2>
                    <h3>{display.fileName}</h3>
                </div>
            )
        }
        

    }


    


    useEffect(() => {
        document.onkeydown = checkKey;
    
        function checkKey(e) {
        
            e = e || window.event;
        
            if (e.keyCode == '38') {
                // up arrow
            }
            else if (e.keyCode == '40') {
                // down arrow
            }
            else if (e.keyCode == '37') {
               // left arrow
               moveDisplay(displayId - 1)
               
            }
            else if (e.keyCode == '39') {
               // right arrow
               moveDisplay(displayId + 1)
            }
        
        }
    }, )


    
    if (batch.settings?.access == "private") {

        if (session.status != "authenticated") return NoAccessPage()
        if (!batch.owners.map((o) => o.id).includes(session.data.user.id)) return NoAccessPage()

    }

    function getFilteredFiles () {
        
        var files = batch.files
        if (filter == "" || null) {
            return files
        }
        files = files.filter((f) => isSourceContentType(f.source, filter))

        return files
    }

    function displayFilters () {
        return <div className={styles.row}>{
            getPossibleExtensionFilters().map((ext) => {
                return <button key={ext} onClick={() => {if (ext == filter) {setFilter("")} else setFilter(ext)}} style={{border: "none", outline: filter != ext ? "none" : "2px solid white"}}>{ext}</button>
            })
        }</div>
    }


    return (

        <FileSharingLayout pageId={2} batches={batches}>

            <Head>
                <title>{batch.title}</title>
            </Head>

            <h2>{batch.title}</h2>
            
            <div style={{display: "flex", gap: ".5rem", flexWrap: "wrap"}}>
                {batch.owners.map((owner, i) => {
                    return (
                    <Badge key={i}>
                        <Image className="avatar" src={owner.image} alt={owner.name + "'s avatar"} width={25} height={25}  />
                        <p style={{fontSize: "16px", maxWidth: "100px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{owner.name}</p>
                    </Badge>
                    )
                })}
            </div>
            <div className={styles.row} style={{gap: "2rem"}}>
                
                {displayFilters()}
                {session.status == "authenticated" && batch.owners.map((o) => o.id).includes(session.data.user.id) && <ImprovedFileUpload batchPreset={batch.id} /> }
            
            </div>
            <div className={styles.wrap}>
                <div style={{opacity: display != null ? 1 : 0, pointerEvents: display != null ? "all" : "none"}} className={styles.display} onClick={() => {setDisplay(null)}}>
                </div>

                    {display && <DisplayElement/>}
                {getFilteredFiles().map((file, i) => {



                  return <FileElement 
                    key={i}
                    file={file}
                    download={batch.settings?.download || (session.status === "authenticated" && batch.owners.map((o) => o.id).includes(session.data.user.id))}
                    onSelect={() => {
                    moveDisplay(i)
                  }}/>

                } ) }
            </div>
        </FileSharingLayout>
    );
}

export async function getStaticProps({ params }){

    

    async function GetOwners(owners) {
        const {data, error} = await GetServiceClient("next_auth")
        .from("users")
        .select(`
          *
        `)
        .in("id", owners)

        return data
        

    }
    
    
    const batchId = params.id
    const { data, error } = await GetClient()
    .from("batches")
    .select(`
        *,
        files (*)
    `)
    .eq("id", batchId)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .order("created_at", {
        foreignTable: "files",
        ascending: false
    })
    .single()

    const owners = await GetOwners(data.owners)
    data.owners = owners

    const batches = await GetBatches ();

    return {
        props:{
            batch: data,
            batches: batches.data,
        },
        revalidate: false, // In seconds
    }




}


export async function getStaticPaths() {
    const { data, error } = await GetClient("public")
    .from("batches")
    .select("id")
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)

    const paths = data.map( (batch, i) => {return {params: {id: batch.id } } } )
    return {
      paths,
      fallback: 'blocking',
    };
  }
