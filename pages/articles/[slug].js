import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from "@/styles/newUI/articles.module.css"
import { InputField } from "@/components";
import Image from "next/image";
import Layout from "@/layouts/newUI/ArticleLayout";


function index({article}) {

    console.log(article)

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.main}>
                <section className={styles.header}>
                    <div className={styles.feature}> 
                        <Image fill src={article?.feature ? article.feature : ""} alt="Feature Image"></Image>
                    </div>
                    <h1>{article?.title}</h1>
                </section>

            <div className={styles.fields}>


                <section className={styles.field}>
                    <h3>Hvilke stillinger kan jeg søke om?</h3>
                    <p>Vi trenger hjelp med lyssetting, scene oppsett, statister og grafisk design. </p>
                </section>
                <section className={styles.field}>
                    <h3>Hvem kan søke?</h3>
                    <p>Om du går på medier og kommunikasjon hos Hjalmar Johansen Videregående skole, kan du søke om mediarelevante stillinger, dessverre godtar vi ikke MK elever fra Larvik (Blodpenger). </p>
                </section>
                
                </div>
            </div>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ params }) {

    const { data, error } = await GetClient("public")
    .from("articles")
    .select(`
        *
    `)
    .eq("slug", params.slug)
    .single();
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