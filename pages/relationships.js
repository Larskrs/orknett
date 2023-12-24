import Layout from "@/layouts/FileSharingLayout";
import { GetServiceClient } from "@/lib/Supabase";
import { getSession } from "next-auth/react";
import Image from "next/image";

export default function Relationships ({data}) {
    return (
        <Layout>

            <h2>Venner</h2>

            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
            {data.map((d) => {
                return (
                    <div key={d.id} style={{gap: 8, display: "flex", alignItems: "center", justifyContent: "flex-start", border: "1px solid #222", padding: "8px 16px"}}>
                        <div><Image style={{borderRadius: "50%", border: "1px solid #222"}} src={d.users.image} height={50} width={50}/></div>
                        <div><p>{d.users.name}</p></div>
                    </div>
                )
            })}
            </div>
        </Layout>
    );
}

export const getServerSideProps = async (context) => {


    const session = await getSession(context);

    // If the user is not authenticated, you may want to redirect them to the login page
    if (!session) {
      return {
        redirect: {
          destination: '/auth/signin',
          permanent: false,
        },
      };
    }

    const {data, error} = await GetServiceClient("public")
    .from("relationship")
    .select(`
        *,
        users!relationship_recipient_fkey(*)
    `) 

    // When fetching ingoing relationships we know who the recipient is,
    // so there is no need to expand the join to ourselves.
    // We do the opposite for outgoing requests.

    .eq("creator", session.user.id)

    console.log(data, error)
  
    return {
      props: {
        data,
      },
    };
  };