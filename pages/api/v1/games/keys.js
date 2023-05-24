// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GetClient } from "@/lib/Supabase"

export default async function handler(req, res) {
    
    
    const all_media = await GetClient("games").from("access_keys").select("*")


    res.status(200).json({all_media})

  }
  