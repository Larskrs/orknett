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
    .rpc(`get_random_file`, { storage_input: process.env.NEXT_PUBLIC_STORAGE_ID})
    .single();
    
    res.status(200).json({ data: data, error: error})

  }
