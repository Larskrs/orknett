import { RatioImage } from '@/components/RatioImage'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Page.module.css'
import { RatioMedia } from '@/components/RatioMedia'
import Head from 'next/head'
import { useSession } from 'next-auth/react'


export default function Home() {

  const session = useSession()

  return (
  <div>

      <Head>
        <title>Aktuelt.tv</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/new_logo_symbol.svg" />
      </Head>

      {/* <crossfade className={styles.crossfade}></crossfade> */}

    <wrap className={styles.wrap}>
      <background className={styles.bg}>
        {/* <div className={styles.blur}> 
        <Image 
        className={styles.bg}
          fill
          src={"http://aktuelt.tv/api/v1/files?fileId=6ae7ec9b-9bf9-4032-baa3-c0b3f96e172b.JPG"}
          style={{objectFit: "cover", objectPosition: "center", width: "100%", height: "100%"}}
          ></Image>
        </div> */}
        <video 
          src={"http://aktuelt.tv/api/v1/files/videos?quality=360&fileId=cda1d6fa-e773-4f3c-b9bb-50f475e5f59a.mp4"}
          autoPlay
          playsInline
          muted
          preload="metadata"
          loop
          poster={"http://aktuelt.tv/api/v1/files?fileId=15feab38-2a04-4e74-baf0-07a0383e1830.png"}
          >
          
        </video>

        <Image style={{position: "absolute", zIndex: 10, translate: "-50% -50%", left: "50%", top: "50%", maxWidth: 300}} src={"/new_logo.svg"} fill />

      </background>
      <crossfade className={styles.crossfade} />
      <nav className={styles.nav}>
          <div>
            <Image width={40} height={40} src={"/new_logo_symbol.svg"}></Image>
            {/* <h2>.tv</h2> */}
          </div>
          <Link href={"/dashboard"}>Serier</Link>
          <div style={{marginLeft: "auto", marginRight: 24}}>
            {session.status === "authenticated" && <Link href={"/dashboard"} style={{display: "flex", flexDirection: "row", gap: 8, justifyContent: "center"}}>
                <Image width={40} height={40} style={{borderRadius: "50%"}} src={session.data.user.image} />
            </Link> }
            {session.status !== "authenticated" && <Link href={"/auth/signin"}>Log In</Link> }
          </div>
        </nav>
      <main className={styles.main}>

        <div className={styles.description}>
          

        </div>
      </main>
    </wrap>
    <wrap className={styles.wrap}>
      
      
      <section className={styles.header}>
        {/* <div className={styles.group}>
        <h3>Hva vil du se?</h3>
        <div className={styles.row} >
          
            <Link href="#desperados" className={styles.home}>
              <Image src={"https://gyazo.com/7c00c36443ec021a386311bf799da5b1.png"} fill style={{objectFit: "cover", objectPosition: "center"}}/>
            </Link>

        </div>
        
      </div> */}
      </section>


      <section className={styles.section}>
        <div className={styles.group} style={{padding: 0}}>
          <h2>Prosjekter</h2>
        </div>
      </section>


      <section id="desperados" className={styles.section}>
        <div className={styles.group}>
          <div className={styles.row}>         
            <div className={styles.image} style={{maxWidth: `none`}}>
              <video src={"http://aktuelt.tv/api/v1/files?fileId=ce3359a0-8176-4fa7-aa6d-7b1a4aea2167.mp4"} fill autoPlay preload="metadata" loop poster={"http://aktuelt.tv/api/v1/files?fileId=15feab38-2a04-4e74-baf0-07a0383e1830.png"} playsInline style={{objectFit: "cover", objectPosition: "center", width: "100%", height: "100%"}}></video>
            </div>
            <div className={styles.card}>
                <h2>Desperados, Banditos,</h2>
                <h2> & <span className={styles.gradient}>Litagos</span></h2>
                <p>
                Bli med på et spennende eventyr i det ville vesten, der skjulte hemmeligheter og farlige allianser truer livene til våre helter. Etter et brutalt drap, setter Jesse Morgan og den nyutslupne Billy Ringo ut på en farefull reise for å avdekke sannheten om den verdifulle skatten kalt 
Litagoen. Med nådeløse fiender i hælene og uventede vendepunkter, er det en kamp mot klokken for å finne skatten før det er for sent. Opplev en actionfylt western-film som tar deg med på et episk eventyr fylt med spenning, mysterier og kampen om Litagoen.
                </p>
            </div>
          </div>
        </div>
      </section>


      <section id="papparau" className={styles.section}>
        <div className={styles.group}>
          <div className={styles.row}>         
            <div className={styles.card}>
                <h2>Papparau</h2>
                <p>Barn vil ikke <span className={styles.gradient}>elske! </span>
                Den sjarmerende one hit wonder <span className={styles.gradient}>Ap Aarau</span> er Papparau i denne nye barneserien om gode gamle barnebøker. En nyere lesing med mormonske verdier.
                Bli med på reisen med <span className={styles.gradient}>Papparau</span> gjennom velkjente fortellinger fra ghettoen og stuebordet!
                </p>
                
            </div>
            <div className={styles.image} style={{maxWidth: `none`}}>
              <Image src={"https://gyazo.com/f12284bee733a43ccbda32243e30363e.jpg"} fill style={{objectFit: "cover", objectPosition: "center"}}></Image>
            </div>
          </div>
        </div>
      </section>


    
  </wrap>
  </div>
  )
}
