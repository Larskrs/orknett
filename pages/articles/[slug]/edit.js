import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from "@/styles/newUI/articles.module.css"
import { InputField, TextArea } from "@/components";
import Image from "next/image";
import Layout from "@/layouts/newUI/ArticleLayout";
import Head from "next/head";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import { useState } from "react";
  
function index({article}) {

    const [preview, setPreview] = useState(false)

    return (
        <Layout>

            <Head>
                <title>{article.title}</title>
            </Head>

            <style jsx global>{`
                :root {
                    --background: var(--midnight);
                }
                textarea {all: unset;}
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

            <div className={styles.buttonTab}>
                <button onClick={() => {setPreview(false)}}style={{background: preview == false ? "var(--tekhelet)" : "var(--midnight-background)"}}>Rediger</button>
                <button onClick={() => {setPreview(true)}}style={{background: preview == true ? "var(--tekhelet)" : "var(--midnight-background)"}}>Forhåndsvis</button>
                
                <button onClick={() => {handlePublish()}} className={styles.publishChanges}>
                    Lagre Endringer
                </button>
            </div>
            <div className={styles.fields}>
                {article?.fields?.map((f, fid) => {
                    
                    return (
                        <section key={f.id} className={styles.field}>
                            {f?.title && <h3>{f?.title}</h3>}

                            <div className={styles.lines}>
                                {f?.lines && f?.lines?.map((line, i) => {
                                    return (
                                        <>
                                            {!preview && <TextArea onChange={(value) => {article.fields[fid].lines[i] = value}} placeholder="Dette er min nye linje..." defaultValue={line ? line : ""} key={i} />}
                                            {preview && <ReactMarkdown remarkPlugins={[[remarkGfm]]} key={i}>{line}</ReactMarkdown> }
                                        </>
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