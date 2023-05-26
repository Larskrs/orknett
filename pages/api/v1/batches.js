

import { contentTypeList } from "@/lib/ExtensionHelper"
import { GetClient } from "@/lib/Supabase";

export default async function handler(req, res) {

    

    const batchId = req.query.batchId

    if (batchId) {
        const files = await GetFilesFromBatch(batchId);
        return;
    }


  res.status(200).json({ name: 'John Doe' });
  
  async function GetFilesFromBatch (batchId) {
      let { data, error } = await GetClient("public")
      .from("batches")
      .select(`
        *,
        files (*)
      `)
      .eq("id", batchId)
      .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
      .single();
      
      console.log({data, error})
      res.status(200).json({ data, error, batchId });
    }
}
