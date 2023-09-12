
import NewFileUpload from '@/components/NewFileUpload';
import FileSharingLayout from '@/layouts/FileSharingLayout'
import { GetClient } from '@/lib/Supabase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '@/styles/FileSharing.module.css'
import { GetContentType, GetContentTypeFromSource, GetExtensionFromSource } from '@/lib/ExtensionHelper';
import { RatioImage } from '@/components/RatioImage';
import Image from 'next/image';
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]';
import { RatioMedia } from '@/components/RatioMedia';
import FileElement from '@/components/FileElement'
import { useEffect, useState } from 'react';
import Arrow from '@/components/Arrow';
import { ImprovedFileUpload } from '@/components';




function FilePage ({files}) {

    const [display, setDisplay] = useState(null)
    const [displayId, setDisplayId] = useState(-1)
    const session = useSession({
        required: true
    })




    
    useEffect(() => {
        document.onkeydown = checkKey;
        
        function checkKey(e) {
            
            e = e || window.event;
            
            if (e.keyCode == '38') {
                // up arrow
            }
            else if (e.keyCode == '40') {
                // down arrow
            }
            else if (e.keyCode == '37') {
                // left arrow
                moveDisplay(displayId - 1)
                
            }
            else if (e.keyCode == '39') {
                // right arrow
                moveDisplay(displayId + 1)
            }
            
        }
    }, )
    
    if (session.status !== "authenticated" && session.status) {
        return;
    }
    

    function getIndexById (uuid) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].id === uuid) {
              return i; // Return the index of the object with the matching ID
            }
          }
    }

    function moveDisplay (newID) {

        if (newID + 1 > files.length) {
            newID = files.length;
        }

        setDisplayId(newID)
        setDisplay(files[newID])
    }

    
    function DisplayElement () {

        const content = GetContentTypeFromSource(display.source)
        const contentType = content.split("/").shift();
        
        if (contentType == "image") {
            return (
                <img className={styles.display_element}
                    key={displayId}
                    alt={display.fileName}
                    src={display.source}
                    content={GetContentTypeFromSource(display.source)}
                 />
            )
        }
        if (contentType == "audio") {
            return (
                <audio 
                    key={displayId}
                    className={styles.display_element}
                    alt={display.fileName}
                    src={display.source}
                    controls
                    autoPlay
                    content={GetContentTypeFromSource(display.source)} />
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
    

    
    var groupedFiles = getGroupedFiles(files);



    return (
        <FileSharingLayout pageId={0}>

            {session.status == "authenticated" && <ImprovedFileUpload /> }
            <div>
                    
                 <div style={{opacity: display != null ? 1 : 0, pointerEvents: display != null ? "all" : "none"}} className={styles.display} onClick={() => {setDisplay(null)}}>
                </div>

                    {display && <DisplayElement/>}

                {Object.keys(groupedFiles).map((group, gi) => {
                    var files = groupedFiles[group]
                    return (
                        <div key={gi} className={styles.list}>
                        <h3>{group}</h3>
                        <div className={styles.list}>
                        {files.map((file, i) => {



                            return <FileElement key={file.id} file={file} onSelect={() => {
                              console.log("Uploading file: \n" + file.id)
                              moveDisplay(getIndexById(file.id))
                            }}/>
          
                          } ) }
                          </div>
                        </div>
                    )
                })}
            </div>
        </FileSharingLayout>
    );








}

function mediaPreview(source) {

    const content = GetContentTypeFromSource(source).split("/").shift()
    
    if (content == "image") {
        return <div className={styles.image}>
            <Image width={100} objectFit={'cover'} height={100} src={source} />
        </div>
    }
}

export async function getServerSideProps(ctx){

    const session = await getServerSession(
        ctx.req,
        ctx.res,
        authOptions,
    )

    if (!session) {
        ctx.res.end;
        return {props: {}};
    }

    const userId = session.user.id
    
    const { data, error } = await GetClient()
    .from("files")
    .select(`
        *
    `)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .eq("user", userId)
    .order("created_at", {ascending: false})

    return {
        props:{
            files: data
        },
    }
}

function getGroupedFiles(files) {
    const groupedData = files.reduce((groups, item) => {
        const date = new Date(item.created_at);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        if (!groups[formattedDate]) {
          groups[formattedDate] = [];
        }
        groups[formattedDate].push(item);
        return groups;
      }, {});

      return groupedData;
}


export default FilePage;