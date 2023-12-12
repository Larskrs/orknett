
import { ArticleCard, LargeCard, UserDropMenu } from '@/components/index'

import { RatioImage } from '@/components/RatioImage'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/newUI/home.module.css'
import { RatioMedia } from '@/components/RatioMedia'
import Head from 'next/head'
import Layout from '@/layouts/newUI/layout'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home () {

  const [productSpanText, setProductSpanText] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [transitionPage, setTransitionPage] = useState(null)
  const availableSpans = [
    "Produkt", 
    "Film",
    "Bilde",
    "Reklame",
    "Dokumentar",
    "Serie",
    "TV",
    "Highlight",
    "Produksjon",

  ]
  const [productSpanTexts, setProductSpanTexts] = useState([...availableSpans])

  useEffect(() => {
    const interval = setInterval(() => {
      let next = productSpanText + 1
      if ((next + 1) > productSpanTexts.length) {
        // setProductSpanTexts(productSpanTexts => [...productSpanTexts, ...availableSpans], next)
        next = 0
        console.log(productSpanTexts)
      }
      setProductSpanText(next)
    }, 1000);
    return () => clearInterval(interval);
  }, [productSpanText])

  useEffect(() => {
    const ball = document.getElementById("ball");

    let mouseX = 0;
    let mouseY = 0;

    let ballX = 0;
    let ballY = 0;

    let speed = 0.05;


    function animate(){

      let distX = mouseX - ballX;
      let distY = mouseY - ballY;


      ballX = ballX + (distX * speed);
      ballY = ballY + (distY * speed);

      ball.style.left = ballX + "px";
      ball.style.top = ballY + "px";

      requestAnimationFrame(animate);

      const element = document.elementFromPoint(mouseX, mouseY)

        if (element) {
          const styles = window.getComputedStyle(element);
          const cursorStyle = styles.getPropertyValue('cursor');
    
          if (cursorStyle === 'pointer') {
            // The element being hovered has a pointer cursor style
            console.log('Element has a pointer cursor style!');
            setIsHovering(true)
          } else {
            setIsHovering(false)
          }
        }
    }

  
    animate();

      document.addEventListener("mousemove", function(event){
        mouseX = event.pageX;
        mouseY = event.pageY;
      })
    
  }, []);

  const router = useRouter()

  useEffect(() => {
    if (transitionPage == "" || transitionPage === undefined || transitionPage === null) {
        return;
    }
    const interval = setInterval(() => {
      router.push(transitionPage)
    }, 1000);
    return () => clearInterval(interval);
  }, [transitionPage])

  const session = useSession()

  const ballStyle = () => {

    if (transitionPage) {
      return {
        width: "314vw",
        height: "314vw",
        transitionDuration: "1s",
        zIndex: "999",
        background: "var(--background)"
      }
    }
    if (isHovering) {
      return {
        width: "0px",
        height: "0px"
      }
    } else {

      return {
        width: "0px",
        height: "0px"
      }
    }
    

}

  return (
    <div className={styles.container}>

        <div id="ball" style={ballStyle()} className={styles.ball}></div>

          <nav className={styles.nav}>
              <div style={{marginRight: "1.2em"}}>
                <Image width={100} height={40} src={"/new_logo.svg"}></Image>
                {/* <h2>.tv</h2> */}
              </div>
              <Link href={"/profiles"}>Profiler</Link>
              <Link href={"/projects"}>Prosjekter</Link>
              <p style={{cursor: "pointer"}} onClick={() => {setTransitionPage("contact")}}>Kontakt Oss</p>
              <div style={{marginLeft: "auto", marginRight: 24}}>
                {session.status === "authenticated" && 
                    <UserDropMenu avatar={session.data.user.image} name={session.data.user.name} />
                }
                {session.status !== "authenticated" && <Link href={"/auth/signin"}>Log In</Link> }
              </div>
        </nav>
        <header className={styles.header}>
          <div className={styles.descriptor_image}>
            <p>Foto: Lars Kristian Småge Syvertsen, bilde av: Daniel Grimsrud Hagen</p>
          </div>
          <div className={styles.image}>
            <Image fill src={"http://aktuelt.tv/api/v1/files?fileId=d8e5e400-ec12-4c7d-babe-3d95ad75d0e7.JPG"} />
          </div>
          <div className={styles.info}>
          <h1>
            <span>Fra tanke,</span>
            <span>til <span className={styles.highlight}>
                <div style={{translate: `0px -${productSpanText * 12}vmin`, padding: 0, margin: 0}}>
                  {productSpanTexts.map((p, i) => {
                    return <span key={p} style={{height: "12vmin",opacity: productSpanText == i ? "1": "0"}}>{p}</span>
                  })}
                </div>
              </span></span>
          </h1>
          <p>Vi hjelper deg med å få din bedrift eller virksomhet klar for lerretet. </p>
          <div className={styles.action}>
            <button onClick={() => {setTransitionPage("contact")}} >Kontakt Oss</button>
            <p>Lorem Ipsum...</p>
          </div>
          </div>
        </header>

        {/* <section className={styles.projects}>
            <div className={styles.project}>
                <div className={styles.info}>
                    <h1>Arbeidsgiver
                    <div className={styles.arrow}>
                    →
                    </div>
                    </h1>
                    <p>{`"Maskin bom bom bom..." - Anne Lianne`}</p>
                    
                </div>
            </div>
            <div className={styles.project}>
                <div className={styles.info}>
                    <h1>Fjelldal materials
                    <div className={styles.arrow}>
                    →
                    </div>
                    </h1>
                    <p>{`"Jeg er en fiktiv arbeidsgiver" - Jens Usannson"`}</p>
                    
                </div>
            </div>
        </section> */}

        <p style={{marginLeft: 16, padding: 8, width: "fit-content", background: "var(--jet)"}}>Denne siden er ikke ferdig og representerer ikke et ferdig produkt eller bilde av Aktuelt Studio</p>
        <section className={styles.gallery}>
            <ArticleCard title={"Nytt kontrollvindu!"} tags={[{text: "Oppdatering", color: "#222"}]} description={"Et nytt vindu for å lettere kunne flytte deg gjennom nettsiden. Trykk på profilbildet ditt for å åpne menyen."} image={"http://aktuelt.tv/api/v1/files?fileId=268d7464-c10b-4d0d-a59e-6a57e67e587e.png"} />
            <ArticleCard title={"Aktuelt Nå, tilbakeblikk"} tags={[{text: "Podcast", color: "var(--ak-secondary)"},{text: "Nyheter", color: "var(--tekhelet)"}]} description={"Som dere kan se, så er jeg er kanskje en litt eldre podcast enn dere andre."} image={"http://aktuelt.tv/_next/image?url=%2Fapi%2Fv1%2Ffiles%2Fvideos%2Fthumbnail%3FfileId%3D86c515d3-8702-4718-82f8-8a46baef7e88.webm&w=1920&q=75"} />
            <ArticleCard title={"Bilde informasjon"} tags={[{text: "Fotografering", color: "var(--magenta-haze)"},{text: "Oppdatering", color: "#222"}]} description={"I en kommende oppdatering vil det bli mulig å se blender, lukkertid og flere detaljer fra bilder."} image={"http://aktuelt.tv/api/v1/files?fileId=c94a42d9-d7b2-417d-9d64-76e394389fee.JPG"} />
            <ArticleCard title={"Vinter inspirasjon"} description={"En rekke inspirasjon for vinterland. "} image={"http://aktuelt.tv/api/v1/files?fileId=aad2db12-8dd8-4306-b6d2-254e5b87d002.JPG"} />
        </section>

    </div>
  )
}