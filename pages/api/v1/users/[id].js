import { GetClient, GetAuthenticatedClient } from "@/lib/Supabase";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"

export default async function handler(req, res) {
    const { id } = req.query

    const session = await getServerSession(req, res, authOptions);
    
    let { data, error } = await GetAuthenticatedClient("next_auth", session)
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