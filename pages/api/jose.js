import jose from "node-jose";


export default async function handler(req, res) {
  

      // Generate a new keys.
      const key = await jose.JWK.createKey("oct", 256, {
        alg: "HS512",
        use: "sig",
       })
    const jwk = key.toJSON(true);



    const options = {
        // other options...
        session: {
          jwt: true,
        },
        jwt: {
          signingKey: JSON.stringify(jwk),
        },
      };

    res.status(200).json({ options })
  }

