import { Badge, SeriesCard, VideoPlayer } from "@/components";
import StreamingLayout from "@/layouts/StreamingLayout";
import { GetClient } from "@/lib/Supabase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/Streaming.module.css"

export default function StreamingHomePage({series}) {

    

    const [header, setHeader] = useState(0)
    function NextHeader () {
        let next = header + 1
        if (next > series.length -1) {
            next = 0;
        }
        setHeader(next)
    }

    useEffect(() => {
    
        // console.log(videoRef.current.duration);
        const interval = setInterval(() => {
            NextHeader()
        },10 * 1000);
        return () => clearInterval(interval);
      }, [header]);

    return (
        <StreamingLayout >
            <div className={styles.wrap}>
                <div className={styles.header} key={header}>
                    <div className={styles.image}>
                        <Image fill style={{objectFit: "cover"}} src={series[header]?.images?.thumbnail} />
                    </div>
                    <div className={styles.blurred}>
                        <Image fill style={{objectFit: "cover"}} src={series[header]?.images?.thumbnail} />
                    </div>

                    {/* DETAILS */}

                    <div className={styles.details}>
                        <div className={styles.logo}>
                            <Image fill src={series[header]?.images?.logo} />
                        </div>
                            {series?.[header]?.released_at && <p className={styles.year}>{series[header].released_at.split("-").shift()}</p>}
                        <div className={styles.tags}>
                            {series[header].tags.ageRating && <Badge>{series[header].tags.ageRating}</Badge>}
                            {series[header].tags.categories && series[header].tags.categories.map((category, i) => {
                                return (
                                    <p key={category+series[header].id} style={{animationDelay: i*100 + "ms"}}>{category}</p>
                                )
                            })}
                        </div>
                        {series[header].description && <p className={styles.description}>{breakTextLength(series[header].description, 100)}</p>}

                       <div className={styles.tags}>
                            {series[header].isReleased && <button className={styles.playShow} style={{background: (series[header]?.colors?.[0])}} >Spill av</button>}
                            {!series[header].isReleased && <button className={styles.playShow} style={{background: "transparent"}} >Kommer {series[header].released_at_string}</button>}
                            <Link href={"/"}>Les mer</Link>
                            <p></p>
                       </div>
                    </div>  
                </div>
                    
                    <div className={styles.top_streaming}>
                        {series.map((s,i) => {
                            return <div key={s.id} className={styles.series} onClick={() => setHeader(i)}>
                                <div className={styles.poster}>
                                    <Image fill style={{objectFit: "cover"}} src={s?.images?.poster} />
                                </div>
                                
                            </div>
                        })}
                    </div>


            </div>
        </StreamingLayout>
    );
}

function breakTextLength (text, characterLength) {
    let output = ""
    for (let i = 0; i < text.length; i++) {
        if (i >= characterLength) { output += "..."; break; }
        output += text[i]
    }
    return output
}

export async function getServerSideProps(ctx){

    const { req, res} = ctx

    let { data, error } = await GetClient("public")
    .from("series")
    .select(`
        *
    `)
    // .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    // .filter('files.source', 'in', ['png','jpg'])

    data.map((d) => {
        let s = d
        const releaseDate = new Date(d.released_at)
        const isReleased = releaseDate <= Date.now()

        const day = releaseDate.getDate();
        const month = releaseDate.getMonth() + 1; // Note that months are zero-based (0-11)
        const year = releaseDate.getFullYear();

        // Format the date as "dd/mm/yyyy"
        s.released_at_string = `${day} / ${month} / ${year}`;
        s.isReleased = isReleased      

        return s;
    })

    // console.log("[---------------------[ Loading Series ]------------------------]")
    // console.log(" ")
    // if (data) {
    //     for (let i = 0; i < data.length; i++) {
    //         console.log(
    //             `[${i}] ${EqualTextSpace(data[i]?.type, 6)} (${EqualTextSpace(data[i]?.tags?.ageRating ,3)}) ${data[i]?.title}`
    //         )
    //     }
    // } else {
    //     console.log(error)
    // }
    // console.log(" ")

    return {
        props:{
            series: data.filter((series) => series?.images != undefined),
        }
    }

}

function EqualTextSpace (text, length) {
    let output = ""
    if (text === undefined || text === null) {
            for (let i = 0; i < length; i++) {
                output += " "
            }
            return output;
    }
    for (let i = 0; i < length; i++) {
        if (i >= text.length) { 
            output += " "
            continue 
        }
        output += text[i]
    }
    return output
}
