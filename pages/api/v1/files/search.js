import { GetClient } from "@/lib/Supabase";

export default async function handler(req, res) {
    const method = req.method;
  
    if (method === "GET") {
      return GetRandomFile(req, res);
    }
  
  
    return res.status(405).json({ error: `Method ${method} is not allowed` });
  }


  async function GetRandomFile(req, res) {

    const { data, error } = await GetClient()
    .from("files")
    .select("*")
    .textSearch("fileName", req.query.s)
    .limit(10)
    
    res.status(200).json({ data, error})

  }
