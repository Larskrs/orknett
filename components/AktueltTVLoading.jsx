import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/layouts/Loading.module.css"
import { useState } from "react";
import LoginButton from "@/components/LoginButton"
import Image from "next/image";

export default function Layout() {

    return (
            <div className={styles.loading}>
                <Image className={styles.bg} width={2000} height={2000} src={"/images/loadingbg.jpg"}></Image>
                <Image className={styles.logo} width={200} height={200} src={"/aktueltstudios.svg"}></Image>
            </div>
    );
}