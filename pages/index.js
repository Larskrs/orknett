
import { ArticleCard, LargeCard, UserDropMenu } from '@/components/index'

import { RatioImage } from '@/components/RatioImage'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/newUI/home.module.css'
import { RatioMedia } from '@/components/RatioMedia'
import Head from 'next/head'
import Layout from '@/layouts/newUI/ArticleLayout'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useViewDown from '@/hook/useViewDown'
import usePageBottom from '@/hook/useBottom'
import { GetClient } from '@/lib/Supabase'

export default function Home ({articles}) {

  const isNavDown = useViewDown(72)
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
    <Layout>

        <div id="ball" style={ballStyle()} className={styles.ball}></div>

        <header className={styles.header}>
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
            <button onClick={() => {setTransitionPage("contact")}} >Kontakt oss</button>
          </div>
          </div>
        </header>

        <section className={styles.gallery}>
          {articles.data.map((article, i) => {
            return (
              <ArticleCard key={article.slug} link={`/articles/${article.slug}`} title={"Ny film, nye folk!"}  description={article.description} contain image={article.thumbnail} />
            )
           })}
        </section>


    </Layout>
  )
}

export async function getStaticProps() {

  const articles = await GetClient("public")
  .from("articles")
  .select(`
      *,
      users(*)
  `)

  return {
      props:{
          articles: articles,
      }
  }
}