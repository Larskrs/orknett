import { createClient } from '@supabase/supabase-js'
import { useSession } from 'next-auth/react';



export function GetAuthenticatedClient (schema="public", session) {

    const { supabaseAccessToken } = session

    const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        {
            db: {
                schema: schema,
            }
        },
        {
            global: {
              headers: {
                Authorization: `Bearer ${supabaseAccessToken}`,
              },
            },
        }
    )

    return client;
}

export function GetClient (schema="public") {
    const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

        {
            db: {
                schema: schema,
            },
        },
    )

    return client;
}
export function GetServiceClient (schema="public") {
    const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,

        {
            db: {
                schema: schema,
            },
        },
    )

    return client;
}

export function getSessionClient(session) {
    
    const { supabaseAccessToken } = session
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            global: {
              headers: {
                Authorization: `Bearer ${supabaseAccessToken}`,
              },
            },
          }
    )

}







