import { RadialProgress } from "@/components";
import { getReadableFileSizeString } from "@/lib/FileHelper";
import axios from "axios";
import { useSession } from 'next-auth/react';
import useFetch from "@/hooks/UseFetch";
import { useEffect } from "react";
import { Slider } from "@/components";
import Image from "next/image";

export default function AdminPage ({storage}) {

    const videosSize = getReadableFileSizeString(storage.videos)
    const filesSize = getReadableFileSizeString(storage.files)

    const session = useSession({
        required: true
    })

    if (session.status === 'loading') {
        return (
            <section style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <p>Loading Page</p>
            </section>
        )
    }


    return (
        <div style={{minHeight: "100vh"}}>
            
        <section style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
            <div style={{display: "flex", flexDirection: "column", gap: 8, alignItems: "center"}}>
                <RadialProgress progress={(storage.videos / storage.allocated) * 100} trackWidth={9.5} indicatorWidth={10} label={"Videos"} trackColor={"#222"} indicatorColor={"var(--ak-primary)"}/>
                <p>{videosSize}</p>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 8, alignItems: "center"}}>
                <RadialProgress progress={(storage.files / storage.allocated) * 100} trackWidth={9.5} indicatorWidth={10} label={"Files"} trackColor={"#222"} indicatorColor={"var(--folly)"}/>
                <p>{filesSize}</p>
            </div>
            {session.status == "authenticated" && <FilesUploadAmount session={session} /> }
            
        </section>


        
        </div>
    );
}
function FilesUploadAmount ({session}) {

    const {  data, isLoading, error, refetch } = useFetch(`files/storage/user?userId=${session.data.user.id}`)
    useEffect(() => {
        console.log("You've uploaded: " + data.size)
    }, [data])

    if (!data || isLoading) {
        return (<p>Loading...</p>)
    }

    const fileSize = getReadableFileSizeString(data.size)

    
    return (

            <div style={{display: "flex", flexDirection: "column", gap: 8, alignItems: "center"}}>
                <RadialProgress progress={(data.size / 20000000000) * 100} trackWidth={9.5} indicatorWidth={10} label={"Your Files"} trackColor={"#222"} indicatorColor={"var(--ak-tertiary)"}/>
                <p>{fileSize}</p>
            </div>
    )
}


const os = require("os")

export async function getServerSideProps(ctx) {

    let storage = {
        videos: 0,
        files: 0,
        cpus: []
    }
    

    const data = await axios.get("/api/v1/files/storage")
    storage = {
        videos: data.data.videos,
        files: data.data.files,
        allocated: process.env.ALLOCATED_STORAGE_SPACE,
        cpus: os.cpus()
    }

    return {
        props: {
            storage: storage,
        }
    }
}
  