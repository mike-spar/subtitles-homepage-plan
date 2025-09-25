import React, { useMemo, useState } from "react";

// Currency configuration
const currencies = {
  JPY: { symbol: "¥", code: "JPY", name: "日本円" },
  USD: { symbol: "$", code: "USD", name: "米ドル" },
  CNY: { symbol: "¥", code: "CNY", name: "人民元" },
  TWD: { symbol: "NT$", code: "TWD", name: "台湾ドル" }
};

const tabs = [
  { key: "personal", label: "Personalプラン" },
  { key: "business", label: "Businessプラン" },
  { key: "enterprise", label: "Enterpriseプラン" },
];

const plansBusiness = [
  {
    name: "Trial",
    hours: 1,
    prices: { JPY: 1200, USD: 8.2, CNY: 59, TWD: 250 },
    transcriptionWords: 500,
    translationWords: 5000
  },
  {
    name: "Professional",
    hours: 10,
    prices: { JPY: 11000, USD: 79, CNY: 550, TWD: 2400 },
    transcriptionWords: 500,
    translationWords: 5000
  },
  {
    name: "Premium",
    hours: 30,
    prices: { JPY: 32000, USD: 210, CNY: 1500, TWD: 6600 },
    popular: true,
    transcriptionWords: 500,
    translationWords: 5000
  },
  {
    name: "Premium Plus",
    hours: 100,
    prices: { JPY: 99999, USD: 660, CNY: 4800, TWD: 19999 },
    transcriptionWords: 500,
    translationWords: 5000
  },
];

const plansPersonal = [
  {
    name: "Trial",
    hours: 2,
    prices: { JPY: 1500, USD: 9.9, CNY: 69, TWD: 299 },
    transcriptionWords: 200,
    translationWords: 1000
  },
  {
    name: "Professional",
    hours: 6,
    prices: { JPY: 4200, USD: 29, CNY: 199, TWD: 850 },
    transcriptionWords: 200,
    translationWords: 1000
  },
  {
    name: "Premium",
    hours: 15,
    prices: { JPY: 9500, USD: 65, CNY: 450, TWD: 1900 },
    popular: true,
    transcriptionWords: 200,
    translationWords: 1000
  },
  {
    name: "Premium Plus",
    hours: 30,
    prices: { JPY: 15500, USD: 105, CNY: 750, TWD: 3200 },
    transcriptionWords: 200,
    translationWords: 1000
  },
  {
    name: "Premium Max",
    hours: 60,
    prices: { JPY: 29999, USD: 199, CNY: 1400, TWD: 5999 },
    transcriptionWords: 200,
    translationWords: 1000
  },
];

const enterprisePlan = { 
  name: "Enterpriseプラン", 
  description: "プラン金額：弊社へ問い合わせ", 
  transcriptionWords: 500,
  translationWords: 20000,
  extra: ["ユーザー統一管理", "企業通用辞書", "専用サポート"] 
};

const addOns = [
  { hours: 2, prices: { JPY: 2400, USD: 16, CNY: 110, TWD: 490 } },
  { hours: 6, prices: { JPY: 6999, USD: 45, CNY: 320, TWD: 1400 } },
  { hours: 15, prices: { JPY: 15999, USD: 109, CNY: 750, TWD: 3200 } },
  { hours: 30, prices: { JPY: 29999, USD: 199, CNY: 1400, TWD: 5999 } },
];

function formatPrice(price, currency) {
  if (currency === 'JPY') {
    return price.toLocaleString("ja-JP");
  } else {
    return price.toLocaleString();
  }
}

function Price({ plan, currency = 'JPY' }) {
  const currencyInfo = currencies[currency];
  const price = plan.prices ? plan.prices[currency] : plan.price;

  return (
    <div className="flex items-end gap-1">
      <span className="text-4xl font-semibold tracking-tight">
        {currencyInfo.symbol}{formatPrice(price, currency)}
      </span>
      <span className="text-sm text-zinc-500">{currency}/月</span>
    </div>
  );
}

