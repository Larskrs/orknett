

import { contentTypeList } from "@/lib/ExtensionHelper"
import { GetClient } from "@/lib/Supabase";

export default async function handler(req, res) {

      const { limit=10, order="new" } = req.query
      let allowedTypes = ["music","series","film", null, ]
      if (req.query.allowedTypes != null) allowedTypes = req.query.allowedTypes.split(",")
      const orderParam = () => {
        if (order == "new") {
          return {table: "created_at", ascending: false}
        }
        if (order == "old") {
          return {table: "created_at", ascending: true}
        }
      }
 
      let { data, error } = await GetClient("public")
      .from("series")
      .select(`
        *,
        episodes (*)
      `)
      .limit(limit)
      .order(orderParam().table, {ascending: orderParam().ascending})
      .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
      .in("type", allowedTypes)
      
      res.status(200).json({ data, error});
    
}
