"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Volume2,
  Globe,
  TrendingUp,
  Layers,
  ShieldCheck,
  Zap,
  Coffee,
  Target,
  BrainCircuit,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

interface VocabItem {
  id: string;
  term: string;
  partOfSpeech: string;
  pronunciation: string;
  meaningJa: string;
  quoteEn: string;
  exampleEn: string;
  exampleJa: string;
}

interface ArticleDemo {
  roleLabel: string;
  jobTitle: string;
  topics: string[];
  levelLabel: string;
  sourceMedia: string;
  readMinutes: number;
  wordCount: number;
  relevanceScore: number;
  titleEn: string;
  titleJa: string;
  summaryLines: {
    fact: string;
    context: string;
    takeaway: string;
  };
  paragraphs: {
    text: string;
    highlightTerm?: string;
  }[];
  vocabList: VocabItem[];
}

const DEMO_ARTICLES: Record<string, ArticleDemo> = {
  pm: {
    roleLabel: "BtoB SaaS プロダクトマネージャー",
    jobTitle: "BtoB SaaS プロダクトマネージャー",
    topics: ["AI Agents", "Pricing Strategy", "Enterprise Sales"],
    levelLabel: "上級（TOEIC 750〜900点目安）",
    sourceMedia: "Stratechery / SaaS Executive Brief",
    readMinutes: 7,
    wordCount: 1120,
    relevanceScore: 96,
    titleEn: "Why Seat-Based Pricing Is Dying in the Era of Autonomous AI Agents",
    titleJa: "自律型AIエージェント時代において「ID課金モデル」が終焉を迎えつつある理由",
    summaryLines: {
      fact: "① 事実：AIエージェントが人間の作業を代替することで、従来の「ユーザーID数に応じたSaaS課金」の売上が頭打ちになり始めている。",
      context: "② 背景：顧客企業はツールを使う社員数を減らす一方でAI処理量を増やしており、成果報酬型・従量課金への移行が急速に進んでいる。",
      takeaway: "③ 業務への示唆：来期の料金改定や新AI機能のプライシング設計では、ID課金から「業務完了数・消費クレジット課金」へのハイブリッド化を検討すべき。",
    },
    paragraphs: [
      {
        text: "For two decades, the golden rule of enterprise software was simple: sell more seats. As customers grew their headcount, SaaS vendors enjoyed predictable expansion revenue without lifting a finger.",
      },
      {
        text: "However, autonomous AI agents are actively cannibalizing traditional seat licenses. When one AI workflow accomplishes the work of five junior analysts, enterprises inevitably shrink their seat count at renewal—creating a severe headwind for legacy SaaS valuations.",
        highlightTerm: "cannibalizing",
      },
      {
        text: "Forward-thinking product leaders are now deciding to double down on outcome-based pricing. Instead of charging per login, they meter resolved support tickets, qualified leads, or automated compliance checks.",
        highlightTerm: "double down on",
      },
    ],
    vocabList: [
      {
        id: "pm-1",
        term: "cannibalize",
        partOfSpeech: "動詞",
        pronunciation: "/ˈkænɪbəlaɪz/",
        meaningJa: "（自社や既存事業の売上・シェアを）共食いする、侵食する",
        quoteEn: "However, autonomous AI agents are actively cannibalizing traditional seat licenses.",
        exampleEn: "We need to ensure our new self-serve plan doesn't cannibalize our enterprise deals.",
        exampleJa: "新しいセルフサーブプランが、既存のエンタープライズ契約を共食いしないよう設計する必要があります。",
      },
      {
        id: "pm-2",
        term: "headwind",
        partOfSpeech: "名詞",
        pronunciation: "/ˈhɛdwɪnd/",
        meaningJa: "（事業成長や業績を阻む）逆風、悪材料",
        quoteEn: "...creating a severe headwind for legacy SaaS valuations.",
        exampleEn: "Currency fluctuations remain a major headwind for our Q3 expansion.",
        exampleJa: "為替変動は第3四半期の事業拡大における大きな逆風であり続けています。",
      },
      {
        id: "pm-3",
        term: "double down on",
        partOfSpeech: "句動詞",
        pronunciation: "/ˈdʌbəl daʊn ɑn/",
        meaningJa: "〜にさらに注力する、思い切ってリソースを集中させる",
        quoteEn: "Forward-thinking product leaders are now deciding to double down on outcome-based pricing.",
        exampleEn: "Following strong retention metrics, we decided to double down on AI workflow automation.",
        exampleJa: "高い継続率を受け、私たちはAIワークフロー自動化にさらにリソースを集中させることにしました。",
      },
      {
        id: "pm-4",
        term: "predictable expansion revenue",
        partOfSpeech: "名詞句",
        pronunciation: "/prɪˈdɪktəbəl ɪkˈspænʃən ˈrɛvəˌnu/",
        meaningJa: "予測可能なアップセル・追加拡大収益",
        quoteEn: "SaaS vendors enjoyed predictable expansion revenue without lifting a finger.",
        exampleEn: "Usage-based tiers unlocked predictable expansion revenue across mid-market accounts.",
        exampleJa: "従量課金プランの導入により、中堅顧客層から予測可能な拡大収益を生み出せるようになりました。",
      },
      {
        id: "pm-5",
        term: "outcome-based pricing",
        partOfSpeech: "名詞句",
        pronunciation: "/ˈaʊtkʌm beɪst ˈpraɪsɪŋ/",
        meaningJa: "成果報酬型プライシング（結果・完了タスクに応じた課金体系）",
        quoteEn: "Forward-thinking product leaders are now deciding to double down on outcome-based pricing.",
        exampleEn: "Customers are far more willing to approve outcome-based pricing when ROI is measurable.",
        exampleJa: "ROIが測定可能な場合、顧客は成果報酬型プライシングをはるかに承認しやすくなります。",
      },
    ],
  },
  finance: {
    roleLabel: "クロスボーダーM&A・事業開発",
    jobTitle: "経営企画・クロスボーダーM&A担当",
    topics: ["Cross-border M&A", "Private Equity", "Corporate Governance"],
    levelLabel: "ネイティブ並み（TOEIC 900点〜）",
    sourceMedia: "Financial Times / DealBook Insights",
    readMinutes: 8,
    wordCount: 1340,
    relevanceScore: 94,
    titleEn: "How Japanese Strategics Are Outbidding Private Equity in European Mid-Market Deals",
    titleJa: "欧州中堅企業の買収案件で、日本企業がPEファンドに競り勝っている構造的理由",
    summaryLines: {
      fact: "① 事実：欧州のミドルマーケットM&Aにおいて、日本の事業会社がPE（プライベートエクイティ）ファンドを抑えて買収を成立させる事例が急増している。",
      context: "② 背景：高金利環境でPEファンドのレバレッジ調達コストが上昇する一方、潤沢な手元資金と長期保有視点を持つ日本企業の評価が高まっている。",
      takeaway: "③ 業務への示唆：欧州案件のソーシングでは、単なる買収価格だけでなく「長期雇用維持・技術統合シナジー」を前面に出す交渉戦略が有効。",
    },
    paragraphs: [
      {
        text: "Elevated borrowing costs have forced private equity sponsors to trim their valuation multiples across Western Europe, opening an unexpected window for cash-rich Japanese strategic buyers.",
        highlightTerm: "valuation multiples",
      },
      {
        text: "Unlike financial sponsors bound by a rigid five-year exit horizon, Japanese corporates can underwrite longer-term industrial synergies and offer founders operational continuity.",
        highlightTerm: "underwrite",
      },
      {
        text: "Nevertheless, post-merger integration remains the Achilles' heel. Successful acquirers are ring-fencing core engineering teams while gradually aligning governance frameworks.",
        highlightTerm: "ring-fencing",
      },
    ],
    vocabList: [
      {
        id: "fin-1",
        term: "valuation multiple",
        partOfSpeech: "名詞句",
        pronunciation: "/ˌvæljuˈeɪʃən ˈmʌltɪpəl/",
        meaningJa: "バリュエーション倍率（EBITDA倍率などの企業価値評価指標）",
        quoteEn: "Elevated borrowing costs have forced private equity sponsors to trim their valuation multiples...",
        exampleEn: "Higher interest rates have compressed valuation multiples across the industrial tech sector.",
        exampleJa: "金利上昇により、産業テックセクター全体のバリュエーション倍率が圧縮されています。",
      },
      {
        id: "fin-2",
        term: "underwrite",
        partOfSpeech: "動詞",
        pronunciation: "/ˌʌndərˈraɪt/",
        meaningJa: "（投資リターンや計画の前提として）織り込む、裏付ける、引き受ける",
        quoteEn: "...Japanese corporates can underwrite longer-term industrial synergies...",
        exampleEn: "We cannot underwrite 20% top-line growth without clearer visibility into European demand.",
        exampleJa: "欧州需要のより明確な見通しなしに、売上高20%成長を前提として織り込むことはできません。",
      },
      {
        id: "fin-3",
        term: "ring-fence",
        partOfSpeech: "動詞",
        pronunciation: "/ˈrɪŋ fɛns/",
        meaningJa: "（特定の事業・部門・資金を他から切り離して）保護する、別枠で管理する",
        quoteEn: "Successful acquirers are ring-fencing core engineering teams...",
        exampleEn: "We agreed to ring-fence the startup's R&D budget for the first 24 months post-close.",
        exampleJa: "買収完了後の最初の24ヶ月間は、そのスタートアップの研究開発予算を別枠で保護することに合意しました。",
      },
      {
        id: "fin-4",
        term: "strategic buyer",
        partOfSpeech: "名詞句",
        pronunciation: "/strəˈtiːdʒɪk ˈbaɪər/",
        meaningJa: "事業会社（シナジー目的で買収を行う買い手企業、PEファンドの対義語）",
        quoteEn: "...opening an unexpected window for cash-rich Japanese strategic buyers.",
        exampleEn: "The founder preferred selling to a strategic buyer rather than a financial sponsor.",
        exampleJa: "創業者は投資ファンドではなく、事業シナジーのある事業会社への売却を選びました。",
      },
      {
        id: "fin-5",
        term: "post-merger integration (PMI)",
        partOfSpeech: "名詞句",
        pronunciation: "/poʊst ˈmɜːrdʒər ˌɪntɪˈɡreɪʃən/",
        meaningJa: "合併後の統合プロセス（PMI）",
        quoteEn: "Nevertheless, post-merger integration remains the Achilles' heel.",
        exampleEn: "Cross-cultural communication is often the hardest part of cross-border post-merger integration.",
        exampleJa: "異文化コミュニケーションは、クロスボーダーPMIにおいて最も難しい要素になりがちです。",
      },
    ],
  },
  supply: {
    roleLabel: "グローバル調達・サプライチェーン",
    jobTitle: "半導体・製造業 サプライチェーン企画",
    topics: ["Semiconductors", "Friend-shoring", "Inventory Resilience"],
    levelLabel: "中級〜上級（TOEIC 650〜800点目安）",
    sourceMedia: "Harvard Business Review / Supply Chain Digest",
    readMinutes: 6,
    wordCount: 940,
    relevanceScore: 95,
    titleEn: "Moving Beyond 'Just-in-Case': How Tier-1 Manufacturers Are Redesigning Dual-Sourcing",
    titleJa: "単なる「過剰在庫」からの脱却：大手製造業が再設計するデュアルソーシング戦略",
    summaryLines: {
      fact: "① 事実：地政学リスク対策として在庫を積み増した製造業が、キャッシュフロー悪化を受けて調達網の「賢い分散化」へ舵を切っている。",
      context: "② 背景：主要部品の2社購買（デュアルソーシング）を形式的に導入しても、2次・3次下請け（Tier-2/3）が同じ地域に集中していればリスクは消えない。",
      takeaway: "③ 業務への示唆：自社の重要部材についても、一次仕入先だけでなくTier-2以降の地理的重複をマッピングし直す必要がある。",
    },
    paragraphs: [
      {
        text: "After years of stockpiling components to survive pandemic-era bottlenecks, global manufacturers are confronting a painful reality: bloated balance sheets tie up capital needed for R&D.",
        highlightTerm: "bottlenecks",
      },
      {
        text: "True supply chain resilience requires mapping sub-tier dependencies. Many firms discovered that while they contracted two distinct Tier-1 suppliers, both relied on the exact same upstream raw material processor.",
        highlightTerm: "sub-tier dependencies",
      },
      {
        text: "Leading procurement teams now use digital twin simulations to stress-test regional disruptions before locking in multi-year off-take agreements.",
        highlightTerm: "off-take agreements",
      },
    ],
    vocabList: [
      {
        id: "sup-1",
        term: "bottleneck",
        partOfSpeech: "名詞",
        pronunciation: "/ˈbɑːtəlnɛk/",
        meaningJa: "（生産・供給・業務進行を滞らせる）ボトルネック、隘路（あいろ）",
        quoteEn: "After years of stockpiling components to survive pandemic-era bottlenecks...",
        exampleEn: "Packaging capacity has become the primary bottleneck in scaling chip output.",
        exampleJa: "後工程のパッケージング能力が、半導体生産量を拡大する上での最大のボトルネックになっています。",
      },
      {
        id: "sup-2",
        term: "sub-tier dependencies",
        partOfSpeech: "名詞句",
        pronunciation: "/sʌb tɪr dɪˈpɛndənsiz/",
        meaningJa: "2次・3次下請け（Tier-2以降）への依存関係",
        quoteEn: "True supply chain resilience requires mapping sub-tier dependencies.",
        exampleEn: "We lacked visibility into sub-tier dependencies until a regional port closure hit.",
        exampleJa: "地域の港湾閉鎖が起きるまで、私たちは2次・3次仕入先への依存状況を把握できていませんでした。",
      },
      {
        id: "sup-3",
        term: "off-take agreement",
        partOfSpeech: "名詞句",
        pronunciation: "/ˈɔːfteɪk əˈɡriːmənt/",
        meaningJa: "長期引取契約（生産予定の製品・原材料を一定量買い取る事前契約）",
        quoteEn: "...before locking in multi-year off-take agreements.",
        exampleEn: "The battery maker signed a five-year off-take agreement to secure lithium supply.",
        exampleJa: "そのバッテリーメーカーはリチウム供給を確保するため、5年間の長期引取契約を締結しました。",
      },
      {
        id: "sup-4",
        term: "tie up capital",
        partOfSpeech: "動詞句",
        pronunciation: "/taɪ ʌp ˈkæpɪtəl/",
        meaningJa: "資金を寝かせる、資本を固定化させる",
        quoteEn: "...bloated balance sheets tie up capital needed for R&D.",
        exampleEn: "Excess safety stock ties up working capital that could fund factory automation.",
        exampleJa: "過剰な安全在庫は、工場の自動化に投資できるはずの運転資金を寝かせてしまいます。",
      },
      {
        id: "sup-5",
        term: "dual-sourcing",
        partOfSpeech: "名詞",
        pronunciation: "/ˈduːəl ˈsɔːrsɪŋ/",
        meaningJa: "2社購買、複数社調達（リスク分散のため2社以上から調達すること）",
        quoteEn: "Moving Beyond 'Just-in-Case': How Tier-1 Manufacturers Are Redesigning Dual-Sourcing",
        exampleEn: "Dual-sourcing critical sensors reduced our lead-time volatility by 40 percent.",
        exampleJa: "重要センサーの2社購買化により、リードタイムの変動幅を40%削減できました。",
      },
    ],
  },
};

