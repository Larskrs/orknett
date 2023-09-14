import { GetContentTypeFromSource } from "@/lib/ExtensionHelper";
import { getContentIconSource } from "@/lib/FileHelper";
import fs from "fs";
import jsmediatags from "jsmediatags"
import path from "path";

export const config = {
    api: {
      externalResolver: true,
    },
  }

export default async function handler(req, res) {
    const method = req.method;

    if (method === 'GET') {
        return GetCover(req, res)
    }

}

async function GetCover(req, res) {

    const fileId = req.query.fileId;
    let filePath = `./files/${fileId}`;

   jsmediatags.read(filePath, {
        onSuccess: function(tag) {
          const picture = tag.tags.picture
          const data = picture.data

            res.setHeader('Content-Type', picture.format); // Change the content type as needed
        
            res.end(Buffer.from(data));
        },
        onError: function(error) {
            console.log(':(', error.type, error.info);
            res.status(500).json(error.type, error.info)

        }
      });

      

}