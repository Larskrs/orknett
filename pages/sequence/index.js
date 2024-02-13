import { GetClient, GetServiceClient } from "@/lib/Supabase";
import { useEffect, useState } from "react";
import styles from "../../styles/sequence.module.css"
import { useSearchParams } from "next/navigation";

export default function Sequence ({sequence}) {
    const [current, setCurrent] = useState(sequence.currentRow)
    const searchParams = useSearchParams()
    const control = searchParams.get('control')

    const currentStyle = {
        background: "var(--folly)",
        translate: "0px 0px",
        boxShadow: "0px 0px 16px black",
    }
    const rowStyle = {}

    useEffect(() => {

        // Join a room/topic. Can be anything except for 'realtime'.
        const channel = GetClient("public").channel('room-1')
            
        // Simple function to log any messages we receive
        function messageReceived(payload) {
          console.log(payload)
        }
        
        // Subscribe to the Channel
        channel
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'sequence'
          },
          (payload) => {
            setCurrent(payload.new.currentRow);

            const selectedItem = document.getElementById(`item${payload.new.currentRow}`);
            if (selectedItem) {
              selectedItem.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        )
        .subscribe()

    }, [current])

    return (
        <div>

        {control && <Control />}

        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {sequence.data.map((item, index) => (
                            <td key={index}>{item.title}</td>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {(() => {
                        const rows = [];
                        for (let i = 0; i < sequence.amount; i++) {
                            rows.push(
                                <tr id={`item${i}`} key={i} style={current == i ? currentStyle : i < current ? {opacity: current - i * .75} : rowStyle}>
                                    {Object.keys(sequence.data).map((item, index) => (
                                        <td style={
                                            i <= current && index == 0 ? {borderRight: "var(--folly) 4px solid"} : {}
                                        } className={styles[sequence.data[index].title]} key={index}>{sequence.data[index].values[i]}</td>
                                        ))}
                                </tr>
                            );
                        }
                        return rows;
                    })()}
                </tbody>
            </table>
        </div>
        </div>
    );

    async function ControlNext (newRow) {
        const { data, error } = await GetClient("public")
        .from("sequence")
        .update({currentRow: newRow})
        .eq("id", 1)
        .single();
    }

    function Control () {

        return (
            <div className={styles.controller}>
                <button onClick={() => {ControlNext(current -1)}}>Tilbake</button>
                <input defaultValue={current} onChange={(e) => {ControlNext(e.target.value)}}></input>
                <button onClick={() => {ControlNext(current +1)}}>Neste</button>
            </div>
        )

    }
};

export async function getServerSideProps(ctx){
    const { data, error } = await GetServiceClient("public")
        .from("sequence")
        .select('*')
        .eq("id", 1)
        .single();

    const amount = data.data[0].values.length; // Access the length of the 'values' array
    console.log(amount, data)
    return {
        props:{
            sequence: { ...data, amount }, // Pass 'amount' as a separate property
            error
        }
    };
}