export default function Lp101() {
  const [selectedPersona, setSelectedPersona] = useState<string>("pm");
  const [activeTerm, setActiveTerm] = useState<string | null>("cannibalizing");
  const [savedVocabIds, setSavedVocabIds] = useState<string[]>(["pm-1", "pm-3"]);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentArticle = DEMO_ARTICLES[selectedPersona];

  const handlePersonaChange = (key: string) => {
    setSelectedPersona(key);
    const firstHighlighted = DEMO_ARTICLES[key].paragraphs.find((p) => p.highlightTerm)?.highlightTerm || null;
    setActiveTerm(firstHighlighted);
    setIsPlayingAudio(false);
  };

  const toggleSaveVocab = (id: string) => {
    setSavedVocabIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToRegister = () => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeVocabDetail =
    currentArticle.vocabList.find(
      (v) =>
        activeTerm &&
        (v.term.toLowerCase().includes(activeTerm.toLowerCase()) ||
          activeTerm.toLowerCase().includes(v.term.toLowerCase()))
    ) || currentArticle.vocabList[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20">
              <BookOpen className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                Brief<span className="text-amber-400">10</span>
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-slate-300 sm:inline-block">
                EXECUTIVE ENGLISH READER
              </span>
            </div>
          </div>

          <button
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 sm:px-5 sm:text-sm"
          >
            <span>先行リリース枠を予約</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/12 via-slate-950 to-slate-950" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300 sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
            <span className="text-balance">
              <span className="inline-block">英語の勉強時間を別途つくる余裕はない。</span>
              <span className="inline-block">だが海外の一次情報と英語力は</span>
              <span className="inline-block">落としたくないあなたへ</span>
            </span>
          </div>

          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.18] text-balance">
            <span className="inline-block">英語学習と</span>
            <span className="inline-block">業界リサーチを、</span>
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              <span className="inline-block">別々にやる時間は</span>
              <span className="inline-block">もうない。</span>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
            <span className="inline-block">あなたの職種・関心テーマに直結し、</span>{" "}
            <span className="inline-block"><strong className="font-bold text-white">「毎朝5〜10分で読み切れる海外良質記事」</strong>だけをAIが厳選。</span>{" "}
            <span className="inline-block">冒頭の「3行の日本語背景サマリー」で全体像を掴み、</span>{" "}
            <span className="inline-block">文脈の中で「実務で使える重要ビジネス単語5選」まで</span>
            <span className="inline-block">一気に吸収するパーソナルリーダー。</span>
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <button
              onClick={scrollToRegister}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-amber-500/25 transition hover:brightness-110 sm:w-auto"
            >
              <span className="inline-block">7日間無料で</span>
              <span className="inline-block">「毎朝の厳選10分記事」を体験する</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#live-reader-demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 sm:w-auto"
            >
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span>実際のリーダー画面を試す</span>
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              毎朝7:00に読了750〜1,600語（5〜10分）の1本を配信
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-amber-400" />
              HBR / FT / Stratechery / TechCrunch等の一次情報源
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              初期設定はスマホから30秒で完了
            </span>
          </div>
        </div>
      </section>

      {/* Pain & Empathy Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              THE DAILY DILEMMA
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl text-balance">
              <span className="inline-block">多忙なビジネスパーソンほど、</span>
              <br className="hidden sm:inline" />
              <span className="inline-block">こんなジレンマを抱えていませんか？</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">興味のない英字ニュースで3日坊主</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                「毎朝英字ニュースを読もう」と決意しても、自分の仕事と無関係な政治・ゴシップ記事や長すぎるレポートに挫折して開かなくなる。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">日本の翻訳要約では数週間遅れる</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                国内メディアの翻訳記事やSNSの要約だけを追っていると、海外の一次情報より数週間遅れてしまい、企画や議論の解像度が上がらない。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                <XCircle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">単語帳の無機質な例文は会議で出ない</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                汎用単語帳アプリの例文を暗記しても、自分の業務文脈と無関係な単語ばかりで、実際の外資系会議や英語メールで全く口から出てこない。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-400/25 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 p-6 text-center sm:p-8">
            <p className="text-base font-bold text-white sm:text-lg">
              英語リーディングが続かない理由は、意志の弱さではなく
              <span className="text-amber-400">「記事選びのミスマッチ」</span>です。
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
              人は「自分の明日の仕事に直結する一次情報」であれば、英語であっても夢中で読み切れます。必要なのは汎用的な英語教材ではなく、通勤電車でちょうど読み切れる「10分の海外厳選記事」が毎朝テーブルに並ぶ仕組みです。
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Live Reader Demo Section */}
      <section id="live-reader-demo" className="border-b border-slate-800/80 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
              <Zap className="h-3.5 w-3.5" />
              INTERACTIVE PRODUCT DEMO
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-4xl">
              毎朝7:00に届く「厳選10分リーダー」を体験
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              あなたの職種を選んでください。AIが業務関連度と読了時間（5〜10分）でフィルタリングし、
              <strong className="text-white">「3行の日本語背景サマリー＋原文＋重要ビジネス単語5選」</strong>
              を自動生成した実際の画面を操作できます。
            </p>
          </div>

          {/* Persona Switcher Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {Object.entries(DEMO_ARTICLES).map(([key, item]) => {
              const active = selectedPersona === key;
              return (
                <button
                  key={key}
                  onClick={() => handlePersonaChange(key)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                    active
                      ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20"
                      : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {item.roleLabel}
                </button>
              );
            })}
          </div>

          {/* Simulated App Reader Interface */}
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            {/* Left/Main Column: Morning Reader UI */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl lg:col-span-7">
              {/* App Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950/90 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-md bg-amber-400/15 px-2.5 py-1 font-bold text-amber-300">
                    <Clock className="h-3.5 w-3.5" />
                    {currentArticle.readMinutes} min read ({currentArticle.wordCount.toLocaleString()} words)
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2.5 py-1 font-bold text-emerald-300">
                    <Target className="h-3.5 w-3.5" />
                    業務マッチ度 {currentArticle.relevanceScore}%
                  </span>
                </div>

                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                    isPlayingAudio
                      ? "border-amber-400 bg-amber-400/20 text-amber-300"
                      : "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>{isPlayingAudio ? "ネイティブ音声 再生中 (1.0x)" : "音声聞き流し"}</span>
                </button>
              </div>

              <div className="p-5 sm:p-7">
                {/* Source & Title */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-amber-400">{currentArticle.sourceMedia}</span>
                  <span>•</span>
                  <span>{currentArticle.levelLabel}</span>
                </div>

                <h3 className="mt-2 font-serif text-xl font-bold leading-snug text-white sm:text-2xl">
                  {currentArticle.titleEn}
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                  {currentArticle.titleJa}
                </p>

                {/* 3-Line Japanese Background Summary Card */}
                <div className="mt-5 rounded-xl border border-amber-400/30 bg-slate-950/90 p-4">
                  <div className="mb-2.5 flex items-center gap-1.5 text-xs font-extrabold text-amber-400">
                    <BrainCircuit className="h-4 w-4" />
                    <span>読む前の地図：3行の日本語背景サマリー</span>
                  </div>
                  <ul className="space-y-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
                    <li>{currentArticle.summaryLines.fact}</li>
                    <li>{currentArticle.summaryLines.context}</li>
                    <li className="font-semibold text-amber-200">{currentArticle.summaryLines.takeaway}</li>
                  </ul>
                </div>

                {/* English Article Body with Interactive Highlighted Terms */}
                <div className="mt-6 space-y-4 border-t border-slate-800 pt-5 font-serif text-base leading-relaxed text-slate-200">
                  <div className="font-sans text-[11px] font-semibold text-slate-400">
                    ※ 黄色のハイライト単語をタップすると、右側の文脈解説カードが切り替わります
                  </div>
                  {currentArticle.paragraphs.map((para, idx) => {
                    if (!para.highlightTerm) {
                      return <p key={idx}>{para.text}</p>;
                    }
                    const parts = para.text.split(para.highlightTerm);
                    const isSelected = activeTerm === para.highlightTerm;
                    return (
                      <p key={idx}>
                        {parts[0]}
                        <button
                          type="button"
                          onClick={() => setActiveTerm(para.highlightTerm || null)}
                          className={`mx-0.5 rounded px-1.5 py-0.5 font-sans text-sm font-bold transition ${
                            isSelected
                              ? "bg-amber-400 text-slate-950 ring-2 ring-amber-300"
                              : "bg-amber-400/20 text-amber-300 underline decoration-amber-400/60 hover:bg-amber-400/30"
                          }`}
                        >
                          {para.highlightTerm}
                        </button>
                        {parts[1]}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Contextual Vocabulary & Review List */}
            <div className="flex flex-col justify-between gap-5 lg:col-span-5">
              {/* Active Word Deep Dive Card */}
              <div className="rounded-2xl border border-amber-400/30 bg-slate-900 p-5 shadow-xl sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                    文脈で覚える重要ビジネス単語
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                    保存済み {savedVocabIds.length}語
                  </span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-2xl font-extrabold text-white">{activeVocabDetail.term}</h4>
                      <span className="text-xs text-slate-400">{activeVocabDetail.partOfSpeech}</span>
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-slate-400">{activeVocabDetail.pronunciation}</p>
                  </div>

                  <button
                    onClick={() => toggleSaveVocab(activeVocabDetail.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                      savedVocabIds.includes(activeVocabDetail.id)
                        ? "bg-amber-400 text-slate-950"
                        : "border border-slate-700 bg-slate-800 text-slate-200 hover:border-amber-400"
                    }`}
                  >
                    {savedVocabIds.includes(activeVocabDetail.id) ? (
                      <>
                        <BookmarkCheck className="h-4 w-4" />
                        <span>保存済み</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4" />
                        <span>復習リストへ</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-slate-950 p-3.5">
                  <div className="text-xs font-bold text-amber-300">この記事の文脈での意味</div>
                  <p className="mt-1 text-sm font-bold text-white">{activeVocabDetail.meaningJa}</p>
                </div>

                <div className="mt-3 space-y-3 text-xs">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
                    <div className="font-bold text-slate-400">記事内の実際の引用文</div>
                    <p className="mt-1 font-serif italic text-slate-200">"{activeVocabDetail.quoteEn}"</p>
                  </div>

                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5">
                    <div className="font-bold text-emerald-400">明日の会議・メールで使える応用例文</div>
                    <p className="mt-1 font-medium text-white">{activeVocabDetail.exampleEn}</p>
                    <p className="mt-1 text-slate-400">{activeVocabDetail.exampleJa}</p>
                  </div>
                </div>
              </div>

              {/* All 5 Extracted Terms Mini Selector */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">この記事の重要ビジネス単語5選</span>
                  <span className="text-[11px] text-slate-400">タップして解説を表示</span>
                </div>
                <div className="space-y-2">
                  {currentArticle.vocabList.map((vocab, idx) => {
                    const isCurrent = vocab.id === activeVocabDetail.id;
                    const isSaved = savedVocabIds.includes(vocab.id);
                    return (
                      <div
                        key={vocab.id}
                        onClick={() => setActiveTerm(vocab.term)}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2.5 transition ${
                          isCurrent
                            ? "border-amber-400 bg-amber-400/10"
                            : "border-slate-800 bg-slate-950/70 hover:border-slate-700"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-amber-400">0{idx + 1}</span>
                            <span className="truncate text-sm font-bold text-white">{vocab.term}</span>
                          </div>
                          <p className="truncate text-xs text-slate-400">{vocab.meaningJa}</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveVocab(vocab.id);
                          }}
                          aria-label="保存切り替え"
                          className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-amber-400"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="h-4 w-4 text-amber-400" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Comparison Table */}
      <section className="border-b border-slate-800/80 bg-slate-900/30 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              WORKFLOW TRANSFORMATION
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              従来の英語学習・情報収集との圧倒的な違い
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
            <div className="grid grid-cols-12 border-b border-slate-800 bg-slate-900 px-4 py-3.5 text-xs font-extrabold sm:px-6 sm:text-sm">
              <div className="col-span-3 text-slate-400">比較項目</div>
              <div className="col-span-4 text-rose-400">従来のニュースアプリ・単語帳</div>
              <div className="col-span-5 text-amber-400">Brief10（本サービス）</div>
            </div>

            {[
              {
                label: "毎朝の記事選び",
                before: "膨大な一覧から自分で探すだけで10分経過し、結局読まない",
                after: "あなたの職種・関心テーマ直結の1本をAIが毎朝7:00に自動選定",
              },
              {
                label: "記事の長さと負荷",
                before: "長すぎる専門記事に途中で挫折、または浅い速報ニュースばかり",
                after: "通勤電車で確実に読み切れる「750〜1,600語（5〜10分）」に厳格限定",
              },
              {
                label: "読解スピード",
                before: "背景知識ゼロで英語を頭から訳し、途中で意味が追えなくなる",
                after: "冒頭の「3行の日本語背景サマリー」で地図を持ってから英語をスラスラ読解",
              },
              {
                label: "語彙の定着",
                before: "実務で使わない受験・一般単語を丸暗記し、すぐ忘れる",
                after: "記事内の「重要ビジネス単語5選」を引用文＆会議応用例文付きで蓄積",
              },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-12 items-center border-b border-slate-800/80 px-4 py-4 text-xs last:border-b-0 sm:px-6 sm:text-sm"
              >
                <div className="col-span-3 font-bold text-white">{row.label}</div>
                <div className="col-span-4 pr-3 text-slate-400">{row.before}</div>
                <div className="col-span-5 flex items-start gap-2 font-semibold text-slate-100">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Offer Section */}
      <section className="border-b border-slate-800/80 py-16 sm:py-22">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-amber-400/35 bg-gradient-to-b from-slate-900 to-slate-950 p-6 shadow-2xl sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-1 text-xs font-extrabold text-amber-300">
                  <Layers className="h-3.5 w-3.5" />
                  オールインワン・パーソナルプラン
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  パーソナルリーダー・プラン
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  毎朝の厳選記事配信・3行日本語サマリー・重要ビジネス単語5選・ネイティブ音声・単語復習リストすべて使い放題
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4 text-left md:text-right">
                <div className="text-xs font-bold text-slate-400">月額料金（税込）</div>
                <div className="mt-0.5 flex items-baseline gap-1 md:justify-end">
                  <span className="text-3xl font-extrabold text-white sm:text-4xl">1,980</span>
                  <span className="text-sm font-bold text-slate-300">円 / 月</span>
                </div>
                <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-amber-400">
                  <Coffee className="h-3.5 w-3.5" />
                  <span>1日あたり約66円（缶コーヒー半分以下）</span>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 border-t border-slate-800 pt-6 sm:grid-cols-2">
              {[
                "職種・関心テーマ・英語レベル別の毎朝7:00パーソナライズ配信",
                "英語原文を読む前の「3行の日本語背景サマリー」自動生成",
                "文脈で覚える「重要ビジネス単語5選」＆明日の会議用応用例文",
                "ワンタップ保存＆スキマ時間3分フラッシュカード復習機能",
              ].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-4 sm:flex-row sm:px-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 shrink-0 text-emerald-400" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold text-white">まずは最初の7日間・完全無料でお試しいただけます</p>
                  <p className="text-slate-300">
                    明日の朝届く記事が「本当に自分の仕事に刺さるか」「10分で読み切れるか」を体感してから継続をご判断ください。
                  </p>
                </div>
              </div>
              <button
                onClick={scrollToRegister}
                className="w-full shrink-0 rounded-xl bg-amber-400 px-5 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300 sm:w-auto sm:text-sm"
              >
                先行登録フォームへ進む
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Form Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="101"
            productName="Brief10（毎朝10分の厳選ビジネス英語＆一次情報リーダー）"
            offerText="先行リリース登録者限定：7日間完全無料トライアル＋初月半額（990円）優待コード＆職種別ビジネス英単語帳PDFを優先案内します。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-5xl px-4">
          <p>© 2026 Brief10. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
