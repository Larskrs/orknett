import { useEffect, useState } from "react"
import styles from "./CreateBatch.module.css"
import InputField from "../inputfield/inputfield"
import axios from "axios"
import { useRouter } from "next/router"

export default function CreateBatch ({session}) {

    const [error, setError] = useState("")
    const [batchName, setBatchName] = useState("")
    const [data, setData] = useState(null)

    async function PostData() {
    let res = null
    try {
        res = await axios.post(process.env.NEXT_PUBLIC_URL + "/api/v1/batches/create", {
                title: batchName
        })
        
        console.log(res)
        setData(res.data.data)
        
    } catch (error) {
        // Handle errors
        setError(error.error)
    }
    }

    const router = useRouter()

    useEffect(() => {
        if (data) {
            console.log(`/dashboard/batches/${data.id}`)
            // router.push(`/dashboard/batches/${data.id}`)
        }
    }, [data])

    return (
        <div>
            <p>{error}</p>
            <InputField
                placeholder={"Name..."}
                onValueChange={(value) => setBatchName(value)}
            />
            <button onClick={async () => {await PostData()}}>Create</button>
        </div>
    )
}