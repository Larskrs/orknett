import fs from "fs";
import jsmediatags from "jsmediatags"

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
          const tags = tag.tags;

          res.status(200).json({
            tags
          })
        },
        onError: function(error) {
          console.log(':(', error.type, error.info);
          res.status(500).json({error: "File not suitable for metadata"});
        }
      });

      

}