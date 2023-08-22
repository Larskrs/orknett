

import { contentTypeList } from "@/lib/ExtensionHelper"
import { GetClient } from "@/lib/Supabase";

export default async function handler(req, res) {

      let { data, error } = await GetClient("public")
      .from("series")
      .select(`
        *,
        episodes (*)
      `)
      .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)

      console.log({data}, "Series API?")
      
      res.status(200).json({ data, error });
    
}
