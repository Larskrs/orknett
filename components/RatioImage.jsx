import React, { FC, useState } from 'react';
import Image from 'next/image';


export function RatioImage ({credit, quality=75, src, children, axis="height" }) {
  const [ratio, setRatio] = useState(5/1)
  const axisStyle = axis="width" ? {height: "100%"} : {width: "100%"}

  return (
    <>
    <div className='container'
        style={
            axisStyle
        }>
        



      <Image
        src={src}
        layout='fill'
        quality={quality}
        
        onLoadingComplete={(img => {

            console.log({height: img.naturalHeight, width: img.naturalWidth})
            setRatio(img.naturalWidth / img.naturalHeight)
        })}
        />



    </div>
    {credit && <p className='credit'>{credit}</p> }


    <style jsx>{`
            .container {
                aspect-ratio: ${ratio};
                position: relative;
                pointer-events: none;
            }
            .credit {
              margin-top: 0px;
              background-color: #eee;
              padding: 1rem;
              font-size: 14px;
              font-family: var(--inter);
            }
        `}</style>
    </>
  );
};

