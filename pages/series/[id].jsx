import { GetClient } from "@/lib/Supabase";
import FileSharingLayout from "@/layouts/FileSharingLayout";
import Link from "next/link";
import styles from '@/styles/FileSharing.module.css'
import { InputField } from "@/components";


function index({series}) {
    return (
            <div className={styles.settings_wrapper}>
                <h3>Headers</h3>
                <section style={{display: "flex", flexDirection: "column", gap: ".5rem"}}>
                    {series.episodes.length}
                </section>
                
            </div>
    );
}

export async function getStaticProps({ params }) {

    const { data, error } = await GetClient("public")
    .from("series")
    .select(`
        *,
        episodes (*)
    `)
    .eq("id", params.id)
    .single()

    console.log({data})

    return {
        props:{
            series: data,
        }
    }
}

export async function getStaticPaths() {

    const { data, error } = await GetClient("public")
    .from("series")
    .select("id")

    const paths = data.map( (series, i) => {return {params: {id: series.id + "" } } } )
    return {
      paths,
      fallback: 'blocking',
    };
  }


export default index;