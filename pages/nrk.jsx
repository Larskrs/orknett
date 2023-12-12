import useGlobalFetch from "@/hooks/useGlobalFetch"
import { useEffect, useState } from "react"
import Parser from "rss-parser"

let parser = new Parser()
export default function Nyheter ({ }) {

    const [articles, setArticles] = useState([])
    
    useEffect(() => {
        parser.parseURL("https://www.nrk.no/toppsaker.rss").then((parsed) => {
            setArticles(parsed)
            console.log(parsed)
        })
    }, [])

    return (
        <div>
            {articles.items && articles.items.map((a) => {

                return (
                    <div key={a.title}>
                        <div style={{display: "flex", gap: 8, width: "fit-content"}}>
                            {
                                    a?.categories?.map((c) => {
                                        if (typeof c === 'string' || c instanceof String) {
                                            return <p key={c} style={{padding: "4px 8px", background: "#222"}}>{c}</p>
                                        }
                                    })
                            }
                        </div>
                        <h2>{a.title}</h2>
                        <p>{a.content}</p>
                    </div>
                )
            })}
        </div>
    )

}


