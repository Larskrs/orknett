import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import RoundedDiv from '@/components/RoundedDiv'
import LoginButton from '@/components/LoginButton'
import { GetClient } from '@/lib/Supabase'
import Link from 'next/link'
import FileSharingLayout from '@/components/FileSharingLayout'
import { RatioImage } from "@/components/RatioImage"
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })



export default function Home({items}) {

  const [previewId, setPreviewId] = useState("")

  return (
    <FileSharingLayout>
      
        
      <div className={styles.container}>
      <div className={styles.grid}>
        
        <Link href={"/projects/aktueltnytt/SosialeMedier"}>AktueltNytt</Link>

        <div className={styles.work}>
          <h2>{previewId}</h2>
          <div className={styles.workGrid}>
            {items.map((item, index) => {

              if (index < 4 || index > 8  ) { return; }

              return (
                <div key={index} className={styles['item' + parseFloat(index + 1 - 4)]} style={{position: `relative`}}>
                  <div className={styles.workDetail}>
                    {/* <p>{item.title ? item.title : "Oppgave " + (index + 1)}</p> */}
                    <div>
                      {/* <img src={item.source} className={styles.avatar} /> */}
                      {/* <p>1MEA</p> */}
                    </div>
                    <div className={styles.workOptions}>
                      {/* <p>Redigering</p> */}
                      {/* <p>Foto</p> */}
                    </div>
                    <Image src={item.source} layout='fill' quality={5} objectFit='cover'/>
                  </div>
                </div>
              )
            
            })}

          </div>
          <div className={styles.details}>

            <LoginButton />

              <Link className={styles.buttonLink} href={"/upload"}>Upload</Link>

          </div>
        </div>
        <div className={styles.right}>
        <h2 >Nyeste Bilder</h2>
          {items.map((item, index) => {
            return (
                <div key={index} onClick={() => {setPreviewId(item.source)}}>

                <RatioImage quality={5} src={item.source} >
                  {/* <h2 style={{color: "white"}}>Image</h2> */}
                </RatioImage>

                </div>
                )

          })}
        </div>
        

    </div>

    { previewId != "" &&

          <div onClick={() => {setPreviewId("")}} className={styles.preview}>
              <RatioImage quality={75} src={previewId} axis='height' />
          </div>
        }
      </div>


    </FileSharingLayout>
  )
}


export async function getServerSideProps(ctx){

  const { data, error } = await
  GetClient()
  .from("files")
  .select("*")
  .order("created_at", {
    ascending: false
  })
  .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)

  console.log({data, error})

  return {
    props:{
      items: data
    }
  }
}


