import { RatioImage } from '@/components/RatioImage'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Page.module.css'
import { RatioMedia } from '@/components/RatioMedia'
import Head from 'next/head'


export default function Home() {
  return (
  <div>
    <wrap className={styles.wrap}>

      <Head>
        <title>Aktuelt.tv</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/aktueltstudio_logo.svg" />
      </Head>

      <crossfade className={styles.crossfade}></crossfade>

      <background className={styles.bg}>
        <div className={styles.blur}> 
        <Image 
        className={styles.bg}
          fill
          src={"http://aktuelt.tv/api/v1/files?fileId=6ae7ec9b-9bf9-4032-baa3-c0b3f96e172b.JPG"}
          objectPosition='center'
          objectFit='cover  '
          ></Image>
        </div>
        <Image 
        className={styles.bg}
          src={"http://aktuelt.tv/api/v1/files?fileId=6ae7ec9b-9bf9-4032-baa3-c0b3f96e172b.JPG"}
          layout='fill'
          objectPosition='top'
          objectFit='cover  '
          ></Image>


      </background>
      <main className={styles.main}>
        

        <nav className={styles.nav}>
          <div>
            <Image width={50} height={50} src={"/aktueltstudio_logo.svg"}></Image>
            <h2>.tv</h2>
          </div>
          <Link href={"/dashboard"}>Files</Link>
        </nav>

        <div className={styles.description}>
          
          <Image width={200} height={200} src={"/aktueltstudio_logo.svg"}></Image>
          <p>Aktuelt Studio!</p>

        </div>
      </main>
    </wrap>
    <wrap className={styles.wrap}>
      
      
      <section className={styles.header}>
        <div className={styles.group}>
        <h3>Hva vil du se?</h3>
        <div className={styles.row} >
          
            <Link href="#desperados" className={styles.home}>
              <Image src={"https://gyazo.com/7c00c36443ec021a386311bf799da5b1.png"} layout="fill" objectFit='cover'/>
            </Link>
            <Link href="#papparau" className={styles.home}>
              <Image src={"https://gyazo.com/f12284bee733a43ccbda32243e30363e.jpg"} layout="fill" objectFit='cover'/>
            </Link>
            <Link href="" className={styles.home}>
              <Image src={"https://cdn.discordapp.com/attachments/1022453749211471882/1124131548724207666/Aktuellefarger.jpg"} layout="fill" objectFit='cover' objectPosition='center'/>
            </Link>
            <Link href="" className={styles.home}>
              <Image src={"https://gyazo.com/ef6b7b2905abc1fd9a4a8fc21d888cd1.png"} layout="fill" objectFit='cover' objectPosition='top'/>
            </Link>
        </div>
        
      </div>
      </section>


      <section className={styles.section}>
        <div className={styles.group} style={{padding: 0}}>
          
        </div>
      </section>

      <section id="desperados" className={styles.section}>
        <div className={styles.group}>
          <div className={styles.row}>         
            <div className={styles.image} style={{maxWidth: `none`}}>
              <Image src={"https://gyazo.com/8a452238e47a596ad2558bb71369bac1.gif"} layout="fill" objectFit='cover'></Image>
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
              <Image src={"https://gyazo.com/f12284bee733a43ccbda32243e30363e.jpg"} layout="fill" objectFit='cover' objectPosition='center'></Image>
            </div>
          </div>
        </div>
      </section>


    
  </wrap>
  </div>
  )
}
