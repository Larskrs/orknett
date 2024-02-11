import { useEffect, useState } from "react";
import InputField from "../inputfield/inputfield";
import styles from "./SearchBar.module.css"
import useDynamicFetch from "@/hooks/useDynamicFetch";
import Image from "next/image";
import FileElement from "@/components/FileElement";

export default function SearchBar ({
    searchUrl = ((query) => {}),
    placeholder = "Søk..."
}) {

    const {fetch, refetch, data, error, isLoading} = useDynamicFetch()
    const [query, setQuery] = useState("")

    useEffect(() => {
        console.log(data.data)
    }, [data])

    return (
        <div className={styles.container}>

            <div className={styles.input}>
                <input 
                    placeholder={placeholder}    
                    value={query}
                    onChange={(e) => {setQuery(e.target.value)}}
                    >
                </input>
                <button onClick={() => {fetch(searchUrl(query))}}>
                    Søk
                </button>
            </div>

            <div>{data && data.data && data.data.map((result) => {
                return <a key={result.id} style={{marginBlock: "1rem"}} href={result.source} >{result.fileName}</a>
            })}</div>

        </div>
    );
}