function PerHour({ price, hours }) {
  return null;
}

function CardWrapper({ title, children }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      {title && <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>}
      {children}
    </div>
  );
}

function PlanCard({ plan, currency = 'JPY' }) {
  return (
    <div className={`relative flex flex-col rounded-2xl border p-6 shadow-sm bg-white ${plan.popular ? "border-zinc-900" : "border-zinc-200"}`}>
      {plan.popular && (
        <div className="absolute -top-3 right-4">
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white shadow">人気</span>
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold tracking-tight">{plan.name}</h3>
      {(plan.price || plan.prices) ? (<>
        <Price plan={plan} currency={currency} />
        <PerHour price={plan.prices ? plan.prices[currency] : plan.price} hours={plan.hours} />
      </>) : (
        <p className="text-zinc-700 mt-2 text-base">{plan.description}</p>
      )}
      <div className="mt-4 grid gap-2 text-sm text-zinc-700">
        {plan.hours && <div>時間: {plan.hours} 時間/月</div>}
        <div>リアルタイム翻訳・要約対応</div>
        <div>個人コンソール付き</div>
        {plan.transcriptionWords && <div>音声辞書: {plan.transcriptionWords.toLocaleString("ja-JP")}語</div>}
        {plan.translationWords && <div>翻訳辞書: {plan.translationWords.toLocaleString("ja-JP")}ペア</div>}
        {plan.extra && plan.extra.map((e,i)=>(<div key={i}>{e}</div>))}
      </div>
      <button className="mt-6 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:opacity-90">{plan.price ? "今すぐ申し込む" : "お問い合わせ"}</button>
    </div>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [selectedCurrency, setSelectedCurrency] = useState("JPY");
  const plans = activeTab === "business" ? plansBusiness : activeTab === "personal" ? plansPersonal : [enterprisePlan];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900">
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-lg bg-zinc-900" />
            <span className="text-sm font-medium tracking-tight">Felo Pricing</span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">シンプルで柔軟な料金プラン</h1>
          <p className="mt-3 text-zinc-600">用途に合わせて Business / Personal / Enterprise を切り替えてご確認いただけます。</p>
          <div className="mt-6 inline-flex rounded-2xl border bg-white p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${activeTab === tab.key ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-50"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <CardWrapper>
          <div className={`grid gap-5 ${activeTab === "enterprise" ? "md:grid-cols-1" : "md:grid-cols-2 lg:grid-cols-4"}`}>
            {plans.map((p) => <PlanCard key={p.name} plan={p} currency={selectedCurrency} />)}
          </div>
        </CardWrapper>

        {activeTab !== "enterprise" && (
          <CardWrapper>
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-center">追加パッケージ（期限は当月まで）</h2>
            <p className="mb-2 text-sm text-zinc-600 text-center">不足分は当月内に追加購入いただけます。</p>
            <table className="w-full text-center text-sm">
              <thead className="bg-zinc-50">
                <tr className="border-b text-zinc-500">
                  <th className="px-4 py-3">時間</th>
                  <th className="px-4 py-3">総価格（{selectedCurrency}）</th>
                </tr>
              </thead>
              <tbody>
                {addOns.map((a, idx) => (
                  <tr key={idx} className="border-t hover:bg-zinc-50">
                    <td className="px-4 py-3 font-medium">{a.hours}時間</td>
                    <td className="px-4 py-3">
                      {currencies[selectedCurrency].symbol}{formatPrice(a.prices[selectedCurrency], selectedCurrency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardWrapper>
        )}

        <CardWrapper>
          <h2 className="mb-4 text-lg font-semibold tracking-tight text-center">Personal / Business / Enterprise 比較表</h2>
          <table className="w-full text-sm text-center">
            <thead className="bg-zinc-50">
              <tr className="border-b">
                <th className="px-3 py-2">項目</th>
                <th className="px-3 py-2">Personal</th>
                <th className="px-3 py-2">Business</th>
                <th className="px-3 py-2">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-3 py-2">対象</td><td className="px-3 py-2">個人ユーザー</td><td className="px-3 py-2">SMB・チーム</td><td className="px-3 py-2">大規模企業・代理店</td></tr>
              <tr className="border-t"><td className="px-3 py-2">請求書発行</td><td className="px-3 py-2">✕ 個人用途のみ</td><td className="px-3 py-2">◯</td><td className="px-3 py-2">◯</td></tr>
              <tr className="border-t"><td className="px-3 py-2">音声辞書</td><td className="px-3 py-2">最大200語</td><td className="px-3 py-2">最大500語</td><td className="px-3 py-2">最大500語</td></tr>
              <tr className="border-t"><td className="px-3 py-2">翻訳辞書</td><td className="px-3 py-2">最大1,000ペア</td><td className="px-3 py-2">最大5,000ペア</td><td className="px-3 py-2">最大20,000ペア</td></tr>
              <tr className="border-t"><td className="px-3 py-2">企業通用辞書</td><td className="px-3 py-2">✕</td><td className="px-3 py-2">✕</td><td className="px-3 py-2">◯</td></tr>
              <tr className="border-t"><td className="px-3 py-2">ユーザー統一管理</td><td className="px-3 py-2">✕</td><td className="px-3 py-2">✕</td><td className="px-3 py-2">◯</td></tr>
              <tr className="border-t"><td className="px-3 py-2">有効期間</td><td className="px-3 py-2">1か月（自動更新）</td><td className="px-3 py-2">1か月（自動更新）</td><td className="px-3 py-2">1年または1年半</td></tr>
              <tr className="border-t"><td className="px-3 py-2">追加パッケージ</td><td className="px-3 py-2">4種類（当月有効）</td><td className="px-3 py-2">4種類（当月有効）</td><td className="px-3 py-2">自由追加</td></tr>
              <tr className="border-t"><td className="px-3 py-2">時間配分</td><td className="px-3 py-2">✕</td><td className="px-3 py-2">✕</td><td className="px-3 py-2">◯</td></tr>
              <tr className="border-t"><td className="px-3 py-2">サポート</td><td className="px-3 py-2">標準</td><td className="px-3 py-2">標準</td><td className="px-3 py-2">優先サポート</td></tr>
              <tr className="border-t"><td className="px-3 py-2">導入</td><td className="px-3 py-2">即時</td><td className="px-3 py-2">即時</td><td className="px-3 py-2">個別導入（要相談）</td></tr>
            </tbody>
          </table>
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">個人版と企業版の主な違い</h3>
            <div className="text-sm text-gray-700 space-y-3">
              <div>
                <p className="font-semibold mb-1">Personal</p>
                <p>個人でのご利用に限定されており、企業向けの請求書は発行できません。</p>
                <p>辞書・用語集の利用には数の制限があります。</p>
                <p>有効期限は1か月となります。</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Enterprise</p>
                <p>企業向けの請求書発行が可能で、有効期間は1年から1年半です。</p>
                <p>大容量の辞書および企業共通辞書をご利用いただけるほか、管理画面によるユーザーの一元管理や利用時間の配分機能もご提供いたします。</p>
                <p>また、優先的なサポート体制も含まれております。</p>
              </div>
            </div>
          </div>
        </CardWrapper>

        {/* Currency Selector - floating bottom-right */}
        <div className="fixed bottom-4 right-4 z-40">
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-2">
            <div className="text-[10px] text-zinc-500 px-1 pb-1">通貨選択</div>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="px-3 py-2 border border-zinc-300 rounded-md bg-white text-sm font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent min-w-[180px]"
            >
              {Object.entries(currencies).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.symbol} {code} - {info.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
