import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"

import { GetClient, GetServiceClient } from "@/lib/Supabase";

export default async function handler(req, res) {

    const method = req.method

    if (method === "POST") {
        return await PostRequest(req, res)
    } else {
        res.status(400).json ({
            error: "Method not accepted"
        })
    }

}

async function PostRequest (req,res) {

    const session = await getServerSession(req, res, authOptions)
    if (session) {
      // Signed in
      console.log("Session", JSON.stringify(session, null, 2))
      await CreateBatch(req, res,session)
    } else {
      // Not Signed in
      res.status(401).json({error: "Authenticated session required."})
    }
    res.end()
    
    return;
}

async function CreateBatch (req, res, session) {

    const body = req.body
    console.log(body)
    if (!body.title) {
        res.status(400).json({error: "No title in body."})
        return
    }

    const title = body.title
    const owner = session.user.id
    console.log(owner)

    const {data, error} = await GetServiceClient("public")
    .from("batches")
    .insert({
        title: title,
        owner: owner,
        owners: [owner],
        storage: process.env.NEXT_PUBLIC_STORAGE_ID
    })
    .select(`*`)
    .single()

    console.log({data, error})
    res.status(200).json({data, error})

}