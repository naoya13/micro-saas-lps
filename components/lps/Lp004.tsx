"use client";

import React, { useState, useEffect } from "react";
import {
  Headphones,
  Mic,
  Volume2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  Clock,
  Globe,
  FileText,
  AlertTriangle,
  MessageSquare,
  Play,
  RotateCcw,
  Zap,
  BookmarkCheck,
  ChevronRight,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

type IndustryKey = "semiconductor" | "saas" | "ma";
type CounterType = "pinpoint" | "paraphrase" | "chat";

interface DrillDemo {
  id: IndustryKey;
  tabLabel: string;
  accentBadge: string;
  speedBadge: string;
  sceneTag: string;
  sourceSnippet: string;
  opponentSpeechEn: string;
  opponentSpeechJa: string;
  traps: {
    term: string;
    meaning: string;
    phoneticTrap: string;
  }[];
  counters: Record<
    CounterType,
    {
      label: string;
      badge: string;
      en: string;
      ja: string;
      effect: string;
    }
  >;
}

const DRILL_DEMOS: Record<IndustryKey, DrillDemo> = {
  semiconductor: {
    id: "semiconductor",
    tabLabel: "半導体・海外調達",
    accentBadge: "インド・アジア英語（en-IN）",
    speedBadge: "1.25x 早口",
    sceneTag: "納期遅延の条件変更＆代替部材の承諾確認シーン",
    sourceSnippet:
      "RFQ Spec: Wafer bonding chamber / Lead time: 14 weeks / MOQ: 500 units / Incoterms: DDP Osaka",
    opponentSpeechEn:
      "Look, due to the bottleneck at our fab, we're gonna have to push back the DDP delivery by three weeks unless you sign off on the ballpark price bump for the alternate substrate.",
    opponentSpeechJa:
      "ええと、工場のボトルネックのせいで、代替基板の概算値上げに承認サインをもらえない限り、DDP納品を3週間後ろ倒しせざるを得ません。",
    traps: [
      {
        term: "push back ... by three weeks",
        meaning: "（日程・納期を）3週間後ろ倒し・延期する",
        phoneticTrap: "push back が「プッシュバッ」、gonna have to が「ゴナハフタ」と高速で繋がり、延期ではなく前倒しと誤認しやすい。",
      },
      {
        term: "sign off on the ballpark price bump",
        meaning: "概算の値上げ幅に公式承認を出す",
        phoneticTrap: "ballpark（概算の）と price bump（値上げ）が連続し、重要なコスト増の承諾条件がさらっと流される。",
      },
    ],
    counters: {
      pinpoint: {
        label: "① 数字・条件だけピンポイント確認",
        badge: "聞き漏らしを悟らせない",
        en: "Sorry, the audio dipped right when you mentioned the timeline—could you confirm the exact revised lead time and price delta?",
        ja: "すみません、スケジュールの箇所で一瞬音声が途切れまして。改定後の正確なリードタイムと価格差だけもう一度確認させてください。",
        effect: "「英語が分からない」ではなく「通信状況で肝心な数字だけ確認する」プロフェッショナルな印象を維持します。",
      },
      paraphrase: {
        label: "② 要約して認識すり合わせ（推奨）",
        badge: "主導権を握る切り返し",
        en: "Just to make sure we're aligned, are you saying the current DDP schedule holds only if we approve the substrate cost increase today?",
        ja: "認識を揃えるために確認ですが、本日中に基板のコスト増を承認した場合のみ、現行のDDP納期が維持されるという理解で合っていますか？",
        effect: "相手の早口条件を自分の言葉で定義し直すことで、勝手な承諾扱いを100%防ぎます。",
      },
      chat: {
        label: "③ チャットに書かせて証拠化",
        badge: "議事録トラブル防止",
        en: "That's a critical commercial point. Could you drop the exact bump percentage and new ETA in the meeting chat so we don't misalign?",
        ja: "商流上とても重要なポイントですね。認識齟齬を防ぐため、正確な値上げ率と新しい到着予定日を会議チャットに書いていただけますか？",
        effect: "文字情報としてチャットに残させることで、後から「言った・言わない」で青ざめるリスクをゼロにします。",
      },
    },
  },
  saas: {
    id: "saas",
    tabLabel: "IT・グローバルSaaS開発",
    accentBadge: "北米ネイティブ（en-US）",
    speedBadge: "1.30x リンキング強",
    sceneTag: "リリース直前の仕様スコープ削減＆API制約の交渉シーン",
    sourceSnippet:
      "Sprint 14 Scope: SSO SAML 2.0 integration, Webhook retry queue, Rate limit: 1,000 req/min",
    opponentSpeechEn:
      "We've got a hard stop at five, so long story short, we're descoping the webhook retry queue for v1 and circling back on SAML once QA signs off.",
    opponentSpeechJa:
      "5時に次の予定が入っているので手短に言うと、v1ではWebhookの再送キューをスコープから外し、QAの承認が下り次第SAMLの件は改めて戻ります。",
    traps: [
      {
        term: "hard stop at five",
        meaning: "5時きっかりに次の予定があり延長不可",
        phoneticTrap: "会話の冒頭で早口で言われるため、焦って本題の「機能削除」の聞き取りが遅れる。",
      },
      {
        term: "descoping ... / circling back",
        meaning: "開発範囲から外す／後で改めて議論し直す",
        phoneticTrap: "descoping が「ディスコゥピン」と脱落音になり、実装される前提で愛想笑いしてしまう危険表現。",
      },
    ],
    counters: {
      pinpoint: {
        label: "① スコープ変更点だけピンポイント確認",
        badge: "手戻り防止",
        en: "Before we wrap up, could you clarify which exact items are moving out of the v1 release scope?",
        ja: "締めくくる前に、v1のリリース対象から外れる正確な項目だけもう一度明確にしていただけますか？",
        effect: "早口でまとめられた削除機能を立ち止まって再確認し、日本側チームへの誤伝達を防ぎます。",
      },
      paraphrase: {
        label: "② 要約して認識すり合わせ（推奨）",
        badge: "PMの信頼を守る",
        en: "Just so I report this accurately to our engineering team—the webhook retry queue is deferred to v2, correct?",
        ja: "弊社の開発チームへ正確に共有したいのですが、Webhookの再送キューはv2へ延期という認識で正しいでしょうか？",
        effect: "「チームへ正確に報告するため」という大義名分を使うことで、角を立てずにイエス・ノーを引き出せます。",
      },
      chat: {
        label: "③ チャットに書かせて証拠化",
        badge: "仕様合意の確定",
        en: "Got it. Mind dropping the updated v1 scope list in the chat right now so we can update our sprint ticket immediately?",
        ja: "承知しました。スプリントのチケットを即座に更新したいので、変更後のv1スコープ一覧を今チャットに貼っていただけますか？",
        effect: "口頭の早口合意をその場でテキスト化させ、開発後の「作っていない」トラブルを封じます。",
      },
    },
  },
  ma: {
    id: "ma",
    tabLabel: "クロスボーダー法務・財務",
    accentBadge: "英国・欧州英語（en-GB）",
    speedBadge: "1.20x 婉曲表現",
    sceneTag: "DD（デューデリジェンス）における表明保証・責任上限の詰めのシーン",
    sourceSnippet:
      "SPA Clause 8.2: Indemnification cap at 15% of Purchase Price / Survival period: 18 months",
    opponentSpeechEn:
      "Our counsel is pushing back quite hard on the eighteen-month survival period; we'd rather cap it at twelve and carve out pre-closing tax liabilities altogether.",
    opponentSpeechJa:
      "弊社の弁護士が18ヶ月の存続期間にかなり強く難色を示しておりまして、12ヶ月に上限を抑え、クロージング前の税務債務は完全に除外したい意向です。",
    traps: [
      {
        term: "pushing back quite hard",
        meaning: "強く反対している・難色を示している",
        phoneticTrap: "英国英語特有の控えめなトーンで言われるため、単なる意見ではなく「拒否」であるニュアンスを見落としやすい。",
      },
      {
        term: "carve out ... altogether",
        meaning: "〜を（条項の対象から）完全に除外する",
        phoneticTrap: "carve out（切り出す・除外する）が「カーヴァウト」と連結し、重要な免責条件の削除を聞き逃す。",
      },
    ],
    counters: {
      pinpoint: {
        label: "① 数値・除外対象だけピンポイント確認",
        badge: "法務リスク回避",
        en: "Could you repeat the exact survival period you're proposing and the specific items you'd like to carve out?",
        ja: "ご提案の正確な存続期間と、除外をご希望の具体的な項目だけもう一度おっしゃっていただけますか？",
        effect: "曖昧な相槌を一切打たず、契約条件の数字と除外範囲だけを冷静に再提示させます。",
      },
      paraphrase: {
        label: "② 要約して認識すり合わせ（推奨）",
        badge: "交渉の主導権維持",
        en: "To be completely clear on your position: you're proposing a 12-month cap with zero indemnity for pre-closing tax issues, correct?",
        ja: "貴社のお立場を完全に明確にしたいのですが、存続期間は12ヶ月上限とし、クロージング前の税務リスクは免責というご提案で合っていますか？",
        effect: "相手の婉曲表現をストレートな条件文に翻訳して確認することで、対等以上の交渉力を示します。",
      },
      chat: {
        label: "③ チャットに書かせて証拠化",
        badge: "ドラフト反映の正確化",
        en: "Understood. Please type those exact carve-out terms in the chat so our legal team reflects them accurately in the markup.",
        ja: "理解しました。弊社法務チームが修正ドラフトに正確に反映できるよう、その除外条件の文言をチャットにご入力いただけますか？",
        effect: "最重要の契約条件を相手にタイピングさせることで、聞き間違いによる致命的な失点を防ぎます。",
      },
    },
  },
};

export default function Lp004() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>("semiconductor");
  const [selectedCounter, setSelectedCounter] = useState<CounterType>("paraphrase");
  const [isScriptRevealed, setIsScriptRevealed] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(5);
  const [isSpeakingDemo, setIsSpeakingDemo] = useState<boolean>(false);

  const currentDemo = DRILL_DEMOS[selectedIndustry];
  const currentCounter = currentDemo.counters[selectedCounter];

  useEffect(() => {
    if (!timerActive) return;
    if (secondsLeft <= 0) {
      setTimerActive(false);
      return;
    }
    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timerActive, secondsLeft]);

  const handleIndustryChange = (key: IndustryKey) => {
    setSelectedIndustry(key);
    setSelectedCounter("paraphrase");
    setIsScriptRevealed(false);
    setTimerActive(false);
    setSecondsLeft(5);
  };

  const handleSimulateAudio = () => {
    setIsSpeakingDemo(true);
    setIsScriptRevealed(false);
    setSecondsLeft(5);
    setTimerActive(true);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentDemo.opponentSpeechEn);
      utterance.lang =
        selectedIndustry === "semiconductor"
          ? "en-IN"
          : selectedIndustry === "ma"
          ? "en-GB"
          : "en-US";
      utterance.rate = 1.2;
      utterance.onend = () => setIsSpeakingDemo(false);
      utterance.onerror = () => setIsSpeakingDemo(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeakingDemo(false), 2400);
    }
  };

  const scrollToRegister = () => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20">
              <Headphones className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white sm:text-lg">
                Echo<span className="text-cyan-400">Reflex</span>
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 sm:inline-block">
                英語会議・瞬発聞き返し特訓AI
              </span>
            </div>
          </div>

          <button
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-400 px-3.5 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-cyan-400/20 transition hover:bg-cyan-300 sm:px-4 sm:text-sm"
          >
            <span>7日間無料トライアル先行予約</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.14),_transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
              <Globe className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
              <span className="text-balance">
                <span className="inline-block">英語Web会議の早口・訛りで</span>
                <span className="inline-block">「愛想笑い」してしまい、</span>
                <span className="inline-block">後の議事録で青ざめる海外PJ担当者へ</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.18] text-balance">
              <span className="inline-block">「&ldquo;Could you say that again?&rdquo; と</span>
              <span className="inline-block">何度も聞き返すのは、</span>
              <span className="inline-block">もう限界だ」</span>
              <span className="mt-3 block bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                <span className="inline-block">業界資料×相手アクセント特化の『聞き取り』と、</span>{" "}
                <span className="inline-block">角を立てずに主導権を握る『瞬発聞き返し』を</span>
                <span className="inline-block">1日5分で反射神経化。</span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
              <span className="inline-block">汎用英会話のゆっくり綺麗な英語では、</span>
              <span className="inline-block">明日のグローバル会議は乗り切れません。</span>{" "}
              <span className="inline-block">普段使っている<strong className="text-white">英語資料やメールを貼り付けるだけ</strong>で、</span>
              <span className="inline-block">あなたの現場で飛び交う専門スラング音声と、</span>{" "}
              <span className="inline-block"><strong className="text-cyan-300">プロとして信頼される聞き返し＆論点確認フレーズ</strong>の</span>
              <span className="inline-block">音声スパーリングをAIが自動生成します。</span>
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={scrollToRegister}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:brightness-110 sm:w-auto"
              >
                <span className="inline-block">7日間無料で「自分の業界専用ドリル」を</span>
                <span className="inline-block">先行予約</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <a
                href="#interactive-drill"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 sm:w-auto"
              >
                <Play className="h-4 w-4 text-cyan-400" />
                <span>実際の早口＆切り返しドリルを体験する</span>
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                北米・英国・インド等のアクセント＆早口（1.25x）再現
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                通勤電車でも片手・消音操作で5分完結
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                先行登録で7日間無料トライアル優先案内
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain & Empathy Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-rose-400 uppercase">
              THE GLOBAL MEETING TRAP
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              TOEICスコアや英語力はあるのに、本番のWeb会議でこんな「冷や汗」をかいていませんか？
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">早口・訛り＋スラングの瞬間に愛想笑い</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                ネイティブの容赦ないリンキングや、インド・欧州メンバー特有のアクセントに業界スラングが混ざった瞬間、脳がフリーズして笑顔で頷いてしまう。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">2回聞き返しても分からず「分かったフリ」</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                「もう一度言ってください」と聞き返してもやはり早口で返され、会議全体の空気を止めるのが怖くて「I see, makes sense...」と流してしまう。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">会議後の議事録で重大な承諾に気づき青ざめる</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                会議後に送られてきたフォローアップメールを見て「え、納期後ろ倒しと追加コストを承諾したことになっているのか…！」と血の気が引く。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/25 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/30 p-6 sm:p-8">
            <p className="text-xs font-extrabold text-cyan-300">
              聞き漏らしが起きる本当の原因は、リスニング力不足ではなく「2つの専用訓練の欠如」です
            </p>
            <h3 className="mt-1.5 text-lg font-extrabold text-white sm:text-xl">
              必要なのは「自分の業界用語が崩れた音」と「英語力不足に見せない聞き返しフレーズ」の反射神経だけ
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              プロの海外プロジェクト担当者は、相手の英語を100%聞き取っているわけではありません。
              聞き取れなかった瞬間に<strong>「音声が途切れたので数字だけ確認したい」「つまり〇〇という理解で合っていますか？」「チャットに書いてもらえますか？」</strong>と5秒以内に切り返し、議論の主導権を握っています。
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Drill Simulator Section */}
      <section id="interactive-drill" className="border-b border-slate-800/80 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
              <Zap className="h-3.5 w-3.5" />
              <span>INTERACTIVE VOICE SPARRING DEMO</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              業界別「早口リスニング＆5秒以内切り返し」を体験
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              業界タブを切り替えて「音声を再生（またはスクリプト表示）」を押し、聞き取れなかった瞬間にプロが使う3パターンの切り返しフレーズをお試しください。
            </p>
          </div>

          {/* Industry Selector Tabs */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {(Object.keys(DRILL_DEMOS) as IndustryKey[]).map((key) => {
              const active = selectedIndustry === key;
              return (
                <button
                  key={key}
                  onClick={() => handleIndustryChange(key)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                    active
                      ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20"
                      : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {DRILL_DEMOS[key].tabLabel}
                </button>
              );
            })}
          </div>

          {/* Mobile + Desktop Drill Simulator UI */}
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Input Source & Opponent Fast Speech Simulator */}
            <div className="space-y-4 lg:col-span-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3.5">
                  <span className="text-xs font-extrabold text-cyan-400">
                    STEP 1 // 登録された業務資料から自動生成
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] font-semibold text-amber-300">
                      {currentDemo.accentBadge}
                    </span>
                    <span className="rounded bg-rose-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-rose-300">
                      {currentDemo.speedBadge}
                    </span>
                  </div>
                </div>

                {/* Source Material Snippet */}
                <div className="mt-3.5 rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                  <div className="text-[10px] font-bold text-slate-400">
                    貼り付けられた業界資料・メール抜粋：
                  </div>
                  <p className="mt-1 font-mono text-xs text-slate-300">
                    {currentDemo.sourceSnippet}
                  </p>
                </div>

                {/* Scene Tag */}
                <div className="mt-4">
                  <span className="inline-block rounded-md bg-blue-500/15 px-2.5 py-1 text-xs font-bold text-blue-300">
                    想定シーン：{currentDemo.sceneTag}
                  </span>
                </div>

                {/* Audio Player Box */}
                <div className="mt-4 rounded-2xl border border-slate-700/80 bg-slate-950 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={handleSimulateAudio}
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-md shadow-cyan-400/20 transition hover:bg-cyan-300 sm:text-sm"
                    >
                      <Volume2 className={`h-4 w-4 ${isSpeakingDemo ? "animate-pulse" : ""}`} />
                      <span>{isSpeakingDemo ? "再生中..." : "相手の早口発言を再生"}</span>
                    </button>

                    <button
                      onClick={() => setIsScriptRevealed(!isScriptRevealed)}
                      className="text-xs font-bold text-slate-400 underline underline-offset-4 hover:text-white"
                    >
                      {isScriptRevealed ? "英文を隠す（実戦モード）" : "英文スクリプトを見る"}
                    </button>
                  </div>

                  {/* Masked or Revealed Speech */}
                  <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/90 p-3.5">
                    {isScriptRevealed ? (
                      <div>
                        <p className="text-sm font-bold leading-relaxed text-white">
                          &ldquo;{currentDemo.opponentSpeechEn}&rdquo;
                        </p>
                        <p className="mt-2 border-t border-slate-800 pt-2 text-xs leading-relaxed text-slate-400">
                          {currentDemo.opponentSpeechJa}
                        </p>
                      </div>
                    ) : (
                      <div className="py-2 text-center">
                        <p className="select-none font-mono text-xs tracking-widest text-slate-500 blur-[3px]">
                          {currentDemo.opponentSpeechEn}
                        </p>
                        <p className="mt-1 text-xs font-bold text-cyan-300">
                          ※実戦ドリルでは文字を隠した状態で音声だけを聞き取ります
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 5-Second Reflex Timer */}
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-400/25 bg-amber-400/10 px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <Mic className="h-4 w-4 text-amber-400" />
                      <span className="text-xs font-bold text-amber-200">
                        聞き取れない！5秒以内に第一声を出す：
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-amber-300">
                        残り {secondsLeft}秒
                      </span>
                      <button
                        onClick={() => {
                          setSecondsLeft(5);
                          setTimerActive(true);
                        }}
                        className="rounded bg-slate-900 p-1 text-slate-300 hover:text-white"
                        title="タイマーリセット"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phonetic Traps Breakdown */}
                <div className="mt-4 space-y-2.5">
                  <div className="text-xs font-extrabold text-slate-300">
                    聞き取りを阻んだ「専門表現・リンキングの罠」解説：
                  </div>
                  {currentDemo.traps.map((trap, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-mono font-extrabold text-rose-300">
                          {trap.term}
                        </span>
                        <span className="font-bold text-slate-200">{trap.meaning}</span>
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                        {trap.phoneticTrap}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: 3-Pattern Counter Phrases Card */}
            <div className="lg:col-span-6">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-cyan-400/30 bg-slate-900 p-5 shadow-xl sm:p-6">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                    <span className="text-xs font-extrabold text-emerald-400">
                      STEP 2 // 角を立てずに論点を押さえる3段階切り返し
                    </span>
                    <MessageSquare className="h-4 w-4 text-emerald-400" />
                  </div>

                  <p className="mt-3 text-xs text-slate-300">
                    状況に応じて3つの切り返しパターンを切り替え、声に出して反射神経に定着させます。
                  </p>

                  {/* 3 Counter Type Buttons */}
                  <div className="mt-4 space-y-2">
                    {(Object.keys(currentDemo.counters) as CounterType[]).map((cKey) => {
                      const item = currentDemo.counters[cKey];
                      const active = selectedCounter === cKey;
                      return (
                        <button
                          key={cKey}
                          onClick={() => setSelectedCounter(cKey)}
                          className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs font-bold transition ${
                            active
                              ? "border-cyan-400 bg-cyan-400/15 text-white"
                              : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span>{item.label}</span>
                          <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] text-cyan-300">
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Counter Phrase Display */}
                  <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950 p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                        即答フレーズ（5秒以内に発話）
                      </span>
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined" && "speechSynthesis" in window) {
                            window.speechSynthesis.cancel();
                            const u = new SpeechSynthesisUtterance(currentCounter.en);
                            u.lang = "en-US";
                            u.rate = 1.0;
                            window.speechSynthesis.speak(u);
                          }
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-bold text-cyan-300 hover:bg-slate-800"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span>お手本音声</span>
                      </button>
                    </div>

                    <p className="mt-3 text-base font-extrabold leading-relaxed text-white sm:text-lg">
                      &ldquo;{currentCounter.en}&rdquo;
                    </p>

                    <p className="mt-2.5 border-t border-slate-800 pt-2.5 text-xs leading-relaxed text-slate-300">
                      {currentCounter.ja}
                    </p>

                    <div className="mt-3.5 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs text-cyan-200">
                      <strong className="font-bold text-cyan-300">実務上の効果：</strong>
                      {currentCounter.effect}
                    </div>
                  </div>
                </div>

                {/* Footer Action Mock */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <BookmarkCheck className="h-4 w-4 text-amber-400" />
                    <span>詰まったフレーズは「会議15分前お守りカンペ」へ自動保存</span>
                  </div>
                  <button
                    onClick={scrollToRegister}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-extrabold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>自分の資料で作る</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Comparison Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/30 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
              WHY ECHOREFLEX WORKS
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              従来の「オンライン英会話・リスニング教材」との決定的な違い
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/25 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-extrabold">従来の汎用英会話・教材学習</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    講師が日本人に合わせて<strong>ゆっくり綺麗な発音</strong>で話してくれるため、本番の早口・訛りに対応できない
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    一般的な日常会話やニュース英語ばかりで、<strong>自社の仕様書・契約書・業界スラング</strong>が一切出てこない
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    予約と受講に毎日30〜60分奪われ、忙しいプロジェクト期間中は真っ先に挫折する
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-950 p-6 shadow-xl shadow-emerald-950/20">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-extrabold">EchoReflex（本プロダクト）</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    北米・英国・インド等のアクセントと<strong>1.25倍速の早口スラング</strong>で、本番さながらの耳を慣らす
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    普段使っている<strong>自分の業務メール・仕様書を貼るだけ</strong>で、明日の会議に出る専門表現ドリルが即完成
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    通勤中の<strong>1日5分・スマホ片手</strong>で「5秒以内に聞き返す反射神経」だけをピンポイント特訓できる
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & ROI Offer Section */}
      <section className="border-b border-slate-800/80 py-16 sm:py-22">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-cyan-400/15 px-2.5 py-1 text-xs font-bold text-cyan-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>プロフェッショナルプラン・最初の7日間完全無料</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  月額 9,800円（税込）
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  ビジネス特化型オンライン英会話（月額2〜3万円）の半額以下、1日わずか約320円の投資です。
                  <br className="hidden sm:inline" />
                  <strong className="text-cyan-300">
                    「聞き間違いによる1件の納期遅延・仕様手戻りトラブル」
                  </strong>
                  を防ぐだけで、一瞬で何十倍ものリターンが返ってきます。
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-center sm:min-w-[235px]">
                <span className="text-xs font-bold text-cyan-400">先行登録ユーザー限定オファー</span>
                <div className="mt-1 text-xl font-extrabold text-white">7日間 無料トライアル</div>
                <div className="text-xs font-bold text-emerald-400">＋ 業種別お守りフレーズ集進呈</div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  まずは手元の英語資料を1つ貼り付けて精度を体感してください
                </p>
                <button
                  onClick={scrollToRegister}
                  className="mt-4 w-full rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-cyan-300"
                >
                  先行予約フォームへ →
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="h-4 w-4 shrink-0 text-cyan-400" />
                <span>業界資料からのカスタムドリル生成 無制限</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Mic className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>音声認識スピーキング＆電車内消音モード両対応</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <BookmarkCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                <span>会議15分前に見返せる「苦手お守りカンペ」機能</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Form Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="004"
            productName="EchoReflex（業界特化・英語Web会議の瞬発聞き返し特訓AI）"
            offerText="【先行登録者限定オファー】正式公開時の優先案内（月額9,800円プランの7日間完全無料トライアル枠）に加え、会議中にそのまま画面に置いて使える『角を立てずに主導権を握る・英語会議切り返しフレーズ厳選50選（PDF/Notion版）』を無料プレゼントします。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 EchoReflex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
