import { useState } from "react"
import styles from "@/styles/Regneark.module.css"

export default function What ({}) {

    const boliger = [{
        navn: "Eierbolig 1",
        kostnad: 1500000,
        leiekostnad: 0,
        rente: 5.45,
        møbler: 30000,
        fordeler: "God nok plass til seg selv, mann og et barn."
    }, {
        navn: "Eierbolig 2",
        kostnad: 2390000,
        møbler: 30000,
        rente: 5.45,
        leiekostnad: 0,
        fordeler: "God nok plass til seg selv, mann og et barn."
    },
    {
        navn: "Leiebolig 1",
        kostnad: 0,
        møbler: 30000,
        leiekostnad: 7000,
        fordeler: "God nok plass til seg selv, mann og et barn.",
        depositum: 15000,
    }, {
        navn: "Leiebolig 2",
        kostnad: 0,
        møbler: 0,
        leiekostnad: 14000,
        depositum: 40000,
        fordeler: "God nok plass til seg selv, mann og et barn."
    }
    
]
    const [bolig, setBolig] = useState(0)
    const [låneÅr, setLåneÅr] = useState(20)

    const [eget, setEget] = useState(250000)
    const minimumEget = boliger[bolig].kostnad / 100 * 15
    const egetKrav = (eget - minimumEget)

    return (
        <div className={styles.wrap}>

            <div>{boliger.map((b, i) => {
                return <button style={{
                    background: bolig == i ? "#111" : "#222"
                }} key={i} onClick={() => {setBolig(i)}}>{b.navn}</button>
            })}</div>

            <div className={styles.bolig}>
                <h2>{boliger[bolig].navn}</h2>
                {boliger[bolig].depositum && <p>Depositum {Formater(boliger[bolig].depositum)}</p> }
                {boliger[bolig].leiekostnad && <p>Leiekostnad {Formater(boliger[bolig].leiekostnad)}</p> }

                <h2 style={{
                    color: egetKrav > 0 ? "#3bf33b" : "red"
                }}>{Formater(egetKrav)}</h2>

                <h2 style={{
                     color: egetKrav > 0 ? "#3bf33b" : "red"
                }}>
                    Du har{egetKrav > 0 ? " " : " ikke "}nok eget kapital til dette lånet.</h2>
                
            </div>

            <table>
  <tr>
    <th>År</th>
    <th>Restlån</th>
    <th>Rente Beløp</th>
    <th>Rente pr. mnd</th>
    <th>Terminbeløp pr. mnd</th>
    <th>Pris Økning</th>
  </tr>

            <LåneRegner />
            
  
</table>
        </div>
    )

    function Formater (verdi) {
        let NokKroner = new Intl.NumberFormat('no-NO', {
            style: 'currency',
            currency: 'NOK',
        });

        return NokKroner.format(verdi)
    }


    function LåneRegner () {


            let avdrag = boliger[bolig].kostnad / låneÅr
            let restlån = boliger[bolig].kostnad
            restlån += avdrag // Dette gjør vi slik at det første året og siste stemmer.
            let rentebeløp = (restlån/100)*boliger[bolig].rente
            let terminBeløp = avdrag + rentebeløp
            let økning = 0
            return (<>
            
            {Array.from(Array(låneÅr).keys()).map((_i) => {
                
                const i = _i + 1

                restlån = restlån - avdrag
                rentebeløp = (restlån/100)*boliger[bolig].rente
                terminBeløp = rentebeløp + avdrag

                return (
                    <tr key={i}>
                        <td>År {i}</td>
                        <td>{Formater(restlån)}</td>
                        <td>{Formater(rentebeløp)}</td>
                        <td>{Formater(rentebeløp/12)}</td>
                        <td>{Formater(terminBeløp/12)}</td>
                        {/* Prisøkning */}
                        <td>{Formater(økning)}</td>
                    </tr>
                )
                })}
            </>
            )

    }
}