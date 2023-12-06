import { GetContentType, isSourceContentType } from "@/lib/ExtensionHelper";
import { getReadableFileSizeString } from "@/lib/FileHelper";
import { GetClient, GetServiceClient } from "@/lib/Supabase";
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { URL } from "url";

export default async function handler(req, res) {
    const method = req.method;
    const query = req.query
  
    if (method === "GET") {
        if (query.userId) {
            return GetUserStorage(req, res, query.userId)
        }
        res.status(400).json({code: "no_user_id", message: "No UserId was given. User id is required to get a users file uploads."})


    }
  
  
    return res.status(405).json({ error: `Method ${method} is not allowed` });
  }


  async function GetUserStorage(req, res, userId) {
    
    const { data, error } = await GetServiceClient("public")
    .from("files")
    .select(`
        source,
        user, 
        storage
    `)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .eq("user", userId)

    if (error) {
        console.error(error)
    }
    
    const physicalSources = data.map((f) => {
            let source = f.source

            const url = new URL("http://localhost" + f.source)
            var params = new URLSearchParams(url.search); 
            const id = params.get("fileId")

            if (GetContentType(id.split(".").pop()).includes("video")) {
                source = "/videos/" + id.split(".")[0]
            } else {
                source = "/files/" + id
            }

            return source
    })

    let size = 0
    for (let index = 0; index < physicalSources.length; index++) {
        const PSource = physicalSources[index];
        let sourceStat = null
        const path = join(__dirname + "../../../../../../../../",  PSource );
        try {
                sourceStat = await stat(path)
                if (sourceStat.isDirectory()) {
                    size += await dirSize(path)
                } else if (sourceStat.isFile()) {
                    size += sourceStat.size
                }

        } catch (err) {
            console.log(err)
            continue;
        }
        
    }
    console.log(getReadableFileSizeString(size))
    res.status(200).json({
            size: size,
            amount: physicalSources.length,
            size_formatted: getReadableFileSizeString(size)
    })

  }



  const dirSize = async dir => {
    const files = await readdir( dir, { withFileTypes: true } );
  
    const paths = files.map( async file => {
      const path = join( dir, file.name );
  
      if ( file.isDirectory() ) return await dirSize( path );
  
      if ( file.isFile() ) {
        const { size } = await stat( path );
        
        return size;
      }
  
      return 0;
    } );
  
    return ( await Promise.all( paths ) ).flat( Infinity ).reduce( ( i, size ) => i + size, 0 );
  }