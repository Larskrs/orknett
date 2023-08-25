import { GetClient } from "@/lib/Supabase";

export default async function handler(req, res) {
    const { id } = req.query
    
    let { data, error } = await GetClient("public")
      .from("articles")
      .select(`
        *
      `)
      .eq("id", id)
      .single()

      if (error) {
        res.status(400).json({error: error})
        return;
      }
      
      res.status(200).json({ data });

  }