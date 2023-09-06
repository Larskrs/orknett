import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/FileSharing.module.css'
import { InputField } from "@/components";


function index({article}) {
    return (
        <FileSharingLayout pageId={3}>
            <div className={styles.settings_wrapper}>
                <h3>Headers</h3>
                <section style={{display: "flex", flexDirection: "column", gap: ".5rem"}}>
                    <p>Title</p>
                    <InputField type="text" placeholder="Title..." defaultValue={article.headers.title} maxInputLength={32}/>
                    <p>Sub header</p>
                    <InputField type="text" placeholder="Subtitle..." defaultValue={article.headers.sub_header} maxInputLength={75} />
                </section>
                
            </div>
        </FileSharingLayout>
    );
}

export async function getStaticProps({ params}) {

    const url = process.env.NEXTAUTH_URL + `/api/v1/media/articles/${params.id}`
    const request = await fetch(url)
    const json = await request.json()

    return {
        props:{
            article: json.data,
        }
    }
}

export async function getStaticPaths() {

    const url = process.env.NEXTAUTH_URL + "/api/v1/media/articles?limit=5"
    const request = await fetch(url)
    const { data } = await request.json()

    console.log(data)

    const paths = data.map( (batch, i) => {return {params: {id: batch.id + "" } } } )
    console.log({paths: paths[0]})
    return {
      paths,
      fallback: 'blocking',
    };
  }


export default index;