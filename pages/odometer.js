import { useState } from "react";

export default function Odometer () {

    const [number, setNumber] = useState("CLICK HERE")
    const [input, setInput] = useState(0)

    const words = [
        "  LARSKRS ",
        "NERDWALKER",
        "    VIX   ",
        "   HAGEN  ",
        " FUNKONERD"
    ]

    const abc = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
    return (
        <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <div onClick={() => {setInput(input + 1); setNumber(words[input])}} style={{display: 'flex', flexDirection: 'row', height: 40, overflow: "hidden"}}>
                {number.split('').map((c,i) => {
                    
                    console.log(c)
                    const digit = abc.findIndex(char => char === c);

                    return <div key={i} style={{translate: `0 ${(digit) * -40}px`, display: "flex", flexDirection: "column", transitionDuration: `${(i)*.25}s`, transitionTimingFunction: "ease"}}>
                        {abc.map((num, i) => {
                            return <p key={i} style={{margin: 0, fontSize: 40, height: "40px", width: "30px", display: 'flex', alignItems: "center", justifyContent: "center"}}>{num}</p>
                        })}
                    </div>

                })}
            </div>

                <p>IDE: Du får opp navnet på en spiller og skal gjette hvilke bilder den lastet opp.</p>

        </div>
    );
}