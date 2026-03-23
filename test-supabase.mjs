import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL(".env", import.meta.url), "utf-8")
    .split(/\r?\n/)
    .filter(l => l.trim() && !l.startsWith("#"))
    .map(l => {
      const [k, ...v] = l.split("=");
      return [k.trim(), v.join("=").trim().replace(/^["']|["']$/g, "")];
    })
);

const url  = env.NEXT_PUBLIC_SUPABASE_URL;
const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const svc  = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !anon) {
  console.error("[ERROR] NEXT_PUBLIC_SUPABASE_URL / ANON_KEY belum diisi di .env");
  process.exit(1);
}

const key    = svc ? svc : anon;
const keyTag = svc ? "service_role" : "anon";
const db     = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

const SEP = "=".repeat(50);
console.log(`\n${SEP}\n  SUPABASE CONNECTION TEST\n${SEP}`);
console.log(`  URL  : ${url}\n  Key  : ${keyTag} — ${key.slice(0, 25)}...`);

const { error: ping } = await db.rpc("version");
if (ping && (ping.message?.includes("fetch") || ping.message?.includes("network"))) {
  console.error("\n[ERROR] Koneksi gagal:", ping.message);
  process.exit(1);
}
console.log("\n  [OK] Koneksi BERHASIL!\n");

const res  = await fetch(`${url}/rest/v1/`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
const spec = await res.json();

const tables = Object.keys(spec?.paths ?? {})
  .map(p => p.slice(1))
  .filter(n => n && !n.startsWith("rpc/"))
  .sort();

console.log(`${SEP}\n  TABEL (${tables.length} ditemukan)\n${SEP}`);
tables.forEach((t, i) => console.log(`  ${String(i + 1).padStart(3)}.  ${t}`));

if (spec?.definitions) {
  console.log(`\n${SEP}\n  DETAIL KOLOM\n${SEP}`);
  for (const t of tables) {
    const props = spec.definitions[t]?.properties;
    if (!props) continue;
    console.log(`\n  [${t}]`);
    Object.entries(props).forEach(([col, def]) =>
      console.log(`    • ${col.padEnd(25)} ${def.type ?? def.format ?? "unknown"}`)
    );
  }
}

console.log(`\n${SEP}\n  Selesai!\n${SEP}\n`);
