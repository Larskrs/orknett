import { GetClient, GetAuthenticatedClient, GetServiceClient } from "@/lib/Supabase";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"

export default async function handler(req, res) {
    const { id } = req.query

    
    let { data, error } = await GetServiceClient("next_auth")
      .from("users")
      .select(`
        *
      `)
      .eq("id", id)
      .single()

      if (error) {
        res.status(400).json({error: error})
        return;
      }
      
      res.status(200).json( data );

  }