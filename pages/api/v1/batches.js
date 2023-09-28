

import { contentTypeList } from "@/lib/ExtensionHelper"
import { GetClient } from "@/lib/Supabase";

export default async function handler(req, res) {

    return await GetUserBatches(req, res)

}

  async function GetUserBatches (req, res) {

    let { data, error } = await GetClient("public")
    .from("batches")
    .select(`
        *,
        files (*)
    `)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .order("created_at", {ascending: false, foreignTable: "files"})
    // .filter('files.source', 'in', ['png','jpg'])
    .limit(1, { foreignTable: "files"})

    for (const i in data) {
        const batch = data[i]

        var file = batch.files[0]

        if (file)
        data[i].thumbnail = file.source
    }
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.status(200).json({batches: data})
  }

