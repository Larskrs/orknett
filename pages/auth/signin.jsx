
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import Link from "next/link";

export default function SignIn({ providers }) {
    return (
        <>
        <div className="wrap">
            <div className="background">
                <Image 
                alt="background"
                style={{objectFit: "cover", objectPosition: "center",}}
                src={"http://aktuelt.tv/api/v1/files?fileId=d8e5e400-ec12-4c7d-babe-3d95ad75d0e7.JPG"} fill/>
                <span className="gradient"></span>
            </div>
            <div className="box">
                <Image src={"/new_logo.svg"} alt="logo" width={250} height={100} />
                <p>Du er bare noen få klikk unna noe veldig <Link href={"/"} style={{fontWeight: "700", textDecoration: "underline", color: "var(--folly)"}}>aktuelt!</Link></p>
                <p>Aktuelt.tv lagrer ikke ditt google passord.</p>
                <br />
                {displayProviders(providers)}
            </div>
        </div>

        <style jsx>{`
          .wrap br {
            height: 50px;
            position: relative;
            margin-block: 10px;
          }
          .wrap {
            display: flex;
            width: 100vw;
            height: 100vh;
            align-items: center;
            overflow: hidden;
            justify-content: center;
          }  
          .background {
            width: 200%;
            height: 100%;
            filter: blur(0px);
            overflow: hidden;
            animation: blurOut 2s cubic-bezier(.17,.67,.44,.99);
          } 
          .background .gradient {
            background: rgba(2,2,2,1); 
            background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(2,2,2,1) 100%); 
            height: 100vh;
            width: 100vw;
            position: fixed;
          }
          .background img {
            object-fit: cover;
          }
          .box {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            background: transparent;
            padding: 4rem 2rem;
            gap: 8px;
            z-index: 6;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .box > p {
            text-align: center;
            color: #bbb;
            font-size: 1.1rem;
            margin: 0;
          }
          @keyframes blurOut {
            0% {
              filter: blur(10px);
              scale: 1.2;
            }
            100% {
              scale: 1;
              filter: blur(0px);
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
            <div key={provider.name} className="wrap"
            onClick={() => signIn(provider.id, { redirect: true })}
            >
              <span>Log in med</span>
              <Image className="image" alt="google_signin_provider" src={"/google.png"} width={100} height={32} style={{objectFit: "contain", translate: "0px 2px"}} />
            </div>
          ))}

          <style jsx>{`
                .wrap {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  font-weight: 600;
                  padding: 8px 16px;
                  background: rgba(112.5,112.5,112.5, 0.2);
                  border-radius: 6px;
                  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                  backdrop-filter: blur(5px);
                  -webkit-backdrop-filter: blur(5px);
                  border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .wrap:hover  {
                  scale: 1.05;
                  border-color: white;

                }
                @keyframes jump {
                  0% {
                    translate: 0px 0px;
                  }
                  100% {
                    translate: 0px -2.5px;
                    scale: 1.1;
                  }
                }
                
            `}</style>
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