// Proxies every /api/* request to the backend running on the VPS.
// Set API_BASE in the Cloudflare Pages project (e.g. http://203.0.113.10:8080)
// to the origin Caddy exposes WITHOUT a trailing /api — the original path is preserved.

interface Env {
  API_BASE?: string;
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.API_BASE) {
    return new Response(
      JSON.stringify({ error: "API_BASE is not configured for this deployment." }),
      { status: 503, headers: { "content-type": "application/json" } }
    );
  }

  const incoming = new URL(request.url);
  const target = env.API_BASE.replace(/\/$/, "") + incoming.pathname + incoming.search;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  return fetch(target, init);
};
