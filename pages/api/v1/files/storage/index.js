import { GetClient } from "@/lib/Supabase";
import fs from "fs"
export default async function handler(req, res) {
    const method = req.method;
  
    if (method === "GET") {
      return GetStorageData(req, res);
    }
  
  
    return res.status(405).json({ error: `Method ${method} is not allowed` });
  }


  async function GetStorageData(req, res) {
    
    res.status(200).json({ 
        videos: await dirSize("./videos"),
        files: await dirSize("./files"),
    })

  }

import { readdir, stat } from 'fs/promises';
import { join } from 'path';

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
