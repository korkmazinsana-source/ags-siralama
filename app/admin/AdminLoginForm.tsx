"use client";
import { useState } from "react";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        // reload to let server render admin area based on cookie
        window.location.reload();
      } else {
        setError('Giriş başarısız. Lütfen şifreyi kontrol edin.');
      }
    } catch (err) {
      setError('Sunucuya bağlanırken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2 max-w-md">
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="flex-1 rounded-md border px-3 py-2"
        placeholder="Şifre"
      />
      <button type="submit" disabled={loading} className="rounded-md bg-sky-500 px-4 py-2 text-white">
        {loading ? 'Bekleyin...' : 'Giriş'}
      </button>
      {error ? <p className="w-full text-red-500 mt-2">{error}</p> : null}
    </form>
  );
}
