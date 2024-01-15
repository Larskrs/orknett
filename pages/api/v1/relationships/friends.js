1
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
        users!relationship_creator_fkey(*),
        bound(
            *
        )
    `)

    // In both requests it is always the user table that specifies the other user you have a relationship with or who has one with you.

    // In an INGOING relationship the bound is your recipients relationship with you.

    .eq("recipient", session.user.id)

    // .filter("bound.status", 'eq', "pending")
    

    if (error) {
        res.status(500).json({data, error})
    } else {
        res.status(200).json({data, error})
    }


}
