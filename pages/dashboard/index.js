
import NewFileUpload from '@/components/NewFileUpload';
import FileSharingLayout from '@/layouts/FileSharingLayout'
import { GetClient } from '@/lib/Supabase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from '@/styles/FileSharing.module.css'
import { GetContentType, GetContentTypeFromSource, GetExtensionFromSource, isSourceContentType } from '@/lib/ExtensionHelper';
import { RatioImage } from '@/components/RatioImage';
import Image from 'next/image';
import { getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]';
import { RatioMedia } from '@/components/RatioMedia';
import FileElement from '@/components/FileElement'
import { useEffect, useState } from 'react';
import Arrow from '@/components/Arrow';
import { AudioPlayer, DisplayElement, ImprovedFileUpload } from '@/components';
import axios from 'axios';
import { GetBatches } from '@/lib/BatchLib';
import Layout from '@/layouts/newUI/layout';



function FilePage ({files, batches}) {

    const [display, setDisplay] = useState(null)
    const [displayId, setDisplayId] = useState(-1)
    const session = useSession({
        required: true
    })
    const [filter, setFilter] = useState("")

    function getPossibleExtensionFilters () {
        let filters = []
        files.map((f) => {
            const ext = GetContentTypeFromSource(f.source).split("/")[0]
            if (!filters.includes(ext)) {
                filters.push(ext)
            }
        })
        return filters
    }




    
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

    function getFilteredFiles (files) {
        
        if (filter == "" || null) {
            return files
        }
        files = files.filter((f) => isSourceContentType(f.source, filter))

        return files
    }

    function displayFilters () {
        return <div className={styles.row}>{
            getPossibleExtensionFilters().map((ext) => {
                return <button key={ext} onClick={() => {if (ext == filter) {setFilter("")} else setFilter(ext)}} style={{border: "none", outline: filter != ext ? "none" : "2px solid white"}}>{ext}</button>
            })
        }</div>
    }

    function moveDisplay (newID) {

        if (newID + 1 > getFilteredFiles(files).length) {
            newID = getFilteredFiles(files).length;
        }

        setDisplayId(newID)
        setDisplay(getFilteredFiles(files)[newID])
    }
    

    
    var groupedFiles = getGroupedFiles(getFilteredFiles(files));



    return (
        <FileSharingLayout pageId={2} batches={batches}>

            <div className={styles.row} style={{gap: "2rem"}}>
                {displayFilters()}
                {session.status == "authenticated" && <ImprovedFileUpload /> }
            </div>
            <div>
                    
                 <div style={{opacity: display != null ? 1 : 0, pointerEvents: display != null ? "all" : "none"}} className={styles.display} onClick={() => {setDisplay(null)}}>
                </div>

                    {display && <DisplayElement file={display} id={displayId} onClose={() => {setDisplay(null)}} onEnded={() => moveDisplay(displayId + 1)} />}

                {Object.keys(groupedFiles).map((group, gi) => {
                    var files = groupedFiles[group]
                    return (
                        <div key={gi} className={styles.list}>
                        <h3 style={{margin: 0}}>{group}</h3>
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

    const batches = await GetBatches ()

    return {
        props:{
            files: data,
            batches: batches.data
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