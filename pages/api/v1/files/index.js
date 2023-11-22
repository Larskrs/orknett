// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import busboy from "busboy";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"
import { GetClient, GetAuthenticatedClient } from "@/lib/Supabase";
import { GetContentType, GetContentTypeFromSource, isSourceContentType } from "@/lib/ExtensionHelper"
import Ffmpeg from "fluent-ffmpeg";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: '32mb',
    externalResolver: true,
  },
};


async function optimizeVideo (fileName) {

  const startTime = new Date().getTime()

  const dir = "./files/"
  const vidDir = "./videos/"
  const basePath = path.join(__dirname, "../../../../../" ,dir, fileName)
  const baseName = fileName.substr(fileName.lastIndexOf(".") + 1)
  const id = fileName.split('.').slice(0, -1).join('.')


  console.log("Attempting to optimize video...")
  console.log("[PARAMS]")
  console.log({fileName, basePath, dir, baseName, id})

  console.log(`./videos/${id}/`)
  fs.mkdirSync(`./videos/${id}/`)

  const newPath = path.join(__dirname, `../../../../../videos/${id}`)

  createVideos()

  async function createVideos(){
      console.log("Starting video optimizations and quality segments...")

      const convPath = basePath

      // await convert(basePath, convPath)
      // await deleteOriginalVideo(basePath)

      const data = await readVideo(basePath);
      let size = {width: data.streams[0].width, height: data.streams[0].height}
      if (size.width === undefined) size = {width: data.streams[1].width, height: data.streams[1].height }
      console.log({original_size: size})
      

        

        let qualities = []
        
        let possible = [100, 360, 480, 540, 720, 1080, 1440 ]
        if (possible[0] > size.height) {
          possible = [360]
        } else {
          possible = possible.filter(function (i) {
            return i <= size.height;
          })
        }
        console.log({possible})
        await captureScreenshots(convPath, id)

        for (let i = 0; i < possible.length; i++) {
          const el = possible[i];
          console.log({el})
          await createVideo ( convPath, id, el)
        }

      deleteOriginalVideo(convPath)

      function createVideo(path, id, height) {

        console.log(`[Handling Video] id: (${id}) - ${height}p `)
        console.log({height})
        let bitrate = '1200k'
        let aBitrate = '128k'
        if (height <= 100) {
          bitrate = '5k'
          aBitrate = '0.1k'
        }
        
    
        return new Promise((resolve,reject)=>{
          Ffmpeg(path)

          .setFfprobePath(process.env.FFPROBE_LOCATION)
          .setFfmpegPath(process.env.FFMPEG_LOCATION)
          
          .size(`?x${height}`)
          .videoCodec('libvpx') //libvpx-vp9 could be used too
          .videoBitrate(1000, true) //Outputting a constrained 1Mbit VP8 video stream
          .on('filenames', function (filenames) {
            console.log("Creating video: " + filenames.join(', '))
          })
          .on('err',(err)=>{
            console.log("Well fuck...")
            return resolve()
          })
          .on('progress', function (progress) {
            console.log(`${Math.round(progress.percent)}% [${height}] ${id}`)
          })
          .on('end', async (fim)=>{
            qualities.push(height)
            const update = await GetClient().from("files")
            .update({quality: qualities})
            .eq("id", id)
            .select("*")
              return resolve()
          })
          .save(`./videos/${id}/${height}.webm`)
          .addOptions(['-crf 40'])
          })
      }
  }

  function captureScreenshots(path, id) {

    console.log(`[Handling Video] id: (${id}) - Screenshots `)
    

    return new Promise((resolve,reject)=>{
      Ffmpeg(path)
      .setFfprobePath(process.env.FFPROBE_LOCATION)
      .setFfmpegPath(process.env.FFMPEG_LOCATION)
      .on('filenames', function(filenames) {
        console.log('screenshots are ' + filenames.join(', '));
      })
      .on('end', function() {
        console.log('screenshots were saved');
        return resolve()
      })
      .on('error', function(err) {
        console.log('an error happened: ' + err.message);
        return reject(err)
      })
      // take 2 screenshots at predefined timemarks and size
      .takeScreenshots({ count: 2, timemarks: [ '00:00:02.000', '6' ], size: '?x360' }, './videos/'+id+'/thumbnails/');
    })
  }

  
  function deleteOriginalVideo (path) {
    console.log("Preparing to delete original video...")
    fs.unlink(path, (err) => {
        if (err) {
          console.error(err); return;
        }
        console.log("Finished Deleting original file without issue. :)")
    })
    
  }

  function convert(basePath, convPath){

    console.log("Attempting to convert video.")
    console.log("Original file: " + basePath)
    console.log("Save Location: " + convPath)

    return new Promise((resolve,reject)=>{
      Ffmpeg(basePath)
      .format("mp4")
      .videoBitrate('1200k')
      .saveToFile(convPath)
      .on('err',async (err) =>{
        console.log({error: err})
          return reject(err)
      })
      .on('progress',async (progress) => {
        console.log("progress")
      }) 
      .on('end', async (fim)=>{
          console.log("Finished converting.")
          return resolve()
      })
    })
  }

  function readVideo(path){
    return new Promise((resolve,reject)=>{
        Ffmpeg(path)
        .ffprobe(0, function(err, data) {
          if (err) {
            reject(err)
          }
          console.log(data)
          resolve(data)
        });
    })
}

}

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
    console.log(GetContentType(extension).toLowerCase())
    if (GetContentType(extension).toLowerCase().includes("video")) {
      console.log("File uploaded is a video, converting to multiple qualities...")
      optimizeVideo(fileName)
    }



  });

  req.pipe(bb);



  return;
}



const CHUNK_SIZE_IN_BYTES = 1000000; // 1 mb

function GetFileStream(req, res) {


  let fileName = req.query.fileId;
  fileName = fileName.replace("/",'')
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
function GetVideoStream (req, res) {

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

  if (!range) {
    return GetFileStream(req, res)
  }

  const videoSizeInBytes = fs.statSync(filePath).size;

  const chunkStart = Number(range.replace(/\D/g, ""));

  const chunkEnd = Math.min(
    chunkStart + CHUNK_SIZE_IN_BYTES,
    videoSizeInBytes - 1
  );

  const contentLength = chunkEnd - chunkStart + 1;

  const headers = {
    "Content-Range": `bytes ${chunkStart}-${chunkEnd}/${videoSizeInBytes}`,
    "accept-ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(filePath, {
    start: chunkStart,
    end: chunkEnd,
  });

  res.on("close", function () {
    videoStream.destroy()
    return;
  })

  videoStream.pipe(res);

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