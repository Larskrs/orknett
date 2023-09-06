import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/FileSharing.module.css'


function index({articles}) {
    return (
        <FileSharingLayout pageId={3}>
            <div className={styles.wrap}>
                {articles.map((article, i) => {
                    return (
                        
                        <Link key={i} className={styles.article} href={"/articles/" + article.id}>
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