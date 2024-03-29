
import FileSharingLayout from '@/layouts/FileSharingLayout'
import { GetClient, GetServiceClient } from '@/lib/Supabase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '@/styles/FileSharing.module.css'
import { GetContentType, GetContentTypeFromSource, GetExtensionFromSource, isSourceContentType } from '@/lib/ExtensionHelper';
import Image from 'next/image';
import FileElement from '@/components/FileElement';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { AlbumElement, AudioPlayer, Badge, DisplayElement, ImprovedFileUpload, SlimListModal } from '@/components';
import axios from "axios";
import { useRouter } from 'next/router';




export default function BatchPage ({batch, batches, users}) {

    function NoAccessPage () {
        return (
            <FileSharingLayout pageId={3}>

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
    const [displayId, setDisplayId] = useState(0)
    const [filter, setFilter] = useState("")
    const [current, setCurrent] = useState(0)

    const router = useRouter()

    function getPossibleExtensionFilters () {
        var files = batch.files
        let filters = []
        files.map((f) => {
            const ext = GetContentTypeFromSource(f?.source).split("/")[0]
            if (!filters.includes(ext)) {
                filters.push(ext)
            }
        })
        return filters
    }

    function moveDisplay (newID) {

        console.log("moving display to " + newID)

        if (newID + 1 > getFilteredFiles().length) {
            newID = getFilteredFiles().length;
        }

        setDisplayId(newID)
        setDisplay(getFilteredFiles()[newID])

        console.log(display)
    }

    function PlayNextFile() {
        moveDisplay(displayId + 1)
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
        
        if (batch.type |= null && batchh.type == 1) {
            moveDisplay(1)
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
        files = files.filter((f) => isSourceContentType(f?.source, filter))

        return files
    }

    function displayFilters () {
        return <div className={styles.row}>{
            getPossibleExtensionFilters().map((ext) => {
                return <button key={ext} onClick={() => {if (ext == filter) {setFilter("")} else setFilter(ext)}} style={{border: "none", outline: filter != ext ? "none" : "2px solid white"}}>{ext}</button>
            })
        }</div>
    }

    async function ConfirmUsers (selected) {
        let ownerIdList = selected.map((s) => s.id)
        if (!ownerIdList.includes(batch.owner)) {
            ownerIdList = [batch.owner, ...ownerIdList]
        }

        const {data, error} = await GetClient()
        .from("batches")
        .update({
            owners: ownerIdList
        })
        .eq("id", batch.id)

        router.reload()
    }

    return (

        <FileSharingLayout pageId={3} batches={batches}>

            <div className={styles.wrap}>
                <Head>
                    <title>{batch.title}</title>
                    <meta name="description" content={"This is a sharable batch link."} />
                    <meta name="twitter:card" content="summary_large_image"/>
                    {batch?.files.length > 0 && <meta property="twitter:image:src" content={batch.files[0].source}/> }
                </Head>


                <div className={styles.settingsWrapper}>
                    <div className={styles.row}>
                        <SlimListModal
                            data={users}
                            alreadySelected={batch.owners}
                            onConfirm={async (selected) => await ConfirmUsers(selected)}
                            onRenderItem={(owner, i) => {return(
                               <div className={styles.info} style={{display: "flex", gap: 8, padding: "8px"}}>
                                    <Image className="avatar" src={owner.image} alt={owner.name + "'s avatar"} width={25} height={25}  />
                                    <p style={{fontSize: "16px", maxWidth: "100px", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{owner.name}</p>
                                </div>
                            )}}
                            title='Manage Members'
                            description='Click to add or remove members.'
                        >
                            <Badge><Image src={"/icons/settings_icon.svg"} width={25} height={25} /></Badge>
                        </SlimListModal>
                        <div className={styles.members}>
                            {batch.owners.map((owner, i) => {
                                return (
                                    <div className={styles.member} key={i}>
                                        <Image className="avatar" src={owner.image} alt={owner.name + "'s avatar"} width={25} height={25}  />
                                        <div className={styles.info}>
                                            <Image className="avatar" src={owner.image} alt={owner.name + "'s avatar"} width={25} height={25}  />
                                            <p style={{fontSize: "16px", maxWidth: "100px", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{owner.name}</p>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
                <div className={styles.row} style={{gap: "2rem"}}>

                    {batch.display === (0 || null) && displayFilters()}
                    {session.status == "authenticated" && batch.owners.map((o) => o.id).includes(session.data.user.id) && <ImprovedFileUpload batchPreset={batch.id} /> }
                
                </div>
                <div className={
                    styles.wrap
                }>
                    <div style={{opacity: display != null ? 1 : 0, pointerEvents: display != null ? "all" : "none"}} className={styles.display} onClick={() => {setDisplay(null)}}>
                    </div>
                    {display && <DisplayElement file={display} id={displayId} onClose={() => {setDisplay(null)}} onEnded={PlayNextFile}/>}
                    {getFilteredFiles().map((file, i) => {
                        // Normal File Display
                        return <FileElement 
                        key={i}
                        file={file}
                        owner={batch.owners.filter((o) =>file.user == o.id)?.[0]}
                        download={batch.settings?.download || (session.status === "authenticated" && batch.owners.map((o) => o.id).includes(session.data.user.id))}
                        onSelect={() => {
                            moveDisplay(i)
                        }}/>
                    } ) }
                </div>
            </div>
        </FileSharingLayout>
    );
}

export async function getStaticProps({ params }){
    
    
    
    async function GetOwners(owners) {
        const {data, error} = await GetServiceClient("next_auth")
        .from("users")
        .select(`
            name,
            image,
            id
        `)
        .in("id", owners)
        
        return data
        

    }
    async function GetUsers() {
        const {data, error} = await GetServiceClient("next_auth")
        .from("users")
        .select(`
            name,
            image,
            id
        `)
        .order("name", {ascending: true})
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
    const users = await GetUsers()
    data.owners = owners

    return {
        props:{
            batch: data,
            users,
        },
        revalidate: 10, // In seconds
    }




}


export async function getStaticPaths() {
    const { data, error } = await GetClient("public")
    .from("batches")
    .select("id")
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)

    const paths = data.map( (batch, i) => {return {params: {id: batch.id } } } )
    return { paths, fallback: 'blocking' }
  }
