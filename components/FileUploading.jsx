import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { contentTypeList } from "@/lib/ExtensionHelper";
import { RatioImage } from "./RatioImage";
import { GetAuthenticatedClient, GetClient } from "@/lib/Supabase";
import Image from "next/image";
import { getReadableFileSizeString } from "@/lib/FileHelper";
import { RatioMedia } from "./RatioMedia";
import { Slider } from ".";

export default function FileUploading ({
    file,
    batch,
    session,
    onUploaded=() => {},
    run=false
}) {

    const [fileUrl, setFileUrl] = useState(URL.createObjectURL(file))
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [finished, setFinished] = useState(false)
    const [link, setLink] = useState(null)

    async function UploadToDatabase (fileName, id, extension, onUploaded=() => {}) {
        console.log("Uploading to database...")

        console.log({session})
        const userId = session.status == "authenticated" ? session.data.user.id : null

        const {select, error} = await GetClient("public").from("files")
        
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

        // router.reload()
    }

    async function handleSubmit ( ) {

        if (submitting || finished) return
        

        const data = new FormData()
        
        if (!session) { return; }

        if (!file) return;
        let fileNameR = file.name.split(".");
        const type = fileNameR[fileNameR.length -1]
        
        const name = create_UUID();
        const fileName = name + "." + type;

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
                console.error(e)
                setError(e.message);
            } finally {
                    setSubmitting(false);
                    setFinished(true)
                    setProgress(0);
                    UploadToDatabase(file.name, name, type);
                    onUploaded()
                    
            }
            // axios
    }

    return (
        <div onClick={handleSubmit} style={{background: "#111", border: "1px solid #222", cursor: "pointer", borderRadius: "8px", padding: "1rem 2rem 1rem 1rem", display: (finished ? "none" : "flex"), wordBreak: "break-word", flexDirection: "row", minWidth: "200px", width: "auto", gap: 8}}>
            <Image style={{objectFit: "cover", borderRadius: 8}} width={50} height={50} src={fileUrl} quality={0} />
            <div>

                <p style={{opacity: finished ? 0.25 : 1, fontSize: 20, margin: 0}}>{file.name}</p>
                <p style={{margin: 0, fontSize: 16, color: "#444"}}>{getReadableFileSizeString(file.size)}</p>
                {!finished && submitting && <div style={{display: "flex", gap: ".5rem"}}>
                    {/* <progress max={100} value={progress} /> */}
                    <Slider currentValue={progress} max={100} min={0} smooth={true} trackStyle={{height: "16px"}} progressStyle={{background: "yellow"}} />
                </div> }

            </div>
        </div>
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