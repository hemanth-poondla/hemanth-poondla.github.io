# hp-chat — Groq proxy for the portfolio chatbot

The browser must never hold the Groq API key. The chatbot calls this Worker, and
the Worker adds the key server-side from an encrypted secret.

## Why this exists

The key used to ship inside the site bundle (`src/lib/crypto.ts`, base64-encoded).
Base64 is encoding, not encryption — anyone could decode it from the public repo
or the built JS. Moving it here is the only real fix for a static site.

## Deploy

From this `worker/` directory:

```bash
npm install
npx wrangler login          # opens a browser, one time
npx wrangler secret put GROQ_API_KEY   # paste the NEW rotated key when prompted
npx wrangler deploy
```

Deploy prints the URL, e.g. `https://hp-chat.<your-subdomain>.workers.dev`.
Put that in `CHAT_API_URL` in `src/components/ChatBot.tsx`.

Update the secret later with the same `wrangler secret put` command.

## Hardening

This endpoint is public and unauthenticated, so it is deliberately narrow:

- **Origin allowlist** — only the portfolio domain and localhost.
- **System prompt lives here**, not in the client, so the assistant can't be
  repurposed by a caller.
- **Model and `max_tokens` are fixed server-side** — a caller can't request an
  expensive model or a huge completion.
- **Only `user`/`assistant` turns are accepted**; a client-supplied `system`
  message is rejected rather than allowed to override the prompt.
- **Input caps** on message count, per-message length and total conversation size.
- Upstream errors are logged but never echoed verbatim to the browser.

`Origin` can be spoofed by a non-browser client, so the allowlist stops casual
abuse rather than a determined attacker — the input caps and fixed model are what
bound the cost. If it ever gets hammered, add a Rate Limiting rule in the
Cloudflare dashboard for this route.

## Free tier

100,000 requests/day, far beyond what a portfolio chatbot needs.
