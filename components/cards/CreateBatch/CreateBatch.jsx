import { useEffect, useState } from "react"
import styles from "./CreateBatch.module.css"
import InputField from "../inputfield/inputfield"
import axios from "axios"
import { useRouter } from "next/router"

export default function CreateBatch ({session, children}) {
    
    const [error, setError] = useState("")
    const [batchName, setBatchName] = useState("")
    const [data, setData] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    async function PostData () {
    let res = null
    setError("")
    if (submitted) {
        return;
    }
    try {
        res = await axios.post(process.env.NEXT_PUBLIC_URL + "/api/v1/batches/create", {
                title: batchName
        })
        
        console.log(res)
        setData(res.data.data)
        setSubmitted(true)
        
    } catch (error) {
        // Handle errors
        setError(error.response.data.error)
    }
    }

    const router = useRouter()

    useEffect(() => {
        if (data) {
            console.log(`/dashboard/batches/${data.id}`)
            router.push(`/dashboard/batches/${data.id}`)
        }
    }, [data])


    if (session.status !== "authenticated") {
        return (<></>)
    }

    return (
        <>
            <div style={{cursor: "pointer"}} onClick={() => {setIsVisible(true)}}>
                {children}
            </div>
            <div style={{opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? "all" : "none"}} className={styles.deadzone} onClick={() => {setIsVisible(false)}} />

            {isVisible && <div className={styles.wrap}>
                <h2>Create Batch</h2>
                <p className={styles.error}>{error}</p>
                <InputField
                    placeholder={"Batch Name..."}
                    onValueChange={(value) => setBatchName(value)}
                    />
                <div className={styles.footer}>
                    <button onClick={async () => {setIsVisible(false)}}>Cancel</button>
                    <button disabled={submitted} style={{backgroundColor: "var(--ak-secondary)"}} onClick={async () => {await PostData()}}>Create</button>
                </div>
            </div> }
        </>
    )
}