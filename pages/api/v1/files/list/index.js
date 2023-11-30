import { GetClient, GetAuthenticatedClient, GetServiceClient } from "@/lib/Supabase";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]"

export default async function handler(req, res) {
    
    const session = await getServerSession(req, res, authOptions)
    if (session) {
      // Signed in
      return GetPagedFiles (req, res, session)
    } else {
      // Not Signed in
      res.status(401)
    }
    res.end()
    res.status(200).json({session})
    return;


  }

  async function GetPagedFiles (req, res, session) {

    const { page, size } = req.query
    let userId = session.user.id

    const from = page;

    let { data, error } = await GetServiceClient("public")
      .from("files")
      .select(`
        *
      `)
      .eq("user", userId)
      .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    
      .range(from, size)

      if (error) {
        res.status(400).json({error: error})
        return;
      }
      
      res.status(200).json( data );
  }