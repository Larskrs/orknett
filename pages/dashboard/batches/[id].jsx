
import NewFileUpload from '@/components/NewFileUpload';
import FileSharingLayout from '@/layouts/FileSharingLayout'
import { GetClient } from '@/lib/Supabase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '@/styles/FileSharing.module.css'
import { GetContentType, GetContentTypeFromSource, GetExtensionFromSource } from '@/lib/ExtensionHelper';
import { RatioImage } from '@/components/RatioImage';
import Image from 'next/image';
import { RatioMedia } from '@/components/RatioMedia';
import FileElement from '@/components/FileElement';
import { useState, useEffect } from 'react';
import Arrow from '@/components/Arrow';




export default function BatchPage ({batch}) {

    const session = useSession()

    const [display, setDisplay] = useState(null)
    const [displayId, setDisplayId] = useState(-1)



    function moveDisplay (newID) {

        if (newID + 1 > batch.files.length) {
            newID = batch.files.length;
        }

        setDisplayId(newID)
        setDisplay(batch.files[newID])
    }

    
    function DisplayElement () {

        const content = GetContentTypeFromSource(display.source)
        const contentType = content.split("/").shift();
        
        if (contentType == "image") {
            return (
                <img className={styles.display_element}
                    key={displayId}
                    alt={display.fileName}
                    src={display.source}
                    content={GetContentTypeFromSource(display.source)}
                 />
            )
        }
        if (contentType == "audio") {
            return (
                <audio 
                    key={displayId}
                    className={styles.display_element}
                    alt={display.fileName}
                    src={display.source}
                    controls
                    autoPlay
                    content={GetContentTypeFromSource(display.source)} />
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

    return (




        
        <FileSharingLayout pageId={2}>
            <h2>{batch.title}</h2>
            <p>Owner of batch: {batch.owner.name}</p>
            {session.status == "authenticated" && session.data.user.id == batch.owner && <NewFileUpload batchPreset={batch.id} /> }
            <div className={styles.list}>
                    {display && <div className={styles.display_controls}>
                        <button onClick={() => {moveDisplay(displayId - 1)}}>{<Arrow direction='left'/>}</button>
                        <div>
                            <h3>{display.fileName}</h3>
                            <div className={styles.row}>
                                <a href={display.source} className={styles.downloadLink} download={display.source}>Download</a>
                                <p onClick={() => {navigator.clipboard.writeText(document.domain +  display.source)}} className={styles.downloadLink} >Copy Link</p>
                            </div>
                        </div>
                        <button onClick={() => {moveDisplay(displayId + 1)}}>{<Arrow direction='right'/>}</button>
                    </div> }
                 <div style={{opacity: display != null ? 1 : 0, pointerEvents: display != null ? "all" : "none"}}className={styles.display} onClick={() => {setDisplay(null)}}>

                    {display && <DisplayElement/>}

                    </div>
                {batch.files.map((file, i) => {



                  return <FileElement key={i} file={file} onSelect={() => {
                    console.log("Uploading file: \n" + file.fileName)
                    moveDisplay(i)
                  }}/>

                } ) }
            </div>
        </FileSharingLayout>
    );
}

function mediaPreview(source) {

    const content = GetContentTypeFromSource(source).split("/").shift()
    
    if (content == "image") {
        return <div className={styles.image}>
            <Image width={100} objectFit={'cover'} height={100} src={source} />
        </div>
    }
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
    .order("created_at", {
        foreignTable: "files",
        ascending: false
    })
    .single()

    console.log({data, error})

    return {
        props:{
            batch: data
        },
        revalidate: 5, // In seconds
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
      fallback: 'blocking',
    };
  }
