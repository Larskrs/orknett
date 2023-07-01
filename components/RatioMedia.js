import React, { FC, useState } from 'react';
import Image from 'next/legacy/image';
import { GetContentTagFromSource, GetContentType, GetContentTypeFromSource, GetExtensionFromSource } from '@/lib/ExtensionHelper';


export function RatioMedia ({credit, quality=10, src, className, children, axis="height", objectFit=false }) {
  const [ratio, setRatio] = useState(5/1)
  const axisStyle = axis="width" ? {height: "100%"} : {width: "100%"}
  
  const content = GetContentTypeFromSource(src)
  const type = content.split('/').shift();




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
                max-width: inherit;
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

  function MediaSection () {

    // console.log({type})

    if (type == "image") { return ImageSection() }
    if (type == "video") { return VideoSection() }
    if (type == "audio") { return AudioSection() }




  }

  function VideoSection () {
    return (
        <>
        <video
        className='img'
        content={GetContentTypeFromSource(src)}
        src={src}
        controls
      

        />

        <style jsx>{`

            .img {
                width: auto;
                max-width: inherit;
                height: auto;
                display: flex;
                aspect-ratio: ${ratio};
                pointer-events: all;
            }
        `}</style>
        </>
    )
    }

    function AudioSection () {
      return (
          <>
          <video
          className='img'
          content={GetContentTypeFromSource(src)}
          src={src}
          layout='fill'
          controls
        quality={quality}
        
        onLoad={(video => {
            setRatio(video.naturalWidth / video.naturalHeight)
          })}
          />
  
          <style jsx>{`
  
              .img {
                  background: #222;
                  width: 100%;
                  position: relative;
                  display: flex;
                  aspect-ratio: ${ratio};
                  pointer-events: all;
              }
          `}</style>
          </>
      )
      }
  
  function ImageSection () {
    return (
        <>
        <Image
        className='img'
        content={GetContentTypeFromSource(src)}
        src={src}
        layout='fill'
        objectFit={objectFit ? 'cover' : 'none'}
      quality={quality}
      
      onLoadingComplete={(img => {
          
          // console.log({height: img.naturalHeight, width: img.naturalWidth})
          setRatio(img.naturalWidth / img.naturalHeight)
        })}
        />

        <style jsx>{`

            .img {
                width: 100%;
                position: relative;
                display: flex;
                aspect-ratio: ${ratio};
                object-fit: ${objectFit ? "cover" : "none"}
            }
        `}</style>
        </>
    )
    }
};
    
    