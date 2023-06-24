import { RatioImage } from '@/components/RatioImage'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Page.module.css'
import { RatioMedia } from '@/components/RatioMedia'

export default function Home() {
  return (
  <div>
    <wrap className={styles.wrap}>

      <crossfade className={styles.crossfade}></crossfade>

      <background className={styles.bg}>
        <div className={styles.blur}> 
        <Image 
        className={styles.bg}
          src={"/images/pexels-steve-johnson-1704119.jpg"}
          layout='fill'
          objectPosition='center'
          objectFit='cover  '
          ></Image>
        </div>
        <Image 
        className={styles.bg}
          src={"https://gyazo.com/ef6b7b2905abc1fd9a4a8fc21d888cd1.png"}
          layout='fill'
          objectPosition='top'
          objectFit='cover  '
          ></Image>


      </background>
      <main className={styles.main}>
        

        <nav className={styles.nav}>
          <h2>Aktuelt.tv</h2>
        </nav>

        <div className={styles.description}>
          
          <h1>Aktuelt.tv</h1>
          <p>En aktuell tv for deg!</p>

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
              <Image src={"https://gyazo.com/71db34d40de884010a5f5a16af490592.jpg"} layout="fill" objectFit='cover' objectPosition='center'/>
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
                <p>Vårt nyeste <span className={styles.gradient}>prosjekt! </span>
                Desperados, Banditos, & Litagos er en ny western inspirert action kortfilm med mye morro på lager!</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pride" className={styles.section} >
        <div className={styles.group} >
          <h2 style={{marginLeft: 0}}>Aktuelt feirer <span className={styles.gradient} style={{background: "-webkit-linear-gradient(#7ed1f9, #24ff25, #24ff3b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>Pride</span></h2>
          <p>Lucas Langvarp Gjernes viser sin støtte til <Link href={"https://i.gyazo.com/0beef75fd7a4ce52d94aa47c0cd6caa6.mp4"}><span className={styles.gradient} style={{background: "-webkit-linear-gradient(#7ed1f9, #24ff25, #24ff3b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>Pride her:</span></Link></p>
          <div className={styles.row} >         
            <div className={styles.image} style={{maxWidth: `none`}}>
              <Image src={"https://gyazo.com/56f0525cd29599741973ad6909327e05.png"} layout="fill" objectFit='cover'></Image>
            </div>
            <div className={styles.image} style={{maxWidth: `none`}}>
              <Image src={"https://gyazo.com/4c968d1aba46e6c83a8dd1c9b0506b0b.png"} layout="fill" objectFit='cover' objectPosition='top'></Image>
            </div>
            <div className={styles.image} style={{maxWidth: `none`}}>
              <Image src={"https://gyazo.com/90129b6caf2db73f89e97564966836e6.png"} layout="fill" objectFit='cover'></Image>
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
