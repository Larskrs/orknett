
import { DateField, InputField } from "@/components"
import styles from "@/styles/Boarding.module.css"
import { useState } from "react"

export default function Boarding () {

    const [current, setCurrent] = useState(0)
    function NextStep () {
        setCurrent(current +1)
    }

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h2>{requiredData[current].title}</h2>
                <p>{requiredData[current].details}</p>
                <div>
                    {requiredData[current].fields.map((f) => {
                        if (f.type === "TEXT")
                        return (
                            <InputField placeholder={f.placeholder} style={{background: "var(--folly)"}} />
                        )
                        if (f.type === "DATE")
                        return (
                            <DateField placeholder={f.placeholder} />
                        )
                    })}
                <button onClick={() => {NextStep()}} >Send</button>
                </div>
            </div>
        </div>
    )

}


const requiredData = [
    {
        title: "Hva heter du?",
        details: "Navnet du oppgir vil ikke være synlig uten direkte fårespørsel.",
        fields: [
            {
                type: "TEXT",
                placeholder: "Fornavn"
            },
            {
                type: "TEXT",
                placeholder: "Etternavn"
            }
        ]
    }, 
    {
        title: "Hvor gammel er du?",
        details: "Din bursdag blir ikke offentlig tilgjengelig.",
        fields: [
            {
                type: "DATE",
                placeholder: "Når har du bursdag?"
            }
        ]
    }
]