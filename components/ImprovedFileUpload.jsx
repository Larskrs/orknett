import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { contentTypeList, GetContentType } from "@/lib/ExtensionHelper";
import { RatioImage } from "./RatioImage";
import { GetAuthenticatedClient } from "@/lib/Supabase";
import Image from "next/image";
import { FileUploading } from ".";
import { getReadableFileSizeString } from "@/lib/FileHelper";

export default function FileUpload ({batchPreset = ""}) {
    
    const router = useRouter()
    
    const [file, setFile] = useState();
    const [files, setFiles] = useState([])
    const [fileUrl, setFileUrl] = useState()
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [finished, setFinished] = useState(false)
    const [link, setLink] = useState(null)
    const [batch, setBatch] = useState(batchPreset != "" ? batchPreset : "")
    const [visible, setVisible] = useState(false)
    

    const session = useSession();
    let filesLeft = files

    
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
        setFiles([])
        const _files = event.target.files;

        if (_files && _files != undefined) {
            let newFiles = []
            Array.from(_files).forEach((file, index) => {
              newFiles.push(file)
            })
            setFiles(newFiles)
          } else {
            console.log('file error')
          };
          console.log(files)
    }
    if (session.status !== "authenticated") {
        return (
            <p>You can not upload media without being logged in.</p>
        )
    }
    return (
        <>

        <button onClick={() => {setVisible(true); setFiles([])}}>Upload File</button>

        <div className="background" style={{opacity: visible ? 1 : 0, pointerEvents: visible ? "all" : "none"}}>
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
                {/* {fileUrl &&
                    <div style={{width: `500px`, height: `500px`, position: "relative"}}>
                        <Image src={fileUrl} fill objectFit="contain" />
                    </div>
                } */}

                
                {/* {files && [...files].forEach(file => console.log(file) )} */}

            
                    <div className="row">
                    <input style={{display: "none"}} type='file' id='file' multiple accept={contentTypeList['image']} onChange={handleSetFile}/>
                    {batchPreset == null && <input type='text' id='batch' onChange={(e) => {setBatch(e.target.value)}} /> }
                        
                        <label className={"upload_button"}htmlFor="file">Select File to upload</label>
                        {/* <label className="upload_button" onClick={() => {setSubmitting(true)}}> Upload File </label> */}
                        <p style={{fontSize: 14}}>Size {getReadableFileSizeString(getTotalSize(files))}</p>
                        <button onClick={() => {setVisible(false)}}>Close</button>
                    </div>

                    <div className="fileList">{filesLeft && filesLeft.length > 0 && filesLeft.map((f, i) => <FileUploading key={f.name} file={f} batch={batch} session={session} run={submitting} onUploaded={() => {
                    filesLeft = filesLeft.splice(i, 1);
                    
                }} />) }</div> 

        </div> }


                <style jsx>{`

                    .background {
                        z-index: 200;
                        position: fixed;
                        height: 100%;
                        width: 100%;
                        left: 0;
                        top: 0;
                        background-color: var(--background);
                        backdrop-filter: blur(50px);
                        
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    .fileList {
                        position: relative;
         
                        display: flex;
                        flex-direction: column;
                        /* height: 90vh; */
                        max-height: 80vh;
                        overflow-y: scroll;
                        overflow-x: hidden;
                        padding: 0rem;
                        gap: 0.5rem;

                    }
                    .bar {
                        background-color: #111;
                    }
                    .container {
                        z-index: 200;
                        position: fixed;
                        overflow: none !important;
                        
                        background: var(--background);
                        display: flex;
                        flex-direction: column;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        top: 92px;
                        height: 100%;
                        
                        padding: 1rem;
                        gap: 0.5rem;
                    }
                    .upload_button {
                        padding: 1rem 2rem;
                        background: #111;
                        border: 1px solid var(--gray-3);
                        border-radius: 10px;
                        transition: none;
                        font-size: 14px;
                        outline: none;
                    }
                    .upload_button:hover {
                        outline: 2px solid var(--gray-3);
                        background: var(--gray-2);
                    }
                    .row {
                        display: flex;
                        gap: 1rem;
                        pointer-events: all;
                        background-color: #111;
                        padding: .5rem 2rem;
                        font-size: 14px;
                        border-radius: 10px;
                        width: fit-content;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 16px;
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                        backdrop-filter: blur(5px);
                        -webkit-backdrop-filter: blur(5px);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                    }


                    @media screen and (max-height: 600px) {
                        .container {
                            bottom: 0;
                            top: unset;
                        }
                    }
                    @media screen and (max-width: 700px) {
                        .container {
                            top: 0;
                            bottom: unset;
                        }   
                    }

            `}</style>

    </>
    );

    function getTotalSize (files) {
        let total = 0;
        files.map((f) => total = total + f.size);
        return total
    }
}
