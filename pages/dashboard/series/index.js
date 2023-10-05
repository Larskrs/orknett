import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/FileSharing.module.css'
import { SeriesCard, Slider } from "@/components";


function index({data}) {

    return (
        <FileSharingLayout pageId={3}>
                {/* <Slider min={0} max={100} defaultValue={50} onChange={(e) => {console.log(e); setProgress(e)}}/> */}
            <div className={styles.wrap}>


                {data.map((series, i) => {
                    return (
                        <Link href={`/dashboard/series/${series.id}`}>
                            <SeriesCard key={i}
                                title={series.title}
                                poster={series.posters?.[0]}>

                            </SeriesCard>
                        </Link>
                    )
                })}
            </div>
        </FileSharingLayout>
    );
}

export async function getServerSideProps(ctx){

    const { req, res} = ctx

    const url = process.env.NEXTAUTH_URL + "/api/v1/media/series?limit=6"
    const request = await fetch(url)
    const json = await request.json()

    return {
        props:{
            data: json.data,
        }
    }
}

export default index;