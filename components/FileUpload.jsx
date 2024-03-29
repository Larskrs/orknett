import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import React, { useEffect } from "react";
import Router, { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { GetAuthenticatedClient } from "@/lib/Supabase";
import Image from "next/image";
import { contentTypeList } from "@/lib/ExtensionHelper";
import { RatioImage } from "./RatioImage";
import styles from "@/styles/FileSharing.module.css"

export default function FileUpload ({batchPreset = ""}) {
    
    const router = useRouter()
    
    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState()
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [finished, setFinished] = useState(false);
    const [link, setLink] = useState(null);
    const [batch, setBatch] = useState(batchPreset != "" ? batchPreset : "");

    const session = useSession();

    console.log({batchPreset, batch})
    
    async function UploadToDatabase (fileName, id, extension) {
        console.log("Uploading to database...")

        console.log({session})
        const userId = session.status == "authenticated" ? session.data.user.id : null
        let source = `/api/v1/files?quality=${360}&fileId=${id}.${extension}`
        if (GetContentType(extension).toLowerCase().includes("video")) {
            source = `/api/v1/files?quality=${360}&fileId=${id}.${extension}`
        }
        console.log(source)
        const {select, error} = await GetAuthenticatedClient("public",session).from("files")
        
        .insert(
            userId ?     
        {
            id: id,
            source: source,
            storage: process.env.NEXT_PUBLIC_STORAGE_ID,
            user: userId,
            batch : (batch != "" ? batch : null),
            fileName : fileName,
        } :
        {
            id: id,
            source: source,
            storage: process.env.NEXT_PUBLIC_STORAGE_ID,  
            batch : (batch != "" ? batch : null),
            fileName : fileName,
        })
        .select("*")
        console.log({select: select, error})

        router.reload()
    }

    async function handleSubmit ( ) {
        const data = new FormData()
        

        if (!session) { return; }

        if (!file) return;
        console.log(file.name);
        let fileNameR = file.name.split(".");
        const type = fileNameR[fileNameR.length -1]
        
        
        const name = create_UUID();
        const fileName = name + "." + type;
        

                    
                    console.log("customname = " + fileName);


            setSubmitting(true);

            var newFile = new File([file], fileName, {
                type: type
            });
            
            
            const config = {
                onUploadProgress: function (progressEvent) {
                    const percentComplete = Math.round(
                        (progressEvent.loaded * 100 / progressEvent.total)
                        );
                        if (percentComplete == 100) {
                            setFinished(true);
                            
                            setLink(`/api/v1/files?fileId=${name}.${type}`);

                            

                        
                        }
                        setProgress(percentComplete);
                    }
                    
                    
                }
                data.append('file', newFile, fileName);
                

            try {
                await axios.post("/api/v1/files", data, config)
            } catch(e) {
                setError(e.message);
            } finally {
                    setSubmitting(false);
                    setProgress(0);
                    UploadToDatabase(file.name, name, type);
                    
            }
            // axios
    }

    function handleSetFile(event) {
        const files = event.target.files;

        if (files?.length) {
            setFile(files[0]);
            setFileUrl(URL.createObjectURL(files[0]))
        }
    }
    if (session.status !== "authenticated") {
        return (
            <p>You can not upload media without being logged in.</p>
        )
    }
    return (
        <div className='container' >
            {error && <p>{error}</p>}
            {submitting && 
                <div>
                    <progress value={progress} max="100">{progress}</progress> <p>{progress}</p>
                </div>}
            {link && 
                <div>
                    <Link href={link}>{link}</Link>
                </div>}
            {fileUrl &&
            <div style={{width: `500px`}}>
                <RatioImage src={fileUrl} width={250} height={250} />
            </div>
            }
            <form method="POST">
                <div>
                    <label htmlFor="file"> File</label>
                    <input type='file' id='file' accept={contentTypeList['image']} onChange={handleSetFile}/>
                    {batchPreset == null && <input type='text' id='batch' onChange={(e) => {setBatch(e.target.value)}} /> }
                </div>
            </form>
            
            {file && <button onClick={handleSubmit}> Upload File </button>}

            <style jsx>{`

                .container {
                    z-index: 200;
                    position: fixed;
                    height: 100%;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: flex;
                    padding: 2rem;
                    background-color: rgba(0,0,0,.5);
                    backdrop-filter: blur(50px);
                }

            `}</style>



        </div>
    )
}


function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

