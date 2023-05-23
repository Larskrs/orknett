// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import supabase from "@/lib/Supabase"

export default async function handler(req, res) {
    
    
    const all_media = await supabase.from("media").select("*")


    res.status(200).json({all_media})

  }
  