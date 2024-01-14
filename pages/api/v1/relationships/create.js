
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { contentTypeList } from "@/lib/ExtensionHelper"
import { authOptions } from "../../auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { GetServiceClient } from "@/lib/Supabase"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await GetIngoingRequests(req, res)
    } else {
        res.status(400).json()
    }

}

async function CreateRelationship(req, res) {

    const session = await getServerSession(req, res, authOptions)

    const { recipient } = req.body

    

}
