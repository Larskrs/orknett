import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from "@/styles/newUI/articles.module.css"
import { InputField } from "@/components";
import Image from "next/image";


function index({article}) {

    console.log(article)

    return (
            <div className={styles.container}>
                <div className={styles.main}>
                <header className={styles.header}>
                    <Image height={250} width={250} src={"http://aktuelt.tv/api/v1/files?fileId=6d42d853-3e41-4926-b245-6b41569154b0.png"}></Image>
                    <h1>{article?.title}</h1>
                </header>


                </div>
            </div>
    );
}

export async function getStaticProps({ params }) {

    const { data, error } = await GetClient("public")
    .from("articles")
    .select(`
        *
    `)
    .eq("slug", params.slug)
    .single()

    // console.log(data)
    return {
        props:{
            article: data,
        }
    }
}

export async function getStaticPaths() {

    const { data, error } = await GetClient("public")
    .from("articles")
    .select("slug")

    const paths = data.map( (articles, i) => {return {params: {slug: articles.slug + "" } } } )
    return {
      paths,
      fallback: 'blocking',
    };
  }


export default index;