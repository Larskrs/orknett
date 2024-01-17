import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from "@/styles/newUI/articles.module.css"
import { InputField } from "@/components";
import Image from "next/image";
import Layout from "@/layouts/newUI/ArticleLayout";


function index({article}) {

    return (
        <Layout>

            <style jsx global>{`
                :root {
                    --background: var(--midnight);
                }
            `}</style>

            <div className={styles.container}>
                <div className={styles.main}>

                    <h1>{article?.title}</h1>
                    {article?.description && <p className={styles.description}>{article?.description}</p>}
            <div className={styles.grid}>

            <article className={styles.article}>
                    <section className={styles.header}>
                    <div className={styles.feature}> 
                        <Image fill src={article?.feature ? article.feature : ""} alt="Feature Image"></Image>
                    </div>
                </section>
            <div className={styles.fields}>
                {article?.fields?.map((f) => {
                    
                    return (
                        <section key={f.id} className={styles.field}>
                            {f?.title && <h3>{f?.title}</h3>}

                            <div className={styles.lines}>
                                {f?.lines && f?.lines?.map((line, i) => {
                                    return (
                                        <p key={i}>{line}</p>
                                        )
                                    })}
                            </div>
                        </section>
                    )
                    
                })}
                
                </div>

                </article>
                <div className={styles.side}>
                    <Credit user={article.users} role={"Skrevet av"} />
                    {/* {article?.author && <p>Skrevet av: <Link href={"/profiler/"} >{article?.users?.name}</Link></p> } */}
                </div>
                </div>
            </div>
            
            </div>
        </Layout>
    );
}

function Credit ({user, role}) {
    return (
        <div className={styles.credit}>
            <Image width={50} height={50} src={user.image} />
            <span>{role}</span>
            <p>{user.name}</p>
        </div>
    )
}

export async function getStaticProps({ params }) {

    const { data, error } = await GetClient("public")
    .from("articles")
    .select(`
        *,
        users(*)
    `)
    .eq("slug", params.slug)
    .single();

    console.log(data)
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