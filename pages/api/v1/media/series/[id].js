import { GetClient } from "@/lib/Supabase";

export default async function handler(req, res) {
    const { id } = req.query
    
    let { data, error } = await GetClient("public")
      .from("series")
      .select(`
        *,
        episodes (*)
      `)
      .eq("id", id)
      .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
      .single()

      console.log({data}, "Series API - /[id]?")

      if (error) {
        res.status(400).json({error: error})
        return;
      }
      
      res.status(200).json({ data });

  }