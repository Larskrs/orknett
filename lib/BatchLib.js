import { GetClient } from "./Supabase"

export async function GetBatches () {
    let { data, error } = await GetClient("public")
    .from("batches")
    .select(`
        *,
        files (*)
    `)
    .eq("storage", process.env.NEXT_PUBLIC_STORAGE_ID)
    .order("created_at", {ascending: false, foreignTable: "files"})
    // .filter('files.source', 'in', ['png','jpg'])
    .limit(1, { foreignTable: "files"})

    for (const i in data) {
        const batch = data[i]

        var file = batch.files[0]

        if (file)
        data[i].thumbnail = file.source
    }

    return { data, error }
}