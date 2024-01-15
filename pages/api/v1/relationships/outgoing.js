// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { contentTypeList } from "@/lib/ExtensionHelper"
import { authOptions } from "../../auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { GetServiceClient } from "@/lib/Supabase"

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await GetIngoingRequests(req, res)
    } else {
        res.status(400).json()
    }

}

async function GetIngoingRequests(req, res) {

    const session = await getServerSession(req, res, authOptions)

    const { data, error } = await GetServiceClient("public")
    .from("relationship")
    .select(`
        *,
        users!relationship_recipient_fkey(*),
        bound(
            *
        )

    `)

    // In an OUTGOING relationship the bound is your relationship.

    // We only need to get the opposite key. We can check what the other users status is by checking the bound.
    .eq("creator", session.user.id)

    if (error) {
        res.status(500).json({data, error})
    } else {
        res.status(200).json({data, error})
    }


}
