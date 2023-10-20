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
                    
                </section>
                
            </div>
        </FileSharingLayout>
    );
}

export async function getStaticProps({ params }) {

    const { data, error } = await GetClient("public")
    .from("series")
    .select("*")
    .eq("id", params.id)
    .single()

    return {
        props:{
            article: data,
        }
    }
}

export async function getStaticPaths() {

    const { data, error } = await GetClient("public")
    .from("series")
    .select("id")

    console.log({data})

    const paths = data.map( (series, i) => {return {params: {id: series.id + "" } } } )
    console.log({paths: paths[0]})
    return {
      paths,
      fallback: 'blocking',
    };
  }


export default index;