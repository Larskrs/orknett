import { isSourceContentType } from '@/lib/ExtensionHelper';
import { FastAverageColor } from 'fast-average-color';
import { useEffect, useState } from 'react';


export default function ColorImage ({source}) {
    
    const [color, setColor] = useState("")
    const fac = new FastAverageColor();
    
    
    useEffect(() => {

        if (source.toLowerCase().includes(['.png', '.jpg', '.jpeg'])) {
            return;
        }

        fac.getColorAsync(source)
        .then(color => {
            setColor(color.hex)
        })
        .catch(e => {
            console.log(e);
        });
    }, [])
    
    return (
        <div style={{backgroundColor: color, width: "100%", height: "100%", position: "absolute", left: 0, top: 0, transition: "all 1s 0s ease"}}>
            
        </div>
    );
}

