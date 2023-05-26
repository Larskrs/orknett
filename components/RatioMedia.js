import React, { FC, useState } from 'react';
import Image from 'next/image';
import { GetContentTagFromSource, GetContentType, GetContentTypeFromSource, GetExtensionFromSource } from '@/lib/ExtensionHelper';


export function RatioMedia ({credit, quality=75, src, children, axis="height" }) {
  const [ratio, setRatio] = useState(5/1)
  const axisStyle = axis="width" ? {height: "100%"} : {width: "100%"}
  

  const type = src.split('.').pop();



  return (
    <>
    <div className='container'
        style={
            axisStyle
        }>
        



      {MediaSection()}



    </div>
    {credit && <p className='credit'>{credit}</p> }


    <style jsx>{`
            .container {
                aspect-ratio: ${ratio};
                position: relative;
                pointer-events: none;
                width: 100%;
            }
            .credit {
              margin-top: 0px;
              background-color: #eee;
              padding: 1rem;
              font-size: 14px;
              font-family: var(--inter);
            }
            .video {
                width: 100%;
            }
        `}</style>
    </>
  );

  function MediaSection () {

    const content = GetContentTypeFromSource(src)
    const type = content.split('/').shift();
    console.log({type})

    if (type == "image") { return ImageSection() }




  }
  
  function ImageSection () {
    return (
        <>
        <Image
        className='img'
        content={GetContentTypeFromSource(src)}
        src={src}
        layout='fill'
      quality={quality}
      
      onLoadingComplete={(img => {
          
          console.log({height: img.naturalHeight, width: img.naturalWidth})
          setRatio(img.naturalWidth / img.naturalHeight)
        })}
        />

        <style jsx>{`

            .img {
                width: 100%;
                position: relative;
                display: flex;
                aspect-ratio: ${ratio};
            }
        `}</style>
        </>
    )
    }
};
    
    