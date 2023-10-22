import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { contentTypeList } from "@/lib/ExtensionHelper";
import { RatioImage } from "./RatioImage";
import { GetAuthenticatedClient } from "@/lib/Supabase";
import Image from "next/image";

export default function FileUpload ({batchPreset = ""}) {
    
    const router = useRouter()
    
    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState()
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [finished, setFinished] = useState(false)
    const [link, setLink] = useState(null)
    const [batch, setBatch] = useState(batchPreset != "" ? batchPreset : "")
    const [visible, setVisible] = useState(false)
    

    const session = useSession();

    console.log({batchPreset, batch})
    
    async function UploadToDatabase (fileName, id, extension) {
        console.log("Uploading to database...")

        console.log({session})
        const userId = session.status == "authenticated" ? session.data.user.id : null
        let source = `/api/v1/files?fileId=${id}.${extension}`
        if (GetContentType(extension).toLowerCase().includes("video")) {
            source = `/api/v1/files?quality=${360}&fileId=${id}.${extension}`
        }
        const {select, error} = await GetAuthenticatedClient("public",session).from("files")
        
        .insert(
            userId ?     
        {
            id: id,
            source: `/api/v1/files?fileId=${id}.${extension}`,
            storage: process.env.NEXT_PUBLIC_STORAGE_ID,
            user: userId,
            batch : (batch != "" ? batch : null),
            fileName : fileName,
        } :
        {
            id: id,
            source: `/api/v1/files?fileId=${id}.${extension}`,
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
        <>

        <button onClick={() => {setVisible(true)}}>Upload File</button>

        <div className="background" onClick={() => {setVisible(false)}} style={{opacity: visible ? 1 : 0, pointerEvents: visible ? "all" : "none"}}>
            </div>

            {visible && <div className="container">

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
                    <div style={{width: `500px`, height: `500px`, position: "relative"}}>
                        <Image src={fileUrl} fill style={{objectFit: "contain"}} />
                    </div>
                }


            
                    <div className="row">
                    <input style={{display: "none"}} type='file' id='file' accept={contentTypeList['image']} onChange={handleSetFile}/>
                    {batchPreset == null && <input type='text' id='batch' onChange={(e) => {setBatch(e.target.value)}} /> }
                    
                        <label className={"upload_button"}htmlFor="file">Select File to upload</label>
                        {file && <label className="upload_button" onClick={handleSubmit}> Upload File </label>}
                    </div> 

        </div> }


                <style jsx>{`

                    .background {
                        z-index: 200;
                        position: fixed;
                        height: 100%;
                        width: 100%;
                        left: 0;
                        top: 0;
                        background-color: rgba(0,0,0,.75);
                        backdrop-filter: blur(50px);
                        
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    .container {
                        z-index: 200;
                        position: fixed;
                        width: 100%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        display: flex;
                        padding: 2rem;
                        
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    .upload_button {
                        padding: 1rem 2rem;
                        background: #111;
                        border: 1px solid var(--gray-3);
                        border-radius: 10px;
                        transition: none;
                        outline: none;
                    }
                    .upload_button:hover {
                        outline: 2px solid var(--gray-3);
                        background: var(--gray-2);
                    }
                    .row {
                        display: flex;
                        gap: 0.5rem;
                        pointer-events: all;
                    }

            `}</style>

    </>
    );
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