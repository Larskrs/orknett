
import Image from "next/image";
import { useState, useEffect } from "react";
import { GetContentTypeFromSource, GetExtensionFromSource } from "@/lib/ExtensionHelper";
import { AudioPlayer, Badge } from "@/components";
import styles from "@/styles/FileDisplay.module.css"
import { GetClient } from "@/lib/Supabase";

export default function Display ({batch}) {

    
    const [display, setDisplay] = useState(null)
    const [displayId, setDisplayId] = useState(0)
    const [displayTime, setDisplayTime] = useState(15)
    const [loading, setLoading] = useState(false)

    const ScrollDisplay = () => {

        setDisplayTime(15)
        setDisplay(null)

        console.log("Changing...")

        let newId = displayId + 1;
        if (newId > batch.files.length - 1) {
            newId = 0
        }

        setDisplayId(newId)
        setDisplay(batch?.files?.[newId])
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
        }, 15000); // Replace 60000 with your desired interval in milliseconds (e.g., 60000 milliseconds = 1 minute)
    
        return () => {
          clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
      }, [displayId]);

    return (
        <div onClick={() => ScrollDisplay()}>
            {/* <button style={{zIndex:99999999, position: "fixed", left: 0, top: 0}} onClick={fetchData}>Fetch</button> */}

            <div style={{position: "absolute", left: 0, top: 0, translate: `0px -${100*displayId}vh`, transitionDuration: "2.5s"}}>{batch.files.map((f, i) => {
                return (
                    <div key={i} className="display_element" style={{   
                        transitionDuration: "2s",
                        opacity: displayId == i ? 1 : 0,
                        scale: displayId == i ? "1" : "0.7",
                        transitionDelay: displayId == i ? "1s" : "0s",
                        }}
                        >
                        <h2 className={`display_title ${displayId == i ? `active_text` : ""}`}>{f.fileName}</h2>
                        <DisplayElement file={f} id={i} />
                    </div>
                )
            })}</div>

            <div style={{zIndex:9999, position: "fixed", left: "1rem", bottom: "1rem"}}>
            <div>{batch.files.map((f, i) => {
                return <p key={f.id} style={{margin: 0, display: "flex"}}>
                    <span style={{fontSize: 18, transitionDuration: ".5s", height: "25px", width: (displayId == i ? "5spx" : "2.5px"), display: "flex", background: (displayId == i ? "lime" : "#333")}}></span>
                    {((displayId == i) ? <span style={{opacity: 1, translate: "10px 0px"}}>{f.fileName}</span> : <span style={{opacity: 0}}>{f.fileName}</span>)}
                    </p>
            })}</div>
                {/* <div>
                    {display && <h3>{display.fileName}</h3>}
                    {display && <h1>{batch.title}</h1>}
                </div> */}
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        opcaity: 0;
                        translate: 100vw;
                    }
                    10% {
                        opacity: 1;
                        scale: 1;
                        translate: 0 0;
                    }
                    90% {
                        translate: 0 0;
                    }
                    100% {
                        translate: -100vw;
                    }
                }
                .display_element {
                    animation: 5s scroll cubic-bezier(.13,.69,.47,.99);
                    scale: .2;
                    height: 100vh;
                }
                .display_title {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    translate: -50% -50%;
                    z-index: 999;
                    font-size: 5vw;
                    text-align: center;
                    transition: 5s;
                    transition-delay: 1s;
                }
                .active_text {
                    color: transparent;
                    scale: 1;
                    position: absolute;
                    
                    letter-spacing: 32px;
                    width: 10000%;
                    
                }
                
            `}</style>

        </div>
    );
}


export async function getStaticProps({ params })
{


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

    return {
        props:{
            batch: data,
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