import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/MediaList.module.css'
import RoundedDiv from '@/components/RoundedDiv'
import BlurPanel from '@/components/BlurPanel'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      <Head>
        <title>22. Mai 2023</title>
        <meta name="description" content="Bilde serie fra " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.container}>
      
        <h2>Fotograf: Lars Kristian Småge Syvertsen</h2>
        <div className={styles.links}>
        <div className={styles.row}>
 
        </div> 
      </div>
      <div className={styles.main}>
          <section id="mystisk" className={styles.section}>

            <img src={`/images/projects/22052023/frimurer.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>1. Mystisk</h2>
            </div>
          </section>

          <section id="melankolsk" className={styles.section}>

            <img src={`/images/projects/22052023/melankolsk.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>2. Melankolsk</h2>
              <p>Bildet på døren minner de rundt om den gleden på andre siden, som døren hindrer dem å nyte.</p>
            </div>
          </section>

          <section id="futuristisk" className={styles.section}>

            <img src={`/images/projects/22052023/futuristisk.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>3. Futuristisk</h2>
             
            </div>
          </section>

           <section id="antikk" className={styles.section}>

            <img src={`/images/projects/22052023/antikk.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>4. Antikk</h2>
             
            </div>
          </section>
          
          <section id="fashionista" className={styles.section}>

            <img src={`/images/projects/22052023/fashionista.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>5. Fashionista</h2>
              <p>Big, Bold & Effectively Visible.</p>
             
            </div>
          </section>

          <section id="sprudlende" className={styles.section}>

            <img src={`/images/projects/22052023/sprudlende.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>6. Sprudlende</h2>
             
            </div>
          </section>

          <section id="beskjeden" className={styles.section}>

            <img src={`/images/projects/22052023/beskjeden.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>7. Beskjeden</h2>
             
            </div>
          </section>

        <section id="gråmus" className={styles.section}>

            <img src={`/images/projects/22052023/gråmus.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>8. Grå Mus</h2>
             
            </div>
        </section>

        <section id="alternativ" className={styles.section}>

            <img src={`/images/projects/22052023/alternativ.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>9. Alternativ</h2>
             
            </div>
        </section>

        <section id="rolig" className={styles.section}>

            <img src={`/images/projects/22052023/rolig.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>10. Rolig</h2>
             
            </div>
        </section>

        <section id="mektig" className={styles.section}>

            <img src={`/images/projects/22052023/mektig.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>11. Mektig</h2>
             
            </div>
        </section>

        <section id="moderne" className={styles.section}>

            <img src={`/images/projects/22052023/moderne.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>12. Moderne</h2>
             
            </div>
        </section>

        <section id="sporty" className={styles.section}>

            <img src={`/images/projects/22052023/sporty.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>13. Sporty</h2>
             
            </div>
        </section>

        <section id="mamamia" className={styles.section}>

            <img src={`/images/projects/22052023/mamamia.png`} alt="Flytende Bekk" /> 

            <div>
              <h2>14. Mama Mia</h2>
             
            </div>
        </section>



      </div>
      

      
        

    
      </div>
    </>
  )
}
