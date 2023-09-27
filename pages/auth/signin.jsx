
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";

export default function SignIn({ providers }) {
    return (
        <>
        <div className="wrap">
            <div className="background">
                <Image 
                style={{objectFit: "cover", objectPosition: "center",}}
                src={"http://aktuelt.tv/api/v1/files?fileId=9f7e1e0d-f7f1-469f-a227-309a16421e50.JPG"} fill/>
            </div>
            <div className="box">
                <Image src={"/aktueltstudio_logo.svg"} width={150} height={150} />
                <p>Du er bare noen få klikk unna noe veldig <span style={{fontWeight: "700", textDecoration: "underline"}}>aktuelt!</span></p>
                {displayProviders(providers)}
            </div>
        </div>

        <style jsx>{`
          .wrap {
            display: flex;
            width: 100vw;
            height: 100vh;
            align-items: center;
            justify-content: center;
          }  
          .background {
            width: 200%;
            height: 100%;
            animation: zoomOut 2.5s cubic-bezier(.17,.67,.44,.99);
          } 
          .background img {
            object-fit: cover;
          }
          .box {
            position: fixed;
            right: 0;
            top: 0;
            width: 100%;
            max-width: 500px;
            display: flex;
            background: rgba(0,0,0,0.75);
            padding: 4rem 2rem;
            z-index: 6;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            backdrop-filter: blur(20px);
            animation: zoomOut 2.5s cubic-bezier(.17,.67,.44,.99);
          }
          .box > p {
            text-align: center;
          }
          .provider {
            padding: .5rem;
            background: #222;
          }
          @keyframes zoomOut {
            0% {
                scale: 3;
                opacity: 0;
                rotate: 10deg;
            }
            100% {
                scale: 1;
                opacity: 1;
            }
          }
          
        `}</style>
        </>
    )
  }

  function displayProviders (providers) {
    return (
        <>
          {Object.values(providers).map((provider) => (
            <div key={provider.name} style={{padding: ".5rem 1rem", cursor: "pointer", background: "rgba(0,0,0,.5)", border: "2px solid white", borderRadius: "8px", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700"}} 
            onClick={() => signIn(provider.id)}
            >
              Log in med
              <Image src={"/google.png"} width={100} height={32} style={{objectFit: "contain", translate: "0px 2px"}} />
            </div>
          ))}
        </>
      )
  }
  
  export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    
    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
      return { redirect: { destination: "/" } };
    }
  
    const providers = await getProviders();
    
    return {
      props: { providers: providers ?? [] },
    }
  }