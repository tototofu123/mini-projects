# Oracle Cloud + Cloudflare Integration Plan

Personal and society-wise integration for HKUST Climbing Society.

## Resources

### Oracle Cloud (Always Free, permanent)
- 2 ARM OCPU + 12 GB RAM (VM.Standard.A1.Flex)
- 200 GB block volume
- 1 public IP, 50 Mbps egress
- 1 Autonomous DB (20 GB)
- 20 GB Object Storage

### Cloudflare (Free tier)
- DNS, CDN, SSL (unlimited)
- Workers (100K req/day)
- R2 object storage (10 GB, zero egress)
- D1 SQLite database (5 GB)
- Turnstile captcha (unlimited)
- Zero Trust access (50 users)

## Architecture

```
User → Cloudflare DNS → Oracle VM (llama.cpp + FastAPI)
  │
  ├─ Turnstile captcha check
  ├─ Rate limiting via Cloudflare
  ├─ SSL termination
  │
  └─ Oracle VM handles:
       ├─ LLM inference (Qwen2.5 7B)
       ├─ TF-IDF keyword FAQ
       ├─ ChromaDB vector RAG
       ├─ Supabase read (public data)
       └─ Supabase write (admin only)
```

## Integration Points

### 1. Cloudflare DNS → Oracle VM
- Point domain to Oracle public IP
- Free SSL, free DNS, free CDN in front

### 2. Cloudflare Workers (optional, free)
- Rate-limit chat API (100 req/min per IP)
- Transform responses, add CORS headers
- Route `/faq` to keyword layer, `/chat` to LLM
- Zero cold starts, runs at edge

### 3. Cloudflare R2 (free 10 GB)
- Store wall images, hold SVGs, event photos
- Zero egress fees
- App reads from R2 instead of Oracle storage

### 4. Cloudflare Zero Trust (free)
- Admin access to Oracle VM without opening SSH to public
- Add HKUST email as identity provider
- Admin CLI goes through Zero Trust tunnel

### 5. Cloudflare Turnstile (free)
- Add to chat widget before sending message
- Prevents spam/abuse on the LLM endpoint
- Invisible to users

## Cost Summary

| Service | Free Tier | What We Use |
|---|---|---|
| Oracle ARM VM | 2 OCPU / 12 GB | llama.cpp server |
| Cloudflare DNS | Unlimited | Domain routing |
| Cloudflare CDN | Unlimited | Static asset caching |
| Cloudflare Workers | 100K req/day | API proxy/rate-limit |
| Cloudflare R2 | 10 GB storage | Wall images, media |
| Cloudflare Turnstile | Unlimited | Chat captcha |
| Cloudflare Zero Trust | 50 users | Admin access tunnel |
| **Total** | **$0/month** | Everything free |

## Setup Steps

### Phase 1: Oracle VM
1. Provision ARM instance (ap-hongkong-1)
2. SSH key setup
3. Build llama.cpp for ARM
4. Download Qwen2.5 7B Q4_K_M
5. Start llama-server on port 8080
6. Systemd service for auto-restart
7. Cron heartbeat to prevent reclamation

### Phase 2: Cloudflare
1. Create Cloudflare account
2. Add domain
3. Update DNS A record → Oracle VM IP
4. Install Origin Certificate on VM
5. Set up Zero Trust tunnel for admin
6. Deploy R2 bucket for media
7. Add Turnstile to chat widget

### Phase 3: App Integration
1. Chat widget in web app → Cloudflare → Oracle
2. In-app chat in Expo → same endpoint
3. Admin CLI → Zero Trust → Oracle
4. Supabase public data → Oracle ChromaDB
5. Supabase private data → admin-only tools

## Keep-Alive

Oracle reclaims idle instances (< 20% CPU/network/memory over 7 days).

```bash
# Cron heartbeat every 5 minutes
*/5 * * * * curl -s http://localhost:8080/health > /dev/null 2>&1
```

## Models That Fit (2 OCPU / 12 GB)

| Model | Quant | RAM | Speed (ARM) | Use |
|---|---|---|---|---|
| Qwen2.5 7B | Q4_K_M | ~4.5 GB | 3-7 t/s | Main chatbot |
| Gemma 3 4B | Q4_K_M | ~3.3 GB | 5-8 t/s | Fast fallback |
| Phi-4 4B | Q4 | ~3 GB | 5-8 t/s | Reasoning |
| Qwen2.5 14B | Q4_K_M | ~8-9 GB | 2-4 t/s | Best quality (tight) |
