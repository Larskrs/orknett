// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GetClient } from "@/lib/Supabase"

export default async function handler(req, res) {
    
    
    const fileName = "1981291283.png"

    const [ id, extension ] = fileName.split(".")




    res.status(200).json({id, extension})

  }
  