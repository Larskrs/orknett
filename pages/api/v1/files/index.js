// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import busboy from "busboy";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"
import { GetClient, GetAuthenticatedClient } from "@/lib/Supabase";
import { GetContentType } from "@/lib/ExtensionHelper"

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
    externalResolver: true,
  },
};



async function UploadFileStream(req, res) {

  const session = await getServerSession(req, res, authOptions)

  // if (!session) {
  //   res.status(404).json({message: 'You are not logged in or have an invalid session, please try again later.'})
  //   return;
  // }





  const bb = busboy({ headers: req.headers });

  let fileName;
  
  bb.on("file", (_, file, info) => {
    // auth-api.mp4
    fileName = info.filename;
    const filePath = `./files/${fileName}`;

    const stream = fs.createWriteStream(filePath);


    file.pipe(stream);
  });

  bb.on("close", async () => {
    res.writeHead(200, { Connection: "close" });
    res.end(`That's the end`);

    const [ id, extension ] = fileName.split(".")
    



  });

  req.pipe(bb);



  return;
}



const CHUNK_SIZE_IN_BYTES = 1000000; // 1 mb

function GetFileStream(req, res) {


  const fileName = req.query.fileId;
  const [ id, extension ] = fileName.split(".")

  let filePath = `./files/${fileName}`;
  

  
  const options = {};

    let start;
    let end;

    const range = req.headers.range;
    if (range) {
        const bytesPrefix = "bytes=";
        if (range.startsWith(bytesPrefix)) {
            const bytesRange = range.substring(bytesPrefix.length);
            const parts = bytesRange.split("-");
            if (parts.length === 2) {
                const rangeStart = parts[0] && parts[0].trim();
                if (rangeStart && rangeStart.length > 0) {
                    options.start = start = parseInt(rangeStart);
                }
                const rangeEnd = parts[1] && parts[1].trim();
                if (rangeEnd && rangeEnd.length > 0) {
                    options.end = end = parseInt(rangeEnd);
                }
            }
        }
    }

    res.setHeader("content-type", GetContentType(extension));

    fs.stat(filePath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${filePath}.`);
            console.error(err);
            res.status(500);
            return;
        }

        let contentLength = stat.size;

        if (req.method === "HEAD") {
            res.statusCode = 200;
            res.setHeader("accept-ranges", "bytes");
            res.setHeader("content-length", contentLength);
            
            res.end();
        }
        else {        
            let retrievedLength;
            if (start !== undefined && end !== undefined) {
                retrievedLength = (end+1) - start;
            }
            else if (start !== undefined) {
                retrievedLength = contentLength - start;
            }
            else if (end !== undefined) {
                retrievedLength = (end+1);
            }
            else {
                retrievedLength = contentLength;
            }

            res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

            res.setHeader("content-length", retrievedLength);

            if (range !== undefined) {  
                res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
                res.setHeader("accept-ranges", "bytes");
            }
            res.setHeader("filename", fileName);
            res.setHeader("content-disposition", "filename=" + fileName)

            const fileStream = fs.createReadStream(filePath, options);
            fileStream.on("error", error => {
                console.log(`Error reading file ${filePath}.`);
                console.log(error);
                res.sendStatus(500);
            });

            
            fileStream.pipe(res);
        }
    });
}

export default async function handler(req, res) {
  const method = req.method;

  if (method === "GET") {
    return GetFileStream(req, res);
  }

  if (method === "POST") {
    return await UploadFileStream(req, res);
  }

  return res.status(405).json({ error: `Method ${method} is not allowed` });
}