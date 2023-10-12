import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/FileSharing.module.css'
import { Stars } from "@/components";
import Image from "next/image";


function index({articles}) {
    return (
        <FileSharingLayout pageId={4}>
            <div className={styles.wrap}>
                {articles.map((article, i) => {
                    return (
                        
                        <Link key={i} className={styles.article} href={"/dashboard/articles/" + article.id}>

                            {article.thumbnail && <Image className={styles.thumbnail} style={{zIndex: -1, objectFit: "cover"}} src={article.thumbnail} alt={"thumbnail"} fill /> } 

                            <h3>{article.headers.title}</h3>
                            <p>{article.headers.sub_header}</p>
                        </Link>
                    )
                })}
            </div>
        </FileSharingLayout>
    );
}

export async function getServerSideProps(ctx){

    const { req, res} = ctx

    const url = process.env.NEXTAUTH_URL + "/api/v1/media/articles?limit=5"
    const request = await fetch(url)
    const json = await request.json()

    return {
        props:{
            articles: json.data,
        }
    }
}

export default index;