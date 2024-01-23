import { GetContentType } from "@/lib/ExtensionHelper";
import fs from "fs"
import path from "path";

export const config = {
    api: {
      responseLimit: false,
    },
  }
export default async function handler(req, res) {

    const method = req.method
  
    if (method === "GET") {
      // return GetFileStream(req, res);
      return GetThumbnail(req, res);
    }
  
    if (method === "POST") {
      
    }
  
    return res.status(405).json({ error: `Method ${method} is not allowed` });
  }

  async function GetThumbnail(req, res) {
    
    let fileId = req?.query?.fileId;
    fileId = fileId.replace("/",'')
    if (!fileId) {
        res.status(404).json({ error: `No fileId` });
        return;
    }
    const extension = fileId?.split('.')?.pop();
    const id = fileId?.replace("." + extension, '')
    if (!GetContentType(extension).toLowerCase().includes("video")) { 
        // Is not a video
        res.status(404).json({ error: `No valid video found with id ${id} : ${extension}` });
        return;
    }

    return GetThumbnailStream(req, res, id)

  }

  function GetThumbnailStream(req, res, id) {


    const fileName = req.query.fileId;
    const extension = "png" 
  
    let filePath = `./videos/${id}/thumbnails/tn_1.png`;
    // console.log(filePath)
  
    
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
            if (process.env.CLEAN_CONSOLE != "true") {
                console.error(`File stat error for ${filePath}.`);
                console.error(err);
            }
              res.status(500);
              return;
          }
  
          let contentLength = stat.size;
  
          if (req.method === "HEAD") {
              res.statusCode = 200;
              res.setHeader("accept-ranges", "bytes");
              res.setHeader("content-length", contentLength);
              res.status(200).json({"message": "Head sent"})
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
                  res.status(500);
                  
              });
  
              
              fileStream.pipe(res);
          }
      });
  }