import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/layouts/Loading.module.css"
import { useState } from "react";
import LoginButton from "@/components/LoginButton"
import Image from "next/image";

export default function Layout() {

    return (
            <div className={styles.loading}>
                <div className={styles.logo}>
                    <Image className={styles.logo} width={200} height={200} src={"/new_logo_symbol.svg"}></Image>
                </div>
            </div>
    );
}