"use client";

import React, { useState } from "react";
import {
  Camera,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  XCircle,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  Lock,
  Calendar,
  Droplets,
  Moon,
  Wind,
  Eye,
  AlertCircle,
  ChevronRight,
  BarChart3,
  Layers,
  Award,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

type ScalpProfileKey = "oily" | "dry" | "mixed";
type CapturePartKey = "crown" | "hairline" | "parting";

interface ScalpDemoData {
  tabLabel: string;
  scalpType: string;
  careItem: string;
  daysUsed: number;
  beforeMetrics: {
    volumeScore: string;
    oilinessFreq: string;
    nightDryHabit: string;
  };
  afterMetrics: {
    volumeScore: string;
    oilinessFreq: string;
    nightDryHabit: string;
  };
  aiReport: {
    headline: string;
    objectiveObservation: string;
    habitBottleneck: string;
    currentPhaseAdvice: string;
    ingredients: {
      category: string;
      reason: string;
    }[];
    next30DaysAction: string;
  };
}

const DEMO_PROFILES: Record<ScalpProfileKey, ScalpDemoData> = {
  oily: {
    tabLabel: "ケース1：夕方ベタつき・トップ潰れ傾向（37歳）",
    scalpType: "夕方ベタつきやすい脂性傾向",
    careItem: "アミノ酸＋ベタイン系スカルプシャンプーA ＋ 医薬部外品エッセンス",
    daysUsed: 32,
    beforeMetrics: {
      volumeScore: "2.1 / 5.0（昼過ぎに潰れる）",
      oilinessFreq: "週5日 夕方にベタつき記録",
      nightDryHabit: "自然乾燥が週3回",
    },
    afterMetrics: {
      volumeScore: "3.8 / 5.0（夕方まで根元維持）",
      oilinessFreq: "週1日に減少（-80%）",
      nightDryHabit: "夜ドライヤー乾燥を週6日実施",
    },
    aiReport: {
      headline: "夜のドライヤー乾燥徹底で、朝の根元の立ち上がり感が安定",
      objectiveObservation:
        "23時前の洗髪とドライヤー乾燥を実施した日は、翌朝のセットしやすさスコアが平均+1.5pt高く推移しています。",
      habitBottleneck:
        "飲酒と24時以降の就寝が重なった翌日は、頭皮のベタつき記録とトップの潰れやすさが顕著に増える傾向があります。",
      currentPhaseAdvice:
        "使用開始から32日目です。洗浄後のつっぱり感や赤みの記録はなく、現在の皮脂バランスとの相性は良好に推移しています。",
      ingredients: [
        {
          category: "アミノ酸系×適度な皮脂洗浄バランス設計",
          reason:
            "強い脱脂力で皮脂が過剰分泌するのを防ぎつつ、毛穴周りの余分な皮脂を穏やかに洗い流すため。",
        },
        {
          category: "グリチルリチン酸2K・センブリエキス配合（医薬部外品）",
          reason:
            "頭皮のベタつきに伴うフケ・かゆみを防ぎ、マッサージと併用して頭皮環境を健やかに保つ着眼点として。",
        },
      ],
      next30DaysAction: "洗髪後5分以内の根元ドライヤー乾燥を週6日以上キープする",
    },
  },
  dry: {
    tabLabel: "ケース2：乾燥・細毛ハリ不足傾向（39歳）",
    scalpType: "洗髪後に突っ張りやすい乾燥傾向",
    careItem: "高保湿スカルプシャンプーB ＋ 保湿ローション",
    daysUsed: 45,
    beforeMetrics: {
      volumeScore: "2.3 / 5.0（毛先がまとまらずペタン）",
      oilinessFreq: "乾燥・細かいフケが週4日",
      nightDryHabit: "熱いお湯（42℃）で朝シャン",
    },
    afterMetrics: {
      volumeScore: "3.6 / 5.0（ハリ・コシ実感）",
      oilinessFreq: "乾燥記録が週1日未満に低下",
      nightDryHabit: "38℃ぬるま湯洗髪＋保湿ケア定着",
    },
    aiReport: {
      headline: "ぬるま湯洗髪と頭皮保湿の定着により、乾燥記録が大幅に減少",
      objectiveObservation:
        "朝シャンから夜洗髪へ切り替え、湯温を下げた第2週以降、頭皮の突っ張り感と細かいフケの記録が急減しました。",
      habitBottleneck:
        "睡眠6時間未満が続いた週は、頭皮の乾燥スコアが悪化し、髪のハリ・コシ感の自己評価が1.1pt低下する相関が見られます。",
      currentPhaseAdvice:
        "使用開始から45日目です。ヘアサイクルの観察期間（3〜6ヶ月）の前半として、まずは頭皮の水分保持環境が整いつつあります。",
      ingredients: [
        {
          category: "セラミド・ヒアルロン酸等の保湿成分配合ローション",
          reason:
            "乾燥によるバリア機能低下を防ぎ、頭皮にうるおいを与えてハリ・コシのある髪が育ちやすい土台を整えるため。",
        },
        {
          category: "マイルドなベタイン系・タウリン系洗浄成分",
          reason:
            "必要なうるおいを残しながら洗髪できるため、洗髪後の乾燥感やフケ・かゆみを防ぐ選択基準になります。",
        },
      ],
      next30DaysAction: "シャワー温度38℃設定と洗髪後の頭皮保湿を60日目まで継続検証する",
    },
  },
  mixed: {
    tabLabel: "ケース3：生え際・つむじのシルエット不安（36歳）",
    scalpType: "Tゾーン脂性・後頭部乾燥の混合傾向",
    careItem: "スカルプエッセンスC（医薬部外品）＋ 頭皮マッサージ習慣",
    daysUsed: 60,
    beforeMetrics: {
      volumeScore: "2.0 / 5.0（つむじの地肌透けが気になる）",
      oilinessFreq: "前頭部ベタつき週4日",
      nightDryHabit: "ケア用品を2週間でコロコロ変更",
    },
    afterMetrics: {
      volumeScore: "3.9 / 5.0（分け目の立ち上がり改善）",
      oilinessFreq: "週1〜2日に安定",
      nightDryHabit: "同一ケアを60日間ブレずに継続",
    },
    aiReport: {
      headline: "同一角度の定点比較で、分け目シルエットの安定推移を確認",
      objectiveObservation:
        "ガイド撮影による30日前・60日前の比較では、洗髪乾燥後のつむじ周りの立ち上がり感に安定した維持傾向が見られます。",
      habitBottleneck:
        "外食・脂質過多の食事が2日続いた後は、前頭部のベタつきスコアが上昇し、生え際の束感が出やすくなっています。",
      currentPhaseAdvice:
        "使用開始から60日目です。途中でアイテムを変えずに継続できたことで、生活習慣との因果関係が明確に数値化されています。",
      ingredients: [
        {
          category: "ニコチン酸アミド・パンテノール等の整肌・血行促進サポート成分",
          reason:
            "マッサージ習慣と組み合わせることで、頭皮を健やかに保ち、毛髪にハリ・コシを与えるケアの指標になります。",
        },
        {
          category: "ノンシリコン・低刺激処方のスカルプシャンプー",
          reason:
            "根元の軽さを出しやすく、夕方の重さやシルエットの潰れを抑えたい場合の比較基準として有効です。",
        },
      ],
      next30DaysAction: "90日目の節目比較まで現在のエッセンスと1分マッサージを継続する",
    },
  },
};

export default function Lp013() {
  const [selectedProfile, setSelectedProfile] = useState<ScalpProfileKey>("oily");
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [capturePart, setCapturePart] = useState<CapturePartKey>("crown");
  const [ghostOverlay, setGhostOverlay] = useState<boolean>(true);

  const currentDemo = DEMO_PROFILES[selectedProfile];

  const scrollToRegister = () => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-400 selection:text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/20">
              <Camera className="h-5 w-5 stroke-[2.4]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                Scalp<span className="text-teal-400">Log</span>
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-teal-300 sm:inline-block">
                自宅ケア検証・定点トラッキング
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-full bg-teal-400 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-teal-400/20 transition hover:bg-teal-300 sm:px-5 sm:text-sm"
          >
            <span>先行14日間無料で始める</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.13),_transparent_58%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Copy */}
            <div className="text-center lg:col-span-7 lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 text-xs font-semibold text-teal-300">
                <ShieldCheck className="h-4 w-4 shrink-0 text-teal-400" />
                <span className="text-balance">
                  <span className="inline-block">カメラロール非保存・</span>
                  <span className="inline-block">匿名利用OKの</span>
                  <span className="inline-block">プライベートヘアログ</span>
                </span>
              </div>

              <p className="text-sm font-bold text-slate-300 sm:text-base text-balance">
                <span className="inline-block">まだハゲてはいない。だが</span>
                <span className="inline-block">「最近、髪が細くなって</span>
                <span className="inline-block">トップのボリュームが出ない」と</span>
                <span className="inline-block">鏡の前で焦り始めた30代後半のあなたへ</span>
              </p>

              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.16] text-balance">
                <span className="inline-block">いきなり月2万円の</span>
                <span className="inline-block">AGAクリニックに行く前に、</span>
                <span className="mt-1 block bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  <span className="inline-block">まずは3ヶ月</span>
                  <span className="inline-block">『自宅ケアの本当の相性』を</span>
                  <span className="inline-block">数値で検証しませんか？</span>
                </span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
                <span className="inline-block">高い育毛剤やスカルプシャンプーを買っても</span>
                <span className="inline-block">「合っているか分からないまま3週間でやめてしまう」</span>
                <span className="inline-block">感覚頼みのケアを卒業。</span>{" "}
                <span className="inline-block"><strong className="text-white">半透明シルエットガイド付きの定点撮影</strong>と</span>
                <span className="inline-block"><strong className="text-teal-300">生活習慣ログ</strong>で、</span>
                <span className="inline-block">あなたの髪と頭皮のコンディション変化を</span>
                <span className="inline-block">客観的に可視化します。</span>
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 px-7 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-teal-500/20 transition hover:brightness-110 sm:w-auto"
                >
                  <span className="inline-block">14日間無料で</span>
                  <span className="inline-block">「自宅ケア検証」を予約する</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>
                <a
                  href="#core-experience"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 sm:w-auto"
                >
                  <SlidersHorizontal className="h-4 w-4 text-teal-400" />
                  <span>定点比較＆AI分析デモを見る</span>
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-400 lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-teal-400" />
                  スマホ写真フォルダに一切残らない専用暗号化保存
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  医療機関への強引な勧誘なし・中立データ管理
                </span>
              </div>
            </div>

            {/* Right Interactive Smartphone Camera Guide Mockup */}
            <div className="mx-auto w-full max-w-[360px] lg:col-span-5">
              <div className="overflow-hidden rounded-[2rem] border-2 border-slate-800 bg-slate-900 p-3 shadow-2xl shadow-teal-950/40">
                <div className="rounded-2xl bg-slate-950 p-3.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono font-bold text-teal-400">SCALPLOG CAM // PWA</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      <Lock className="h-2.5 w-2.5" />
                      カメラロール非保存
                    </span>
                  </div>

                  {/* Part Switcher */}
                  <div className="mt-3 grid grid-cols-3 gap-1 rounded-lg bg-slate-900 p-1 text-[11px] font-bold">
                    {[
                      { id: "crown" as const, label: "頭頂部" },
                      { id: "hairline" as const, label: "生え際" },
                      { id: "parting" as const, label: "分け目" },
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.id}
                        onClick={() => setCapturePart(tab.id)}
                        className={`rounded-md py-1.5 transition ${
                          capturePart === tab.id
                            ? "bg-teal-400 text-slate-950"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* SVG Camera Viewfinder with Silhouette & Ghost Overlay */}
                  <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(45,212,191,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(45,212,191,0.08)_1px,transparent_1px)] bg-[size:25%_25%]" />

                    <svg
                      viewBox="0 0 240 180"
                      className="h-full w-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {capturePart === "crown" && (
                        <>
                          <ellipse
                            cx="120"
                            cy="92"
                            rx="68"
                            ry="74"
                            stroke="#2dd4bf"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                          />
                          {ghostOverlay && (
                            <g opacity="0.28">
                              <circle cx="120" cy="86" r="46" fill="#14b8a6" />
                              <path
                                d="M120 86 C110 70, 95 65, 85 75 M120 86 C132 68, 148 68, 155 80 M120 86 C128 102, 122 118, 110 124 M120 86 C104 96, 92 108, 95 120"
                                stroke="#99f6e4"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            </g>
                          )}
                          <circle cx="120" cy="86" r="14" stroke="#34d399" strokeWidth="1.5" />
                          <line x1="120" y1="64" x2="120" y2="108" stroke="#34d399" strokeWidth="1" />
                          <line x1="98" y1="86" x2="142" y2="86" stroke="#34d399" strokeWidth="1" />
                        </>
                      )}

                      {capturePart === "hairline" && (
                        <>
                          <path
                            d="M48 155 C52 80, 75 36, 120 36 C165 36, 188 80, 192 155"
                            stroke="#2dd4bf"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                          />
                          {ghostOverlay && (
                            <path
                              d="M62 110 C82 95, 100 84, 120 84 C140 84, 158 95, 178 110"
                              stroke="#5eead4"
                              strokeWidth="3"
                              opacity="0.4"
                            />
                          )}
                          <line
                            x1="55"
                            y1="96"
                            x2="185"
                            y2="96"
                            stroke="#34d399"
                            strokeWidth="1.2"
                            strokeDasharray="3 3"
                          />
                          <text x="82" y="75" fill="#99f6e4" fontSize="9" fontWeight="bold">
                            眉上3本指ライン基準
                          </text>
                        </>
                      )}

                      {capturePart === "parting" && (
                        <>
                          <ellipse
                            cx="120"
                            cy="92"
                            rx="62"
                            ry="72"
                            stroke="#2dd4bf"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                          />
                          {ghostOverlay && (
                            <rect
                              x="114"
                              y="32"
                              width="12"
                              height="118"
                              rx="6"
                              fill="#2dd4bf"
                              opacity="0.25"
                            />
                          )}
                          <line x1="120" y1="26" x2="120" y2="156" stroke="#34d399" strokeWidth="1.5" />
                        </>
                      )}
                    </svg>

                    <div className="absolute top-2 right-2 left-2 flex items-center justify-between">
                      <span className="rounded bg-slate-950/85 px-2 py-0.5 text-[10px] font-semibold text-teal-300">
                        角度センサー：水平 OK（0.4°）
                      </span>
                      <button
                        type="button"
                        onClick={() => setGhostOverlay(!ghostOverlay)}
                        className={`rounded px-2 py-0.5 text-[10px] font-bold transition ${
                          ghostOverlay
                            ? "bg-teal-400 text-slate-950"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        前回ゴースト: {ghostOverlay ? "ON" : "OFF"}
                      </button>
                    </div>

                    <div className="absolute right-2 bottom-2 left-2 rounded bg-slate-950/85 px-2.5 py-1 text-center text-[10px] text-slate-300">
                      前回（30日前）のシルエットに輪郭を合わせてシャッター
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between px-2">
                    <span className="text-[10px] text-slate-400">照明：洗面所LED（前回一致）</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal-400 bg-teal-400/20">
                      <div className="h-7 w-7 rounded-full bg-teal-400" />
                    </div>
                    <span className="text-[10px] font-bold text-teal-300">次へ：30秒習慣ログ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain & Empathy Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold tracking-wider text-teal-400 uppercase">
              WHY HOME CARE FAILS
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              35歳を過ぎて、こんな「静かな焦り」と「迷い」を抱えていませんか？
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Wind className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                朝セットしても昼にはトップが潰れる
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                以前より髪1本1本が細く柔らかくなり、雨の日やエレベーター内の強い照明の下で地肌の透け感が妙に気になるようになった。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                育毛剤を3週間でやめてしまう
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                Amazonやドラッグストアで高評価のスカルプケアを買っても、変化が分からず「お金をドブに捨てている感覚」になり別の商品へ乗り換えてしまう。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                クリニックの高額契約に踏み切れない
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                「月々数千円〜」の広告を見ても、実際は年間20万〜30万円のプランや薬の長期継続が前提になりそうで、まだその段階か判断がつかない。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-teal-400/25 bg-gradient-to-r from-teal-950/35 via-slate-900 to-slate-900 p-6 sm:p-8">
            <p className="text-xs font-extrabold text-teal-400">
              CORE INSIGHT // 自宅ケアが失敗する最大の理由
            </p>
            <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">
              原因は、あなたの努力不足ではなく「比較の物差しがないこと」です
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              人の記憶は曖昧で、昨日の自分と今日の自分の髪質の違いは肉眼では分かりません。その結果、本当に相性が良いケア用品も「変化がない」と勘違いして途中でやめ、逆に睡眠不足や洗髪乾燥の乱れという「真の悪化要因」を見落としたまま高額課金へ流れてしまうのです。
            </p>
          </div>
        </div>
      </section>

      {/* Core Experience Section: Interactive Before/After Slider + AI Condition Report */}
      <section id="core-experience" className="border-b border-slate-800/80 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs font-bold text-teal-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>INTERACTIVE REPORT & COMPARISON PREVIEW</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              「同一角度の定点比較」×「AIコンディション分析」
              <br />
              実際の月次レポート画面を体験する
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              頭皮タイプ別のサンプルを切り替えて、ビフォーアフター比較スライダーと、薬機法を遵守した客観的ケア相性レポートをご覧ください。
            </p>
          </div>

          {/* Profile Switcher Tabs */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {(Object.keys(DEMO_PROFILES) as ScalpProfileKey[]).map((key) => {
              const active = selectedProfile === key;
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => setSelectedProfile(key)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                    active
                      ? "bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20"
                      : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {DEMO_PROFILES[key].tabLabel}
                </button>
              );
            })}
          </div>

          {/* Main Dashboard Preview Container */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  app.scalplog.jp / report / monthly-summary
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded bg-teal-400/15 px-2.5 py-0.5 font-bold text-teal-300">
                  検証継続：{currentDemo.daysUsed}日目
                </span>
                <span className="hidden rounded bg-slate-800 px-2.5 py-0.5 text-slate-300 sm:inline-block">
                  タイプ：{currentDemo.scalpType}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Interactive Before/After Comparison Slider & Habit Metrics */}
              <div className="border-b border-slate-800 p-4 sm:p-6 lg:col-span-5 lg:border-r lg:border-b-0">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white">
                    ① 同一角度・同一照明 比較スライダー
                  </span>
                  <span className="text-[11px] font-semibold text-teal-300">
                    左右にドラッグして比較
                  </span>
                </div>

                {/* Interactive SVG Split Comparison Box */}
                <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                  {/* AFTER Layer */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-teal-950/30">
                    <svg viewBox="0 0 240 180" className="h-full w-full">
                      <circle cx="120" cy="90" r="64" fill="#1e293b" stroke="#2dd4bf" strokeWidth="1.5" />
                      <g stroke="#5eead4" strokeWidth="2.2" strokeLinecap="round" opacity="0.85">
                        <path d="M120 90 C108 66, 90 54, 72 62" />
                        <path d="M120 90 C118 62, 112 44, 102 36" />
                        <path d="M120 90 C134 64, 152 52, 168 62" />
                        <path d="M120 90 C144 82, 166 84, 178 96" />
                        <path d="M120 90 C136 112, 142 132, 132 146" />
                        <path d="M120 90 C106 114, 96 130, 84 138" />
                        <path d="M120 90 C94 88, 74 96, 64 110" />
                        <path d="M120 90 C112 76, 128 72, 138 52" />
                        <path d="M120 90 C102 98, 86 112, 76 124" />
                      </g>
                      <circle cx="120" cy="90" r="5" fill="#2dd4bf" />
                    </svg>
                    <span className="absolute top-2.5 right-2.5 rounded bg-teal-400 px-2 py-0.5 text-[10px] font-extrabold text-slate-950">
                      現在（{currentDemo.daysUsed}日目）
                    </span>
                    <span className="absolute right-2.5 bottom-2.5 rounded bg-slate-950/85 px-2 py-0.5 text-[10px] text-teal-200">
                      根元立ち上がり感：良好
                    </span>
                  </div>

                  {/* BEFORE Layer */}
                  <div
                    className="absolute inset-0 overflow-hidden bg-slate-950"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
                      <svg viewBox="0 0 240 180" className="h-full w-full">
                        <circle cx="120" cy="90" r="64" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                        <circle cx="120" cy="90" r="18" fill="#334155" opacity="0.65" />
                        <g stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
                          <path d="M120 90 C106 72, 92 64, 76 70" />
                          <path d="M120 90 C134 70, 150 64, 164 72" />
                          <path d="M120 90 C134 110, 138 128, 128 142" />
                          <path d="M120 90 C102 108, 90 124, 80 134" />
                          <path d="M120 90 C94 92, 76 100, 66 112" />
                        </g>
                      </svg>
                      <span className="absolute top-2.5 left-2.5 rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                        検証初日（Day 1）
                      </span>
                      <span className="absolute bottom-2.5 left-2.5 rounded bg-slate-950/85 px-2 py-0.5 text-[10px] text-slate-400">
                        皮脂による束感・潰れあり
                      </span>
                    </div>
                  </div>

                  {/* Vertical Divider Handle */}
                  <div
                    className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-slate-950 bg-teal-400 text-[10px] font-extrabold text-slate-950 shadow-md">
                      ⇄
                    </div>
                  </div>

                  <input
                    type="range"
                    min={10}
                    max={90}
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    aria-label="ビフォーアフター比較スライダー"
                    className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                  />
                </div>

                {/* Objective Metric Shifts */}
                <div className="mt-4 space-y-2.5">
                  <div className="text-xs font-extrabold text-white">
                    ② 記録スコアと生活習慣の客観推移
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>朝のセット・ボリューム自己評価</span>
                      <TrendingUp className="h-3.5 w-3.5 text-teal-400" />
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-slate-500 line-through">{currentDemo.beforeMetrics.volumeScore}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                      <span className="font-bold text-teal-300">{currentDemo.afterMetrics.volumeScore}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>頭皮コンディション（皮脂・乾燥頻度）</span>
                      <Droplets className="h-3.5 w-3.5 text-sky-400" />
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-slate-500">{currentDemo.beforeMetrics.oilinessFreq}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                      <span className="font-bold text-emerald-300">{currentDemo.afterMetrics.oilinessFreq}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>洗髪・ドライヤー乾燥習慣</span>
                      <Moon className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-slate-500">{currentDemo.beforeMetrics.nightDryHabit}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                      <span className="font-bold text-slate-200">{currentDemo.afterMetrics.nightDryHabit}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Condition & Commercial Ingredient Advice */}
              <div className="bg-slate-950/40 p-4 sm:p-6 lg:col-span-7">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-teal-400" />
                    <h3 className="text-xs font-extrabold text-white sm:text-sm">
                      ③ AIコンディション傾向＆市販成分選び方レポート
                    </h3>
                  </div>
                  <span className="rounded border border-slate-700 bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                    使用中：{currentDemo.careItem}
                  </span>
                </div>

                <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5">
                  <div className="rounded-lg border-l-4 border-teal-400 bg-slate-950 p-3.5">
                    <span className="text-[10px] font-bold tracking-wider text-teal-400 uppercase">
                      MONTHLY CONDITION SUMMARY
                    </span>
                    <p className="mt-1 text-sm font-extrabold text-white sm:text-base">
                      {currentDemo.aiReport.headline}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3.5">
                      <span className="text-[11px] font-bold text-emerald-400">
                        ✓ ログから見えたプラス相関
                      </span>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                        {currentDemo.aiReport.objectiveObservation}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3.5">
                      <span className="text-[11px] font-bold text-amber-400">
                        ! コンディション低下の生活習慣傾向
                      </span>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                        {currentDemo.aiReport.habitBottleneck}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Calendar className="h-3.5 w-3.5 text-teal-400" />
                      <span>現在のケア用品・経過フェーズ評価</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                      {currentDemo.aiReport.currentPhaseAdvice}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-extrabold text-white">
                      あなたの頭皮記録に基づく「市販ケア成分の着眼点」
                    </span>
                    <div className="mt-2 space-y-2.5">
                      {currentDemo.aiReport.ingredients.map((ing, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-xs"
                        >
                          <div className="font-bold text-teal-300">
                            着眼点 0{idx + 1}：{ing.category}
                          </div>
                          <p className="mt-1 leading-relaxed text-slate-300">{ing.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-teal-400/30 bg-teal-400/10 px-4 py-3 text-xs">
                    <div>
                      <span className="block text-[10px] font-bold text-teal-300 uppercase">
                        NEXT 30 DAYS VERIFICATION GOAL
                      </span>
                      <span className="font-bold text-white">
                        {currentDemo.aiReport.next30DaysAction}
                      </span>
                    </div>
                    <Layers className="h-5 w-5 shrink-0 text-teal-400" />
                  </div>

                  <p className="text-[11px] leading-relaxed text-slate-500">
                    ※本レポートはユーザー自身の記録データに基づくセルフケア・コンディション管理の参考情報であり、医学的診断や発毛・治療効果を保証するものではありません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Comparison Table */}
      <section className="border-b border-slate-800/80 bg-slate-900/30 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-teal-400 uppercase">
              RATIONAL SELF-CARE
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              感覚頼みの自己流ケア vs ScalpLogでの数値検証
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/25 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-extrabold">これまでの感覚頼みの自宅ケア</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    鏡を見る角度や照明が毎回違うため、<strong>良くなっているのか悪化しているのか判別できない</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    ヘアサイクルの観察に必要な3ヶ月を待たず、<strong>2〜3週間で「効かない」と判断して別の高い育毛剤へ乗り換える</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    自分のスマホの写真フォルダに頭頂部の自撮りが残り、<strong>家族や同僚に画面を見られるのが怖い</strong>
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-b from-teal-950/25 to-slate-950 p-6 shadow-xl shadow-teal-950/20">
              <div className="mb-4 flex items-center gap-2 text-teal-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-extrabold">ScalpLog 導入後の合理的ケア検証</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-teal-400">✓</span>
                  <span>
                    前回シルエットの半透明ガイドにより、<strong>30日前・60日前と全く同じ条件で客観比較</strong>できる
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-teal-400">✓</span>
                  <span>
                    シャンプー・育毛剤の切替日と「睡眠・乾燥・皮脂スコア」が紐づき、<strong>自分に合う成分・習慣がデータで判明</strong>する
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-teal-400">✓</span>
                  <span>
                    カメラロールには一切保存されず、<strong>専用暗号化クラウドに隔離保管</strong>されるためプライバシーが完全に守られる
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & ROI Offer Section */}
      <section className="border-b border-slate-800/80 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-teal-400/30 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/25 p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-teal-400/15 px-2.5 py-1 text-xs font-bold text-teal-300">
                  <Award className="h-3.5 w-3.5" />
                  <span>パーソナル検証プラン（全機能無制限）</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  正式リリース予定価格：月額 3,980円（税込）
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  相性も分からないまま毎月8,000円〜15,000円の市販育毛剤や高額サロンを買い続けるコストの
                  <strong className="text-teal-300">半分以下</strong>。
                  さらに、根拠なくクリニックで年間20万〜30万円の契約を結ぶ前に、「まずは月3,980円で3ヶ月間、自分の生活習慣と市販ケアの限界値を正確に測る」ための最も合理的な投資です。
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-center sm:min-w-[240px]">
                <span className="text-xs font-bold text-teal-400">先行登録モニター特典</span>
                <div className="mt-1 text-xl font-extrabold text-white">最初の14日間 無料</div>
                <div className="text-xs font-bold text-emerald-400">＋ 頭皮タイプ別・成分選び方ガイド</div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  無料期間中の解約はワンタップ・費用は0円
                </p>
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="mt-4 w-full rounded-xl bg-teal-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-teal-300"
                >
                  先行枠に登録する →
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Lock className="h-4 w-4 shrink-0 text-teal-400" />
                <span>カメラロール非保存・暗号化プライベート保管無制限</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>半透明シルエットガイド撮影＆無制限ビフォーアフター比較</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="h-4 w-4 shrink-0 text-teal-400" />
                <span>月次コンディション傾向＆市販成分選び方AIレポート</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Form Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="013"
            productName="ScalpLog（ガイド付き定点撮影＆自宅ヘアケア相性検証ログ）"
            offerText="【先行登録者限定特典】正式リリース時の優先案内（初回14日間完全無料トライアル枠）に加え、広告に惑わされず自分の頭皮タイプに合う市販品を見極める『30代からのスカルプ成分・洗浄バランス早見ガイド（PDF）』を無料進呈します。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 ScalpLog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
