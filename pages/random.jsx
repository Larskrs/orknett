
import Image from "next/image";
import { useState, useEffect } from "react";
import { GetContentTypeFromSource, GetExtensionFromSource } from "@/lib/ExtensionHelper";
import { AudioPlayer, Badge } from "@/components";
import styles from "@/styles/FileSharing.module.css"

export default function() {

    
    const [display, setDisplay] = useState(null)
    const [displayId, setDisplayId] = useState(-1)

    const fetchData = async () => {
        try {
          const response = await fetch(`/api/v1/files/random`); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          console.log(jsonData)
          setDisplay(jsonData.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    function DisplayElement () {

        const content = GetContentTypeFromSource(display.source)
        const contentType = content.split("/").shift();
        
        if (contentType == "image") {
            return (
                <Image
                    key={displayId}
                    alt={display.fileName}
                    src={display.source}
                    style={{objectFit: "contain"}}
                    fill
                    content={GetContentTypeFromSource(display.source)}
                 />
            )
        }
        if (contentType == "audio") {
    
            return (
                <div className={styles.display_element}>
                    <AudioPlayer alt={display.fileName} src={display.source} cover={`/api/v1/files/audio/cover?fileId=${display.source.split("fileId=").pop()}`} /> 
                </div>
            )
        }
        if (contentType == "video") {
            return (
                <video 
                    key={displayId}
                    className={styles.display_element}
                    alt={display.fileName}
                    src={display.source}
                    content={GetContentTypeFromSource(display.source)} 
                    controls
                    autoPlay
                        
                />
            )
        }
        else {
            return (
                <div className={styles.display_unknown_element} key={displayId}>
                    <h2>.{GetExtensionFromSource(display.source)}</h2>
                    <h3>{display.fileName}</h3>
                </div>
            )
        }
        
    
    }
    useEffect(() => {
        
    
        fetchData(); // Fetch data initially
    
        const intervalId = setInterval(() => {
          fetchData(); // Fetch data at regular intervals
        }, 10000); // Replace 60000 with your desired interval in milliseconds (e.g., 60000 milliseconds = 1 minute)
    
        return () => {
          clearInterval(intervalId); // Clean up the interval when the component unmounts
        };
      }, []);

    return (
        <div>
            {/* <button style={{zIndex:99999999, position: "fixed", left: 0, top: 0}} onClick={fetchData}>Fetch</button> */}
            <div style={{zIndex:9999, position: "fixed", left: "1rem", bottom: "1rem"}} onClick={fetchData}>
                <Badge>
                    <h1>Hjalmar Awards 2024</h1>
                </Badge>
            </div>
            {display && <DisplayElement onClick={() => {fetchData()}} /> }
        </div>
    );
}