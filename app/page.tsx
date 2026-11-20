import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ExternalLink } from "lucide-react";

export default function HomeDashboard() {
  const productList = Object.values(PRODUCTS);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 text-balance">
          Micro-SaaS 10本同時検証ダッシュボード
        </h1>
        <p className="text-sm text-slate-600 mb-8 text-pretty">
          各プロダクトのLP公開状況と個別URL一覧
        </p>

        <div className="grid gap-4">
          {productList.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    ID: {item.id}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    第{item.wave}波
                  </span>
                  <span className="text-xs text-slate-500">{item.price}</span>
                </div>
                <h2 className="font-bold text-slate-900 text-base sm:text-lg text-balance">{item.name}</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 text-pretty">{item.tagline}</p>
              </div>

              <Link
                href={`/lp/${item.id}`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shrink-0 transition"
              >
                <span>LPを開く</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
