import { serve, file, write } from "bun";

const port = process.env.NEXT_PUBLIC_FQ_LOCAL_SERVER_PORT || 4466;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://v5.frontql.dev";
const hostname = baseUrl.replace("https://", "");
const basicAuth = process.env.NEXT_PUBLIC_AUTH;

// const tokensPath = "./tokens.json";
const tokensPath = "services/tokens.json";

const CORS_HEADERS = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
};

serve({
  port,
  async fetch(req) {
    if (req.method === "OPTIONS") {
      return new Response("Departed", CORS_HEADERS);
    }

    const url = new URL(req.url);
    const method = req.method;
    const bodyText = await req.text();
    const tokensFile = file(tokensPath);
    const tokens = await tokensFile.json();
    const key = req.headers.get("key");

    url.port = 443;
    url.protocol = "https:";
    url.hostname = hostname;
    req.headers.delete("host");
    req.headers.set("Accept-Encoding", "br");
    req.headers.append("Authorization", basicAuth);

    const response = await fetch(url, {
      method: method,
      body: bodyText,
      headers: req.headers,
    });
    const body = await response.json();
    if (key && body?.token) {
      tokens[key] = body.token;
      await write(tokensPath, JSON.stringify(tokens, null, 2));
    }
    return new Response(JSON.stringify(body), CORS_HEADERS);
  },
});

console.log(`FrontQL development server is running on http://localhost:${port}`);