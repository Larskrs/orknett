
import { LargeCard } from '@/components/index'

import { RatioImage } from '@/components/RatioImage'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/newUI/home.module.css'
import { RatioMedia } from '@/components/RatioMedia'
import Head from 'next/head'

export default function Home () {
  return (
    <>
      <div className={styles.pageContainer}> 
        <div>1</div>
        <div>
          <Link href={"search"}>Search</Link>
        </div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>3</div>
        <div>9</div>
      </div>
    </>  
  )
}