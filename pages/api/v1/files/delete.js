import { GetContentType, GetContentTypeFromSource } from "@/lib/ExtensionHelper";
import { GetClient } from "@/lib/Supabase";
import { fstat, stat, unlink } from "fs";
import { rm } from "fs/promises";

export const config = {
    api: {
      bodyParser: false,
      responseLimit: '32mb',
      externalResolver: true,
    },
  }

  export default async function handler(req, res) {

    const method = req.method
  
    if (method == "DELETE") {
       return await DeleteFile(req, res)
    } 

    return res.status(400).json({ error: `Method ${method} is not allowed` });
  }

  async function DeleteFile(req, res) {
    let fileName = req.query.fileId;
    fileName = fileName.replace("/", "");
    const [id, extension] = fileName.split(".");

    let filePath = `./files/${id}.${extension}`;
    if (GetContentType(extension).includes("video")) {
        filePath = `./videos/${id}`;
    } 
  
    

    try {
        // Check if the file exists
        const stat = await FileExists(filePath);
        if (stat.isDirectory) {
            console.log("Is directory")
        }
    
        // If the file exists, attempt to delete it
        try {
          UnlinkFile(filePath);
          RemoveFromDB(id)
          return res.status(200).json({ message: "File deleted successfully." });
        } catch (error) {
          console.error(`Error deleting file: ${error}`);
          return res.status(500).json({ message: "Error deleting file." });
        }
      } catch (err) {
        // If there's an error or the file doesn't exist, handle accordingly
        console.error(`Error checking file existence: ${err}`);
        RemoveFromDB(id)
        return res.status(404).json({ message: "File not found." });
      }
    }


async function UnlinkFile (filePath) {
    return new Promise((resolve, reject) => {
        rm(filePath, {recursive: true, force: true}, (err, stats) => {
          if (err) {
            // If there's an error, reject the promise
            reject(err);
          } else {
            // If the file exists, resolve the promise with the stats
            resolve(stats);
          }
        });
      });
    }

async function FileExists(filePath) {
    return new Promise((resolve, reject) => {
      stat(filePath, (err, stats) => {
        if (err) {
          // If there's an error, reject the promise
          reject(err);
        } else {
          // If the file exists, resolve the promise with the stats
          resolve(stats);
        }
      });
    });
}

async function RemoveFromDB (id) {
    const {data, error} = await GetClient("public")
    .from("files")
    .delete(1)
    .eq("id", id)

    return {data, error}
}

  