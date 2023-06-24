export default async function handler(req, res) {
    const method = req.method;
  
    if (method === "GET") {
      return GetRandomFile(req, res);
    }
  
  
    return res.status(405).json({ error: `Method ${method} is not allowed` });
  }

