// Vercel-Funktion für Warteraum und Spieleliste.
// Braucht eine Redis-Datenbank von Upstash (Vercel → Storage → Upstash for Redis verbinden).
// Erwartet KV_REST_API_URL/KV_REST_API_TOKEN oder UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN.
const { handle } = require('../shared/lobby-core.js');

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmd) {
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

const PREFIX = 'gg:';
const store = {
  async get(k) { const v = await redis(['GET', PREFIX + k]); return v ? JSON.parse(v) : null; },
  async set(k, v, ttl) { await redis(['SET', PREFIX + k, JSON.stringify(v), 'EX', String(ttl || 3600)]); },
  async del(k) { await redis(['DEL', PREFIX + k]); },
};

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'Nur POST' }); return; }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  if (!URL_ || !TOKEN) { res.status(200).json({ ok: false, error: 'Keine Datenbank verbunden' }); return; }
  try {
    res.status(200).json(await handle(store, body || {}));
  } catch (e) {
    res.status(500).json({ error: 'Serverfehler: ' + e.message });
  }
};
