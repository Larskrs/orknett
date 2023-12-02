import { RadialProgress } from "@/components";
import { getReadableFileSizeString } from "@/lib/FileHelper";
import axios from "axios";

export default function AdminPage ({storage}) {

    const videosSize = getReadableFileSizeString(storage.videos)
    const filesSize = getReadableFileSizeString(storage.files)

    return (
        <div>

        <section style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{display: "flex", flexDirection: "column", gap: 8, alignItems: "center"}}>
                <RadialProgress progress={(storage.videos / storage.allocated) * 100} trackWidth={9.5} indicatorWidth={10} label={"Videos"} trackColor={"#222"} indicatorColor={"var(--ak-primary)"}/>
                <p>{videosSize}</p>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 8, alignItems: "center"}}>
                <RadialProgress progress={(storage.files / storage.allocated) * 100} trackWidth={9.5} indicatorWidth={10} label={"Files"} trackColor={"#222"} indicatorColor={"var(--folly)"}/>
                <p>{filesSize}</p>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 8, alignItems: "center"}}>
                <RadialProgress progress={storage.usage} trackWidth={9.5} indicatorWidth={10} label={"Files"} trackColor={"#222"} indicatorColor={"var(--folly)"}/>
                <p>{filesSize}</p>
            </div>
            
        </section>

        <section style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap"}}>
            {storage.cpus.map((cpu) => { 
                

                const usage = (cpu.times.user/cpu.times.idle) * 100

                return (
                <div style={{display: "flex", flexDirection: "column", gap: 8, alignItems: "center"}}>
                    <RadialProgress progress={usage}
                        trackWidth={9.5} indicatorWidth={10} label={"Files"} trackColor={"#222"}
                        indicatorColor={"var(--folly)"}
                        />
                </div>
                        
                )
            })
            }
            
        </section>
        </div>
    );
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
  