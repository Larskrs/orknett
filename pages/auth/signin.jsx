
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
                alt="background"
                style={{objectFit: "cover", objectPosition: "center",}}
                src={"http://aktuelt.tv/api/v1/files?fileId=d8e5e400-ec12-4c7d-babe-3d95ad75d0e7.JPG"} fill/>
            </div>
            <div className="box">
                <Image src={"/new_logo.svg"} alt="logo" width={250} height={100} />
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
            background: var(--background);
            border-left: 1px solid #222;
            padding: 4rem 2rem;
            gap: 8px;
            z-index: 6;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
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
                translate: 500px 0px; 
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
            <div key={provider.name} style={{padding: ".5rem 1rem", cursor: "pointer", background: "var(--background)", border: "1px solid #222", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700"}} 
            onClick={() => signIn(provider.id, { redirect: true })}
            >
              Log in med
              <Image alt="google_signin_provider" src={"/google.png"} width={100} height={32} style={{objectFit: "contain", translate: "0px 2px"}} />
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