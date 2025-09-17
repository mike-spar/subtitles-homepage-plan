import React, { useMemo, useState } from "react";

// OpenAI-like Pricing Page (JP)
// - Clean, minimal, responsive
// - Cards with subtle borders, big prices, feature bullets
// - Sticky header nav and footer
// - Toggle between Business / Personal; Add-on table below

const plansBusiness = [
  { name: "Trial", hours: 1, price: 1300 },
  { name: "Professional", hours: 10, price: 12000 },
  { name: "Premium", hours: 30, price: 33000, popular: true },
  { name: "Premium Plus", hours: 100, price: 100000 },
];

const plansPersonal = [
  { name: "Trial", hours: 2, price: 1600 },
  { name: "Professional", hours: 6, price: 4320 },
  { name: "Premium", hours: 15, price: 9600, popular: true },
];

const addOns = [
  { minutes: 120, hours: 2, price: 2600 },
  { minutes: 360, hours: 6, price: 7200 },
  { minutes: 900, hours: 15, price: 16500 },
  { minutes: 1800, hours: 30, price: 30000 },
];

function yen(n) {
  return n.toLocaleString("ja-JP");
}

function Price({ value }) {
  return (
    <div className="flex items-end gap-1">
      <span className="text-4xl font-semibold tracking-tight">{yen(value)}</span>
      <span className="text-sm text-zinc-500">JPY/月</span>
    </div>
  );
}

function PerHour({ price, hours }) {
  const pph = useMemo(() => (price / hours), [price, hours]);
  return (
    <div className="text-xs text-zinc-500">約 {yen(Math.round(pph))} 円/時間</div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-700">
      {children}
    </span>
  );
}

function PlanCard({ plan, segment }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 shadow-sm transition hover:shadow-md bg-white ${
      plan.popular ? "border-zinc-900" : "border-zinc-200"
    }`}>
      {plan.popular && (
        <div className="absolute -top-3 right-4">
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white shadow">人気</span>
        </div>
      )}

      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
        <Badge>{segment === "business" ? "Business" : "Personal"}</Badge>
      </div>
      <Price value={plan.price} />
      <PerHour price={plan.price} hours={plan.hours} />

      <div className="mt-4 grid gap-2 text-sm text-zinc-700">
        <div className="flex items-center gap-2">
          <span className="i-lucide-clock h-4 w-4" />
          <span>時間: {plan.hours} 時間/月</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="i-lucide-shield-check h-4 w-4" />
          <span>HP非公開 / 内部利用OK</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="i-lucide-bolt h-4 w-4" />
          <span>リアルタイム翻訳・要約対応</span>
        </div>
      </div>

      <button className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:opacity-90">
        今すぐ申し込む
      </button>

      <p className="mt-2 text-center text-[11px] text-zinc-500">
        月途中のご契約は日割りになりません。
      </p>
    </div>
  );
}

export default function PricingPage() {
  const [segment, setSegment] = useState("business");
  const plans = segment === "business" ? plansBusiness : plansPersonal;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-lg bg-zinc-900" />
            <span className="text-sm font-medium tracking-tight">Felo Pricing</span>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a className="text-zinc-600 hover:text-zinc-900" href="#plans">プラン</a>
            <a className="text-zinc-600 hover:text-zinc-900" href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">シンプルで柔軟な料金プラン</h1>
          <p className="mt-3 text-zinc-600">OpenAIのPricingのような、ミニマルで読みやすい構成。用途に合わせて <span className="font-medium">Business</span> と <span className="font-medium">Personal</span> を選べます。</p>
          <div className="mt-6 inline-flex rounded-2xl border bg-white p-1">
            <button
              onClick={() => setSegment("business")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                segment === "business" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Businessプラン
            </button>
            <button
              onClick={() => setSegment("personal")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                segment === "personal" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              Personalプラン
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} segment={segment} />
          ))}
        </div>

        {/* Plan table (spec) */}
        <div className="mt-10 overflow-hidden rounded-2xl border">
          <div className="border-b bg-zinc-50 px-4 py-3 text-sm font-medium">
            {segment === "business" ? "Businessプラン（月料金）" : "Personalプラン（月料金）"}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white">
                <tr className="border-b text-zinc-500">
                  <th className="px-4 py-3">月額名称</th>
                  <th className="px-4 py-3">時間</th>
                  <th className="px-4 py-3">総価格 JPY/月</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {(segment === "business" ? plansBusiness : plansPersonal).map((p) => (
                  <tr key={p.name} className="border-t">
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3">{p.hours}</td>
                    <td className="px-4 py-3">{yen(p.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional package table within tab */}
        <div className="mt-6 overflow-hidden rounded-2xl border">
          <div className="border-b bg-zinc-50 px-4 py-3 text-sm font-medium">
            追加パッケージ（期限は当月まで）
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white">
                <tr className="border-b text-zinc-500">
                  <th className="px-4 py-3">時間（分）</th>
                  <th className="px-4 py-3">時間</th>
                  <th className="px-4 py-3">総価格（円）</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {addOns.map((a, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-3">{a.minutes}</td>
                    <td className="px-4 py-3">{a.hours}</td>
                    <td className="px-4 py-3">{yen(a.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 text-xs text-zinc-600 bg-zinc-50">
            不足分はその月内に追加購入できます。
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold tracking-tight">よくある質問</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[{
            q: "支払い方法は？",
            a: "クレジットカード/請求書（銀行振込）に対応しています。請求書払いはBusinessプランでご利用いただけます。",
          }, {
            q: "時間は翌月へ繰り越せますか？",
            a: "いいえ。各月の時間・追加パッケージの有効期限は当月末までです。",
          }, {
            q: "途中でプラン変更できますか？",
            a: "いつでも変更可能です。変更後は次回請求サイクルから新プランが適用されます。",
          }, {
            q: "超過時の扱いは？",
            a: "ご利用時間が上限に達した場合は、追加パッケージをご購入ください。",
          }].map((item, i) => (
            <div key={i} className="rounded-2xl border bg-white p-5">
              <div className="text-sm font-medium">{item.q}</div>
              <div className="mt-1 text-sm text-zinc-600">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} Felo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
