
import NewFileUpload from '@/components/NewFileUpload';
import FileSharingLayout from '@/layouts/FileSharingLayout'
import { GetClient } from '@/lib/Supabase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '@/styles/FileSharing.module.css'
import { GetContentType, GetContentTypeFromSource, GetExtensionFromSource } from '@/lib/ExtensionHelper';
import { RatioImage } from '@/components/RatioImage';
import Image from 'next/image';
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]';
import { RatioMedia } from '@/components/RatioMedia';
import FileElement from '@/components/FileElement'
import { useEffect, useState } from 'react';
import Arrow from '@/components/Arrow';




function FilePage ({files}) {

    const [display, setDisplay] = useState(null)
    const [displayId, setDisplayId] = useState(-1)
    const session = useSession({
        required: true
    })


    
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
    
    if (session.status !== "authenticated" && session.status) {
        return;
    }
    


    function moveDisplay (newID) {

        if (newID + 1 > files.length) {
            newID = files.length;
        }

        setDisplayId(newID)
        setDisplay(files[newID])
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
    

    




    return (
        <FileSharingLayout pageId={0}>

            {session.status == "authenticated" && <NewFileUpload /> }
            <div className={styles.list}>
                    {display && <div className={styles.display_controls}>
                        <button onClick={() => {moveDisplay(displayId - 1)}}>{<Arrow direction='left'/>}</button>
                        <div>
                            <h3>{display.fileName}</h3>
                            <div className={styles.row}>
                                <Link href={display.source} className={styles.downloadLink} download>Download</Link>
                                <Link href={display.source} className={styles.downloadLink} >Direct Link</Link>
                            </div>
                        </div>
                        <button onClick={() => {moveDisplay(displayId + 1)}}>{<Arrow direction='right'/>}</button>
                    </div> }
                 <div style={{opacity: display != null ? 1 : 0, pointerEvents: display != null ? "all" : "none"}} className={styles.display} onClick={() => {setDisplay(null)}}>

                    {display && <DisplayElement/>}

                    </div>
                {files.map((file, i) => {



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

export async function getServerSideProps(ctx){

    const session = await getServerSession(
        ctx.req,
        ctx.res,
        authOptions,
    )

    if (!session) {
        ctx.res.end;
        return {props: {}};
    }

    const userId = session.user.id
    
    const { data, error } = await GetClient()
    .from("files")
    .select(`
        *
    `)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .eq("user", userId)
    .order("created_at", {ascending: false})

    return {
        props:{
            files: data
        },
    }
}


export default FilePage;