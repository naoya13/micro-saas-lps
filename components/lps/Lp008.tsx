"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Sword,
  Target,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Mic,
  Volume2,
  FileText,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  MessageSquareWarning,
  Briefcase,
  TrendingUp,
  Lock,
  Layers,
  Award,
  Zap,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

type ScenarioKey = "deadline" | "budget" | "vendor";

interface ToughQaItem {
  rank: number;
  personaTag: string;
  questionEn: string;
  questionJa: string;
  hiddenIntent: string;
  counterStrategyJa: string;
  counterPhraseEn: string;
  oneLineEscapeEn: string;
  weakReplyBefore: string;
}

interface ScenarioData {
  tabLabel: string;
  goal: string;
  opponent: string;
  background: string;
  bottomLine: string;
  pillars: string[];
  vulnerabilityAlert: string;
  draftSnippetEn: string;
  draftSnippetJa: string;
  powerPhrase: {
    phrase: string;
    nuance: string;
  };
  qas: ToughQaItem[];
}

const SCENARIO_PRESETS: Record<ScenarioKey, ScenarioData> = {
  deadline: {
    tabLabel: "ケース1：海外ベンダーへの納期・仕様交渉",
    goal: "米国開発パートナーに納期2週間延長を承諾させつつ、追加開発費ゼロで合意する",
    opponent: "強気・利益重視の米国側プロジェクト責任者",
    background:
      "API仕様の前提認識にズレが発覚。向こうは追加請求（Change Request）をちらつかせてきている。",
    bottomLine:
      "仕様の曖昧さに起因する手戻りのため追加費用は発生させず、フェーズ分割で2週間後の本番公開を死守する",
    pillars: [
      "当初SOW（業務範囲書）の記載解釈の相違であり、片側責任ではない",
      "コア機能のみ予定通りリリースし、副次機能を2週間後に回すことで事業影響をゼロ化",
      "次期フェーズ（Q3拡張案件）の優先発注をインセンティブとして提示",
    ],
    vulnerabilityAlert:
      "「日本側の要件確認が遅れたせいではないか？」と責任所在を突かれる点が最大の弱点。",
    draftSnippetEn:
      "To be transparent, our priority is protecting the launch window without inflating the budget. Rather than treating this API alignment as a paid change request, here is how we bridge that gap: we lock the core scope for Friday, and shift non-critical modules by two weeks at zero additional cost.",
    draftSnippetJa:
      "率直に申し上げると、私たちの最優先事項は予算を膨らませずに公開時期を守ることです。このAPI調整を有償の仕様変更として扱うのではなく、次のようにギャップを埋めます。コア範囲は今週金曜で確定し、非中核モジュールを2週間後ろ倒しにして追加費用ゼロで着地させます。",
    powerPhrase: {
      phrase:
        "Rather than treating this as a paid change request, here is how we bridge that gap.",
      nuance:
        "「追加費用は払えません（We cannot pay）」と拒絶するのではなく、対等な解決策の提示へ主導権を移す外資流フレーズ。",
    },
    qas: [
      {
        rank: 1,
        personaTag: "利益重視の米国側PM",
        questionEn:
          "Your team signed off on the spec last month. Why should our engineers absorb two weeks of extra hours for free?",
        questionJa:
          "先月そちらのチームが仕様にサインしましたよね。なぜ当社のエンジニアが2週間分の追加工数を無料で被らなければならないのですか？",
        hiddenIntent:
          "「サイン済み」を盾に日本側に全面的な非を認めさせ、追加請求（Change Request）を飲ませようとしている。",
        counterStrategyJa:
          "サインの事実は認めつつ（Acknowledge）、SOWの定義不足という構造問題に再定義し（Reframe）、工程組み替えで相手の実稼働が増えない形へ誘導する（Pivot）。",
        counterPhraseEn:
          "That's a fair point regarding the sign-off. However, the SOW didn't specify rate-limit handling, which is a shared blind spot. By deprioritizing the reporting UI this sprint, your team's total engineering hours stay flat—no extra burn required.",
        oneLineEscapeEn:
          "That's a fair point. Let's look at the actual engineering hours behind that.",
        weakReplyBefore:
          "I'm sorry, we didn't notice that detail. Please understand our budget is very tight...",
      },
      {
        rank: 2,
        personaTag: "利益重視の米国側PM",
        questionEn:
          "If we shift the schedule by two weeks, our senior architect moves to another client. Are you okay with a junior dev taking over?",
        questionJa:
          "スケジュールを2週間ずらすなら、シニアアーキテクトは別案件に移ります。ジュニア担当者に引き継いでも構いませんか？",
        hiddenIntent:
          "品質低下リスクをちらつかせて心理的プレッシャーをかけ、今すぐ追加予算を出させようとするブラフ。",
        counterStrategyJa:
          "品質低下への懸念を受け止めつつ、契約上のSLA（品質基準）を前提条件として突き返し、アーキテクトのレビュー工数だけ確保させる。",
        counterPhraseEn:
          "We value his architectural oversight, which is why we only need him for two 30-minute design reviews during the extension. That protects our delivery quality without blocking his transition to your next client.",
        oneLineEscapeEn:
          "Let's separate day-to-day execution from architectural sign-off.",
        weakReplyBefore:
          "Oh, no! We definitely need the senior architect. What should we do?",
      },
    ],
  },
  budget: {
    tabLabel: "ケース2：外資系本社への新規予算・人員承認プレゼン",
    goal: "シンガポールAPAC統括本部長から、日本市場向け新規マーケティング予算3,000万円の承認を得る",
    opponent: "数字・ROIに厳しい保守的なAPAC財務・統括責任者",
    background:
      "競合が日本市場でシェアを伸ばしており、今期中に動かないと手遅れになるが、本社はコスト削減モード。",
    bottomLine:
      "3,000万円の先行投資は2四半期で回収可能であり、見送った場合の既存顧客流出リスクの方がはるかに高い",
    pillars: [
      "パイロット施策でCPA（顧客獲得単価）が目標より28%低く推移した実績データ",
      "投資見送り時、競合へのスイッチにより年間1.2億円の既存売上が毀損する試算",
      "予算を2段階（1,500万×2）に分け、KPI未達なら即停止できるステージゲート設計",
    ],
    vulnerabilityAlert:
      "「なぜ今期の既存予算の再配分ではなく、追加予算が必要なのか？」という財務的ツッコミ。",
    draftSnippetEn:
      "From a risk-mitigation standpoint, holding back this $200K investment actually exposes us to a $800K churn risk in Japan. To protect downside, we've structured this as a gated rollout: we unlock the second tranche only after hitting a verified 3.2x pipeline return in Q2.",
    draftSnippetJa:
      "リスク軽減の観点から見ると、この20万ドルの投資を控えることは、日本市場で80万ドルの解約リスクに晒されることを意味します。ダウンサイドを守るため、段階的承認（ゲート方式）を採用しました。Q2に3.2倍のパイプライン創出を実証して初めて第2弾の予算を実行します。",
    powerPhrase: {
      phrase: "To protect downside, we've structured this as a gated rollout.",
      nuance:
        "保守的な決裁者が最も好む「撤退基準・損失限定（Protect downside）」を先回りして提示し、安心感を与える表現。",
    },
    qas: [
      {
        rank: 1,
        personaTag: "数字に厳しいAPAC財務責任者",
        questionEn:
          "Every region is under a spending freeze. Why should Japan get an exception instead of reallocating your existing budget?",
        questionJa:
          "全リージョンが支出凍結中です。なぜ日本だけ既存予算の再配分ではなく、例外扱いを受けられるのですか？",
        hiddenIntent:
          "「日本だけの特別扱い」を潰し、まずは自分たちで血を流して予算を捻出しろと迫っている。",
        counterStrategyJa:
          "支出凍結の方針に同意しつつ、すでに既存予算の40%を削減・再配分済みである事実を示し、これはコストではなく自己資金回収型の成長枠だと定義し直す。",
        counterPhraseEn:
          "We fully respect the freeze—in fact, we already reallocated 40% of our event budget to fund the pilot. This request isn't overhead; it's a self-funding customer acquisition engine that turns cash-positive within 5 months.",
        oneLineEscapeEn:
          "That's a valid question. We actually started by cutting 40% of our legacy spend first.",
        weakReplyBefore:
          "Because Japan market is very unique and competitors are spending a lot right now...",
      },
      {
        rank: 2,
        personaTag: "保守的なAPAC統括本部長",
        questionEn:
          "Your 3.2x pipeline projection looks optimistic. What happens if lead conversion drops by half in Q2?",
        questionJa:
          "3.2倍のパイプライン予測は楽観的に見えます。Q2にコンバージョン率が半分に落ちたらどうするのですか？",
        hiddenIntent:
          "最悪ケース（ダウンサイド）の想定が甘くないか、撤退ラインを握っているかを試している。",
        counterStrategyJa:
          "悲観シナリオの試算を即座に提示し、自動ブレーキ（損切りライン）が組み込まれていることを証明して決裁者の不安を消す。",
        counterPhraseEn:
          "Even at 50% conversion, we still break even by month seven. More importantly, if Q2 conversion falls below 1.8%, we automatically freeze the second tranche—capping our maximum exposure at half the ask.",
        oneLineEscapeEn:
          "We've already stress-tested a 50% drop scenario—here are the exact numbers.",
        weakReplyBefore:
          "We will work very hard with the sales team to make sure it doesn't drop.",
      },
    ],
  },
  vendor: {
    tabLabel: "ケース3：欧州パートナーとの独占販売契約・条件改定",
    goal: "欧州代理店が要求する「最低購入ノルマ（MOQ）の引き下げ」を拒否し、現行ノルマを維持する",
    opponent: "泣き落としと強硬姿勢を使い分ける欧州ディストリビューター役員",
    background:
      "欧州の景気減速を理由にノルマ30%減を要求してきた。飲めば自社の年間売上計画が未達になる。",
    bottomLine:
      "契約上の最低購入ノルマは維持する代わりに、マーケティング支援金の増額でセルスルー（実売）を共同支援する",
    pillars: [
      "独占販売権（Exclusivity）は現行ノルマの達成とセットで付与している対価である",
      "ノルマを下げるのではなく、現地展示会・販促費の共同負担で在庫回転を加速させる",
      "どうしてもノルマ引き下げを望む場合は、独占権の解除（非独占化）が条件となる",
    ],
    vulnerabilityAlert:
      "「このままでは他社製品に乗り換えるぞ」という取引解消の脅しへの切り返し。",
    draftSnippetEn:
      "Exclusivity in Europe is directly tied to our agreed volume commitment. Rather than lowering the baseline—which triggers a review of territorial exclusivity—we propose co-investing in your Q3 trade show push so you hit the target faster.",
    draftSnippetJa:
      "欧州での独占販売権は、合意済みの数量コミットメントと直接連動しています。基準値を引き下げる（これは地域独占権の見直しにつながります）のではなく、貴社のQ3展示会プロモーションに共同投資することで、目標を早期達成できるよう支援します。",
    powerPhrase: {
      phrase:
        "Rather than lowering the baseline—which triggers a review of territorial exclusivity—we propose...",
      nuance:
        "「ノルマを下げるなら独占権も外す」という交渉のレバレッジを、脅しではなく契約上の自然な帰結として冷静に伝える表現。",
    },
    qas: [
      {
        rank: 1,
        personaTag: "欧州ディストリビューター役員",
        questionEn:
          "With the current European downturn, keeping this quota is unrealistic. If you don't budge, we may have to prioritize other brands.",
        questionJa:
          "現在の欧州の景気後退では、このノルマ維持は非現実的です。そちらが譲歩しないなら、他社ブランドを優先せざるを得ません。",
        hiddenIntent:
          "「他社へ乗り換える」と脅して日本側をパニックにさせ、一方的な条件緩和を引き出そうとしている。",
        counterStrategyJa:
          "市場環境の厳しさに共感しつつ、競合製品より利益率が高い自社製品の優位性を再確認させ、ノルマ維持＋販促支援のWin-Win案へ戻す。",
        counterPhraseEn:
          "We recognize the macro headwinds in Europe. However, our product delivers a 15% higher margin for your team than competing lines. Let's keep the quota intact and deploy our co-marketing fund to protect your sell-through.",
        oneLineEscapeEn:
          "I hear you on the market conditions, and that's exactly why margin matters most right now.",
        weakReplyBefore:
          "Please don't switch to other brands! Let me talk to my boss about lowering the quota...",
      },
      {
        rank: 2,
        personaTag: "欧州ディストリビューター役員",
        questionEn:
          "Why can't we keep exclusivity for one more year while adjusting the volume just for this temporary dip?",
        questionJa:
          "一時的な落ち込みの間だけ数量を調整し、独占権はあと1年維持する形ではなぜダメなのですか？",
        hiddenIntent:
          "義務（ノルマ）だけ免除され、権利（独占権）は美味しいとこ取りしようとしている。",
        counterStrategyJa:
          "本社ガバナンス・取締役会の承認基準という「動かせないルール」を盾にし、個人的な譲歩が不可能な構造であることを明確にする。",
        counterPhraseEn:
          "Under our global governance policy, territorial exclusivity requires full volume commitment—our board cannot grant exceptions without opening the territory. Keeping the current tier is the cleanest way to protect your exclusive status.",
        oneLineEscapeEn:
          "Exclusivity and volume are locked together under our global board policy.",
        weakReplyBefore:
          "Well, in Japan we always follow the original contract strictly...",
      },
    ],
  },
};

