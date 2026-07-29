import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";
import AdminPanelClient from "./AdminPanelClient";

const verifyAdmin = async () => {
  const cookieStore = await cookies();
  const value = cookieStore.get("admin_auth")?.value;
  const envPass = process.env.ADMIN_PANEL_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PANEL_PASSWORD;
  if (!envPass) return false;
  const expected = crypto.createHash("sha256").update(envPass).digest("hex");
  return value === expected;
};

export default async function Page() {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Admin Girişi</h1>
        <p className="mt-2 text-sm text-slate-600">Lütfen şifreyi girin.</p>
        <form
          action="/api/admin/login"
          method="post"
          className="mt-4 flex gap-2 max-w-md"
        >
          <input name="password" type="password" className="flex-1 rounded-md border px-3 py-2" />
          <button type="submit" className="rounded-md bg-sky-500 px-4 py-2 text-white">Giriş</button>
        </form>
        <p className="mt-4 text-sm text-slate-500">Bu panel yalnızca yönetici içindir.</p>
      </div>
    );
  }

  // fetch data from supabase
  const { data, error } = await supabase
    .from("scores")
    .select("tracking_code,ags,oabt,score,created_at");

  const rows = Array.isArray(data) ? data.map((r) => ({ tracking_code: r.tracking_code, ags: Number(r.ags), oabt: Number(r.oabt), score: Number(r.score), created_at: r.created_at })) : [];

  const total = rows.length;
  const avgAgs = total ? rows.reduce((s, r) => s + r.ags, 0) / total : 0;
  const avgOabt = total ? rows.reduce((s, r) => s + r.oabt, 0) / total : 0;
  const avgScore = total ? rows.reduce((s, r) => s + r.score, 0) / total : 0;
  const maxAgs = total ? Math.max(...rows.map((r) => r.ags)) : 0;
  const maxOabt = total ? Math.max(...rows.map((r) => r.oabt)) : 0;
  const maxScore = total ? Math.max(...rows.map((r) => r.score)) : 0;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin Paneli</h1>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="p-4 bg-white rounded shadow">Toplam kayıt<p className="text-2xl font-bold">{total}</p></div>
        <div className="p-4 bg-white rounded shadow">Ortalama AGS<p className="text-2xl font-bold">{avgAgs.toFixed(2)}</p></div>
        <div className="p-4 bg-white rounded shadow">Ortalama ÖABT<p className="text-2xl font-bold">{avgOabt.toFixed(2)}</p></div>
        <div className="p-4 bg-white rounded shadow">Ortalama Puan<p className="text-2xl font-bold">{avgScore.toFixed(2)}</p></div>
        <div className="p-4 bg-white rounded shadow">En yüksek AGS<p className="text-2xl font-bold">{maxAgs}</p></div>
        <div className="p-4 bg-white rounded shadow">En yüksek ÖABT<p className="text-2xl font-bold">{maxOabt}</p></div>
        <div className="p-4 bg-white rounded shadow">En yüksek Puan<p className="text-2xl font-bold">{maxScore.toFixed(2)}</p></div>
      </div>

      <AdminPanelClient rows={rows} />
    </div>
  );
}
