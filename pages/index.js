
import { LargeCard } from '@/components/index'

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
  const [mousePosition, setMousePosition] = useState([0,0])
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
        width: "250px",
        height: "250px"
      }
    } else {

      return {
        width: "100px",
        height: "100px"
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
                {session.status === "authenticated" && <Link href={"/dashboard"} style={{display: "flex", flexDirection: "row", gap: 8, justifyContent: "center"}}>
                    <Image width={40} height={40} style={{borderRadius: "50%"}} src={session.data.user.image} />
                </Link> }
                {session.status !== "authenticated" && <Link href={"/auth/signin"}></Link> }
              </div>
        </nav>
        <header className={styles.header}>
          <div className={styles.descriptor_image}>
            <p>Foto: Lars Kristian Småge Syvertsen, bilde av: Mari Boine</p>
          </div>
          <div className={styles.image}>
            <Image fill src={"https://cdn.discordapp.com/attachments/1017698590690381884/1177739599204843581/image.png?ex=65739a79&is=65612579&hm=d21ef0bb3de2b065f014ec449966fc7ad1701fdbb1d7c4a77019540fc8b05412&"} />
          </div>
          <div className={styles.info}>
          <h1>
            <span>Fra tanke,</span>
            <span>til <span className={styles.highlight}>
                <div style={{translate: `0px -${productSpanText * 12}vmin`, padding: 0, margin: 0}}>
                  {productSpanTexts.map((p, i) => {
                    return <span style={{height: "12vmin",opacity: productSpanText == i ? "1": "0"}}>{p}</span>
                  })}
                </div>
              </span></span>
          </h1>
          <p>Vi hjelper deg med å få din bedrift eller virksomhet klar for lerretet. </p>
          <div className={styles.action}>
            <button onClick={() => {setTransitionPage("contact")}} >Kontakt Oss</button>
          </div>
          </div>
        </header>

        <section className={styles.projects}>
            <div className={styles.project}>
                <div className={styles.info}>
                    <h1>Arbeidsgiver
                    <div className={styles.arrow}>
                    →
                    </div>
                    </h1>
                    <p>"Maskin bom bom bom..." - Anne Lianne</p>
                    
                </div>
            </div>
            <div className={styles.project}>
                <div className={styles.info}>
                    <h1>Fjelldal materials
                    <div className={styles.arrow}>
                    →
                    </div>
                    </h1>
                    <p>"Jeg er en fiktiv arbeidsgiver" - Jens Usannson</p>
                    
                </div>
            </div>
        </section>

    </div>
  )
}