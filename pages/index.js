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
          src={"https://gyazo.com/ef6b7b2905abc1fd9a4a8fc21d888cd1.png"}
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
      
      <section className={styles.section}>
        <div className={styles.group}>
          <div className={styles.row}>
            <div className={styles.card}>
              <h1>Hvem er <span className={styles.gradient}>vi?</span></h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae lectus ut justo fermentum porta a bibendum mi. Vivamus at interdum ligula, at mollis lacus. Morbi rhoncus convallis erat, et ullamcorper odio consectetur eu. Ut mollis libero egestas ipsum imperdiet hendrerit. Nunc fermentum sed leo at consectetur. Proin non pharetra sapien. Sed consectetur velit at tellus convallis mattis. Fusce placerat laoreet aliquam. Nunc sit amet orci venenatis, ullamcorper nulla sed, egestas purus. Quisque sagittis tincidunt diam ut eleifend.</p>
            </div>
            <div className={styles.image}>
              <Image src={"https://media.discordapp.net/attachments/1009799380796178475/1121922180524032051/Snapchat-3476154311.jpg?width=1207&height=905"} layout="fill" objectFit='cover'></Image>
            </div>
          </div>
        </div>
      </section>
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

      <section className={styles.section}>
        <div className={styles.group}>
          <div className={styles.row}>         
            <div className={styles.image} style={{maxWidth: `none`}}>
              <RatioImage src={"https://gyazo.com/a4d2ef3a3c5fa993aee234d5f1db8a33.jpg"} layout="fill" axis='height' objectFit='cover'></RatioImage>
            </div>
            <div className={styles.card}>
                <h2>Aktuelle <span className={styles.gradient}>spøkmakere</span></h2>
                <p>Bli med på en aktuell reise gjennom komforsonen og hvor langt en kan presse den i serien, Aktuelle spøkmakere.</p>
            </div>
          </div>
        </div>
      </section>
    
  </wrap>
  </div>
  )
}
