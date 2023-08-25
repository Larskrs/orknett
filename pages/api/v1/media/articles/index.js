

import { contentTypeList } from "@/lib/ExtensionHelper"
import { GetClient } from "@/lib/Supabase";

export default async function handler(req, res) {

      const { limit=10, order="new" } = req.query
      const orderParam = () => {
        if (order == "new") {
          return {table: "created_at", ascending: false}
        }
        if (order == "old") {
          return {table: "created_at", ascending: true}
        }
      }
 
      let { data, error } = await GetClient("public")
      .from("articles")
      .select(`
        *
      `)
      .limit(limit)
      .order(orderParam().table, {ascending: orderParam().ascending})
      
      res.status(200).json({ data, error });
    
}
