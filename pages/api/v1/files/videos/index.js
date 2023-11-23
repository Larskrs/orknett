import { GetContentType } from "@/lib/ExtensionHelper";
import fs from "fs"
import path from "path";

function GetFileStream(req, res) {


    let fileName = req.query.fileId;
    fileName = fileName.replace("/",'')
    let quality = req.query.quality;
    if (!quality) quality = 360
    const [ id, extension ] = fileName.split(".")
  
    let filePath = `./videos/${id}/${quality}.${extension}`;
  
    
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
              res.end();
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
  
    const method = req.method
  
    if (method === "GET" || method === "HEAD") {
      // return GetFileStream(req, res);
      return GetFileStream(req, res);
    }
  
    if (method === "POST") {
      return await UploadFileStream(req, res);
    }
  
    return res.status(405).json({ error: `Method ${method} is not allowed` });
  }