export default function Lp008() {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("deadline");
  const [selectedQaIndex, setSelectedQaIndex] = useState<number>(0);
  const [userDrillReply, setUserDrillReply] = useState<string>("");
  const [showAiCoaching, setShowAiCoaching] = useState<boolean>(false);
  const [copiedPhrase, setCopiedPhrase] = useState<boolean>(false);
  const [isSimulatingAudio, setIsSimulatingAudio] = useState<boolean>(false);

  const currentData = SCENARIO_PRESETS[activeScenario];
  const currentQa = currentData.qas[selectedQaIndex] || currentData.qas[0];

  const scrollToRegister = () => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScenarioChange = (key: ScenarioKey) => {
    setActiveScenario(key);
    setSelectedQaIndex(0);
    setUserDrillReply("");
    setShowAiCoaching(false);
    setCopiedPhrase(false);
  };

  const handleCopyCounter = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentQa.counterPhraseEn);
      setCopiedPhrase(true);
      setTimeout(() => setCopiedPhrase(false), 2000);
    }
  };

  const handleSimulateVoice = () => {
    setIsSimulatingAudio(true);
    setTimeout(() => setIsSimulatingAudio(false), 2200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20">
              <Sword className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                Boardroom<span className="text-amber-400">Spar</span> AI
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-amber-300 sm:inline-block">
                英語交渉・Q&A切り返し特訓コパイロット
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-amber-400/20 transition hover:bg-amber-300 sm:text-sm"
          >
            <span>先行トライアル枠に登録</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.13),_transparent_58%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
              <Briefcase className="h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span className="text-balance">
                <span className="inline-block">海外パートナー交渉・</span>
                <span className="inline-block">外資系エグゼクティブ会議の</span>
                <span className="inline-block">「質疑応答」で主導権を握りたい実務家へ</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.18] text-balance">
              <span className="inline-block">「原稿を読めば</span>
              <span className="inline-block">プレゼンはできる。</span>
              <span className="mt-2 block bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                <span className="inline-block">だが、その後の</span>
                <span className="inline-block">『想定外のツッコミ』で言葉に詰まり、</span>
                <span className="inline-block">主導権を奪われる」</span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
              <span className="inline-block">汎用英会話スクールでは</span>
              <span className="inline-block">「あなたの明日の案件の修羅場」は</span>
              <span className="inline-block">練習できません。</span>{" "}
              <span className="inline-block">案件背景と資料テキストを放り込むだけで、</span>
              <span className="inline-block">外資基準の<strong className="text-white">英語スピーキングドラフト</strong>作成から、</span>{" "}
              <span className="inline-block"><strong className="text-amber-300">『意地悪な相手役AIとの想定反論TOP5＆切り返し特訓』</strong>まで</span>
              <span className="inline-block">会議前夜に完結させる実戦交渉コパイロット。</span>
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToRegister}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-amber-500/20 transition hover:brightness-110 sm:w-auto"
              >
                <span className="inline-block">先行リリース案内・</span>
                <span className="inline-block">7日間無料枠を受け取る</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <a
                href="#sparring-demo"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 sm:w-auto"
              >
                <Zap className="h-4 w-4 text-amber-400" />
                <span>実際の「想定反論＆切り返し生成」を試す</span>
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                プロフェッショナルプラン月額 14,800円（税込）
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                領収書発行・経費精算対応
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                スマホ音声スパーリング対応
              </span>
            </div>
          </div>

          {/* 3-Step Workflow Overview */}
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-extrabold text-amber-400">
                  STEP 01 // 案件投入
                </span>
                <Layers className="h-4 w-4 text-slate-500" />
              </div>
              <h3 className="text-sm font-bold text-white">背景メモ・資料テキストを貼る</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                会議のゴール、譲れない条件、相手の属性（強気な交渉相手・保守的な決裁者など）を入力。
              </p>
            </div>

            <div className="rounded-2xl border border-amber-400/35 bg-slate-900/90 p-5 shadow-lg shadow-amber-500/5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-amber-400/15 px-2.5 py-1 text-xs font-extrabold text-amber-300">
                  STEP 02 // ドラフト＆弱点特定
                </span>
                <FileText className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="text-sm font-bold text-white">英語発言稿＆想定反論TOP5生成</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                弱腰表現を排した英語スピーキング原稿と、急所を突く想定質問TOP5・切り返しフレーズを自動設計。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-emerald-400/15 px-2.5 py-1 text-xs font-extrabold text-emerald-300">
                  STEP 03 // 直前スパーリング
                </span>
                <Mic className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">相手役AIと音声切り返し特訓</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                容赦ない英語の質問に声（またはテキスト）で切り返し、10秒で主導権を奪い返すプロ表現へ即添削。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Empathy Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
              THE REALITY OF GLOBAL MEETINGS
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              英語力はあるはずなのに、本番のWeb会議で
              <br />
              こんな「悔しい思い」をしていませんか？
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <MessageSquareWarning className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">「持ち帰ります」で議論が終わる</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                用意した英語原稿の読み上げまでは完璧なのに、質疑応答で早口の反論を受けた瞬間、頭が真っ白になり「Let me check and get back to you...」と後退してしまう。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                英語になると「押し切れる相手」と舐められる
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                日本語なら論理的に言い返せる場面で、英語になると「I think...」「Please understand...」と語彙が弱腰になり、不利な条件を飲まされる。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                資料翻訳だけで力尽き、Q&A練習がゼロ
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                会議前日の夜、論点整理と英語下書きを作るだけで深夜になり、最も勝敗を分ける「相手からどう突っ込まれるか」の予行演習をする時間が残らない。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-400/25 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 p-6 sm:p-8">
            <p className="text-xs font-extrabold text-amber-400">
              CORE INSIGHT // 交渉の勝敗を分ける決定的な差
            </p>
            <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">
              英語会議で負ける原因は、英語力不足ではなく「実戦スパーリングの欠如」です
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              どんなに英語を勉強しても、本番の修羅場で反射的に切り返すことはできません。
              <strong>
                「自分のリアルな案件の弱点」を「容赦ない相手役」に突かれる予行演習
              </strong>
              を事前に10分やるかやらないかで、本番の主導権は180度変わります。
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Core Experience Section */}
      <section id="sparring-demo" className="border-b border-slate-800/80 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
              <Target className="h-3.5 w-3.5" />
              <span>LIVE AI BRIEF & SPARRING SIMULATOR</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              案件背景から生成される「英語ドラフト」と
              <br />
              「意地悪な相手役の想定反論＆切り返し」を体験
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              実際のビジネスシーンを選択し、AIが生成する外資エグゼクティブ基準の英語フレーズと、Q&Aスパーリングの添削体験をお試しください。
            </p>
          </div>

          {/* Scenario Switcher */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
            {(Object.keys(SCENARIO_PRESETS) as ScenarioKey[]).map((key) => {
              const isActive = activeScenario === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleScenarioChange(key)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                    isActive
                      ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20"
                      : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {SCENARIO_PRESETS[key].tabLabel}
                </button>
              );
            })}
          </div>

          {/* Product UI Mockup Container */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* Top Window Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  app.boardroomspar.ai/brief/{activeScenario}
                </span>
              </div>
              <span className="rounded bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                相手ペルソナ：{currentData.opponent}
              </span>
            </div>

            {/* Case Input Summary */}
            <div className="border-b border-slate-800 bg-slate-900/70 p-4 sm:px-6">
              <div className="grid grid-cols-1 gap-3 text-xs md:grid-cols-12">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 md:col-span-5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">
                    入力された会議のゴール
                  </span>
                  <p className="mt-1 font-bold text-white">{currentData.goal}</p>
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    背景：{currentData.background}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 md:col-span-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">
                      AI論理骨子（Bottom Line & 3 Pillars）
                    </span>
                    <span className="rounded bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                      弱点アラート検知済み
                    </span>
                  </div>
                  <p className="mt-1 font-bold text-slate-100">{currentData.bottomLine}</p>
                  <div className="mt-2 flex items-start gap-1.5 rounded bg-rose-950/30 px-2.5 py-1.5 text-[11px] text-rose-200">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
                    <span>{currentData.vulnerabilityAlert}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main 2-Column Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Executive Speaking Draft & Tough Q&A Selector */}
              <div className="border-b border-slate-800 p-4 sm:p-6 lg:col-span-6 lg:border-r lg:border-b-0">
                {/* Speaking Draft Card */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white">
                      ① 外資基準・英語スピーキングドラフト（抜粋）
                    </span>
                    <button
                      type="button"
                      onClick={handleSimulateVoice}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-amber-300 transition hover:bg-slate-700"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      <span>
                        {isSimulatingAudio ? "ネイティブ音声再生中..." : "音声で聴く"}
                      </span>
                    </button>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <p className="font-serif text-sm leading-relaxed text-amber-100 sm:text-base">
                      “{currentData.draftSnippetEn}”
                    </p>
                    <p className="mt-2.5 border-t border-slate-800/80 pt-2.5 text-xs leading-relaxed text-slate-400">
                      {currentData.draftSnippetJa}
                    </p>
                    <div className="mt-3 rounded-lg bg-amber-400/10 p-2.5 text-[11px] text-amber-200">
                      <span className="font-bold text-amber-300">キラーフレーズ解説：</span>
                      {currentData.powerPhrase.nuance}
                    </div>
                  </div>
                </div>

                {/* Tough Q&A List */}
                <div className="mt-6">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-white">
                      ② 相手が突っ込む「想定反論TOP5」（タップして特訓）
                    </span>
                    <span className="text-[11px] text-slate-400">デモ表示 1〜2位</span>
                  </div>

                  <div className="space-y-2.5">
                    {currentData.qas.map((qa, index) => {
                      const selected = index === selectedQaIndex;
                      return (
                        <button
                          key={qa.rank}
                          type="button"
                          onClick={() => {
                            setSelectedQaIndex(index);
                            setShowAiCoaching(false);
                            setCopiedPhrase(false);
                          }}
                          className={`w-full rounded-xl border p-3.5 text-left transition ${
                            selected
                              ? "border-amber-400 bg-slate-800/90 shadow-lg shadow-amber-500/10"
                              : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded px-2 py-0.5 text-[11px] font-extrabold ${
                                  selected
                                    ? "bg-amber-400 text-slate-950"
                                    : "bg-slate-800 text-slate-300"
                                }`}
                              >
                                想定反論 #{qa.rank}
                              </span>
                              <span className="text-[11px] font-semibold text-rose-300">
                                {qa.personaTag}
                              </span>
                            </div>
                            <ChevronRight
                              className={`h-4 w-4 ${
                                selected ? "text-amber-400" : "text-slate-600"
                              }`}
                            />
                          </div>
                          <p className="mt-2 text-xs font-bold leading-snug text-white sm:text-sm">
                            “{qa.questionEn}”
                          </p>
                          <p className="mt-1 text-[11px] text-slate-400">{qa.questionJa}</p>
                        </button>
                      );
                    })}

                    {/* Locked 3-5 Teaser */}
                    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
                      <div className="select-none blur-[4px]">
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-bold">
                          想定反論 #3〜#5
                        </span>
                        <p className="mt-1.5 text-xs font-bold text-white">
                          “What is your fallback plan if the local regulatory approval takes another quarter?”
                        </p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/65">
                        <div className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-slate-200">
                          <Lock className="h-3.5 w-3.5 text-amber-400" />
                          <span>製品版では案件ごとの急所TOP5すべて生成</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Counter-Phrase Strategy & Interactive Sparring Box */}
              <div className="bg-slate-950/50 p-4 sm:p-6 lg:col-span-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-400">
                    ③ 主導権を取り戻す「3段切り返しロジック＆模範フレーズ」
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCounter}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-slate-200 hover:bg-slate-700"
                  >
                    {copiedPhrase ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">コピー完了</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>フレーズをコピー</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5">
                  <div className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-3 text-xs">
                    <span className="font-bold text-rose-300">
                      相手の真の狙い（Hidden Intent）：
                    </span>
                    <span className="text-slate-200">{currentQa.hiddenIntent}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400">
                      切り返し戦略（Acknowledge → Reframe → Pivot）
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-slate-200">
                      {currentQa.counterStrategyJa}
                    </p>
                  </div>

                  {/* Before vs After Phrase */}
                  <div className="space-y-2.5">
                    <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                      <span className="text-[10px] font-bold text-rose-400 uppercase">
                        ✕ よくある弱腰・劣勢になる返答
                      </span>
                      <p className="mt-1 text-xs italic text-slate-400">
                        “{currentQa.weakReplyBefore}”
                      </p>
                    </div>

                    <div className="rounded-lg border border-emerald-500/35 bg-emerald-950/20 p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold text-emerald-400 uppercase">
                          ✓ 主導権を握り返すプロ切り返しフレーズ
                        </span>
                      </div>
                      <p className="mt-1.5 font-serif text-sm font-semibold leading-relaxed text-white sm:text-base">
                        “{currentQa.counterPhraseEn}”
                      </p>
                      <div className="mt-2.5 border-t border-emerald-500/20 pt-2 text-[11px] text-emerald-200">
                        <strong>とっさの時間稼ぎ1行目：</strong> “{currentQa.oneLineEscapeEn}”
                      </div>
                    </div>
                  </div>

                  {/* Interactive Mini Sparring Input */}
                  <div className="border-t border-slate-800 pt-4">
                    <label
                      htmlFor="drill-reply-input"
                      className="block text-xs font-bold text-amber-300"
                    >
                      簡易スパーリング体験：あなたならこの質問にどう英語で返しますか？
                    </label>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <input
                        id="drill-reply-input"
                        type="text"
                        value={userDrillReply}
                        onChange={(e) => setUserDrillReply(e.target.value)}
                        placeholder="例：We already signed, so I understand, but..."
                        className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAiCoaching(true)}
                        className="shrink-0 rounded-lg bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300"
                      >
                        AIコーチ判定を見る
                      </button>
                    </div>

                    {showAiCoaching && (
                      <div className="mt-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-xs">
                        <div className="flex items-center justify-between font-bold text-amber-300">
                          <span>論理防衛スコア：74 / 100点（改善余地あり）</span>
                          <span>添削完了</span>
                        </div>
                        <p className="mt-1.5 leading-relaxed text-slate-200">
                          {userDrillReply.trim()
                            ? `「${userDrillReply}」という受け止めは自然ですが、冒頭で謝罪や譲歩を入れすぎると相手に価格交渉の余地を与えます。上記の模範フレーズのように "That's a fair point. However..." で即座に論点を再定義すると主導権を維持できます。`
                            : "未入力でも問題ありません。本番では沈黙を避けるため、まず上記の『とっさの時間稼ぎ1行目』を反射的に口に出してから本題に入るのが鉄則です。"}
                        </p>
                      </div>
                    )}
                  </div>
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
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
              WHY NOT GENERIC ENGLISH APPS?
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              従来のオンライン英会話・翻訳ツールとの決定的な違い
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/25 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-extrabold">汎用英会話・翻訳ツールの限界</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    英会話講師はあなたの業界の商慣習や契約条件を知らないため、
                    <strong>「明日の交渉の急所」</strong>を突く練習ができない
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    直訳ツールで作った英語は丁寧すぎるか直球すぎて、海外のタフな交渉相手に対して
                    <strong>弱腰・稚拙な印象</strong>を与える
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    台本を読む練習しかできないため、想定外の反論を受けた瞬間にフリーズして条件を譲歩してしまう
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-950 p-6 shadow-xl shadow-emerald-950/20">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-extrabold">BoardroomSpar AI の実戦アプローチ</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    あなたの<strong>実際の案件背景・弱み・BATNA</strong>
                    を読み込み、相手が最も突いてくる急所TOP5を事前に洗い出す
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    外資系投資銀行・戦略コンサル基準の
                    <strong>「角を立てずに主導権を握る切り返しフレーズ」</strong>
                    をそのまま口に出せる長さで生成
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    移動中や会議15分前にスマホ1つで音声スパーリングを3周回すだけで、本番で反射的に切り返せる状態を作る
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Offer Section */}
      <section className="border-b border-slate-800/80 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/25 p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-400/15 px-2.5 py-1 text-xs font-bold text-amber-300">
                  <Award className="h-3.5 w-3.5" />
                  <span>プロフェッショナルプラン（全機能無制限）</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  正式リリース予定価格：月額 14,800円（税込）
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  法人向けビジネス英会話（月額3〜5万円）に半年通っても、明日の案件の契約条件は変わりません。
                  本ツールで
                  <strong className="text-amber-300">
                    たった1つの海外案件の条件交渉を優位にまとめ、あるいは本社決裁を一発で通すだけ
                  </strong>
                  で、月額14,800円の数十倍〜数百倍のリターンが返ってきます。
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-center sm:min-w-[240px]">
                <span className="text-xs font-bold text-amber-400">先行登録モニター特典</span>
                <div className="mt-1 text-xl font-extrabold text-white">7日間 無料トライアル</div>
                <div className="text-xs font-bold text-emerald-400">
                  ＋ 外資交渉キラーフレーズ集
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  トライアル期間中の解約は0円・領収書発行＆経費精算対応
                </p>
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="mt-4 w-full rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300"
                >
                  先行枠に登録する →
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <TrendingUp className="h-4 w-4 shrink-0 text-amber-400" />
                <span>案件ブリーフ・英語ドラフト・Q&A音声特訓すべて無制限</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <FileText className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>企業の自己啓発・研修費での経費精算用領収書を即時発行</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Mic className="h-4 w-4 shrink-0 text-amber-400" />
                <span>スマホ片手で完結する音声認識・ネイティブ速度TTS搭載</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Form Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="008"
            productName="BoardroomSpar AI（英語交渉・想定問答＆切り返し特訓コパイロット）"
            offerText="【先行登録者限定特典】正式リリース時の優先案内（初回7日間完全無料トライアル枠）に加え、そのまま英語会議で使える『外資系エグゼクティブの主導権掌握・切り返しフレーズ50選（PDF）』を無料進呈します。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 BoardroomSpar AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
