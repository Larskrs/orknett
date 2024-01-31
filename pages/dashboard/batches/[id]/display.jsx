
import Image from "next/image";
import { useState, useEffect } from "react";
import { GetContentTypeFromSource, GetExtensionFromSource } from "@/lib/ExtensionHelper";
import { AudioPlayer, Badge } from "@/components";
import styles from "@/styles/FileDisplay.module.css"
import { GetClient, GetServiceClient } from "@/lib/Supabase";
import { useSearchParams } from 'next/navigation'

export default function Display ({batch}) {

    const searchParams = useSearchParams()
    const credits = searchParams.get('credits')
    const animation = searchParams.get('animation')


    const [display, setDisplay] = useState(null)
    const [displayId, setDisplayId] = useState(0)
    const [displayTime, setDisplayTime] = useState(15)
    const [loading, setLoading] = useState(false)

    const ScrollDisplay = () => {

        setDisplayTime(15)
        setDisplay(null)

        let newId = displayId + 1;
        if (newId > batch.files.length - 1) {
            newId = 0
        }
        const file = batch?.files?.[newId]
        const owner = batch.owners.filter((o) => file.user == o.id)?.[0]
        file.owner = owner
        setDisplayId(newId)
        setDisplay(file)
      };
    
    function DisplayElement ({file, id}) {

        const content = GetContentTypeFromSource(file.source)
        const contentType = content.split("/").shift();
        
        if (contentType == "image") {
            return (
                <Image
                    className={styles.display_element}
                    key={id}
                    alt={file.fileName}
                    src={file.source}
                    style={{objectFit: "contain"}}
                    fill
                    content={GetContentTypeFromSource(file.source)}
                 />
            )
        }
        if (contentType == "audio") {
    
            return (
                <div className={styles.display_element}>
                    <AudioPlayer alt={file.fileName} src={file.source} cover={`/api/v1/files/audio/cover?fileId=${file.source.split("fileId=").pop()}`} /> 
                </div>
            )
        }
        if (contentType == "video") {
            return (
                <video 
                    key={id}
                    className={styles.display_element}
                    alt={file.fileName}
                    src={file.source}
                    content={GetContentTypeFromSource(file.source)} 
                    autoPlay={displayId == id}
                    loop
                    
                        
                />
            )
        }
        else {
            return (
                <div className={styles.display_unknown_element} key={id}>
                    <h2>.{GetExtensionFromSource(file.source)}</h2>
                    <h3>{file.fileName}</h3>
                </div>
            )
        }
        
    
    }
    useEffect(() => {
    
        const intervalId = setInterval(() => {
            ScrollDisplay()
        }, 5000); // Replace 60000 with your desired interval in milliseconds (e.g., 60000 milliseconds = 1 minute)
    
        return () => {
          clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
      }, [displayId]);

    return (
        <div onClick={() => ScrollDisplay()}>

            <style global jsx>{`
                ${animation === '0' ? `* {
                    animation: none !important;
                    opacity: 1 !important;
                }` : ``}  
            `}</style>

            {/* <button style={{zIndex:99999999, position: "fixed", left: 0, top: 0}} onClick={fetchData}>Fetch</button> */}
            <div className="container">
                {display && <>
                    {(credits !== '0') && <div key={displayId} className={styles.credits}>
                        <div className={styles.user}>
                            <Image alt={display.owner.name} src={display.owner.image} width={50} height={50} />
                            <div className={styles.detail}>
                                <span>Lastet opp av</span>
                                <p>{display.owner.name}</p>
                            </div>
                        </div>
                        <div className={styles.file}>
                            <p>{display.fileName.split(".").shift()}</p>
                        </div>
                    </div> }
                    <DisplayElement file={display} id={displayId} />
                </>

                }
            </div>

           
                {/* <div>
                    {display && <h3>{display.fileName}</h3>}
                    {display && <h1>{batch.title}</h1>}
                </div> */}
            

            <style jsx>{`
                .container {
                    min-width: 100vw;
                    min-height: 100vh;
                    display: flex;
                }
            `}</style>

        </div>
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
        revalidate: false, // In seconds
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