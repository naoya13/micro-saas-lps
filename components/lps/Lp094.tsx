"use client";

import React, { useState } from "react";
import {
  Mic,
  Sparkles,
  Send,
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Link2,
  MessageSquare,
  FileText,
  Clock,
  Smartphone,
  Repeat,
  ShieldCheck,
  Zap,
  Sliders,
  Check,
  UserCheck,
  Volume2,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

type PersonaKey = "pm" | "consultant" | "engineer";
type OutputTab = "single" | "thread" | "note";

interface PersonaDemo {
  label: string;
  handle: string;
  displayName: string;
  role: string;
  samplePosts: string[];
  dnaTags: {
    ending: string;
    rhythm: string;
    thinking: string;
    ngRule: string;
  };
  voiceMemo: string;
  outputs: {
    single: {
      angleA: string;
      textA: string;
      angleB: string;
      textB: string;
    };
    thread: string[];
    note: {
      title: string;
      headings: string[];
    };
  };
  replyUrl: string;
  replyText: string;
}

const PERSONA_DEMOS: Record<PersonaKey, PersonaDemo> = {
  pm: {
    label: "例1：SaaSプロダクトマネージャー",
    handle: "@kenta_pm_note",
    displayName: "ケンタ｜BtoBプロダクト開発",
    role: "IT企業 PM / 34歳",
    samplePosts: [
      "機能を増やすのは簡単。本当に難しいのは「使われない機能を勇気を持って削ること」だ。",
      "会議が1時間終わって何も決まっていない時、原因の9割は『今日何を決めるか』が冒頭3分で握れていないことにある。",
    ],
    dnaTags: {
      ending: "「〜だ」「〜にある」断定・体言止め多め",
      rhythm: "2文構成・空行1行・絵文字ゼロ",
      thinking: "常識の逆説→現場の構造的原因の特定",
      ngRule: "「〜ですね」「いかがでしたか」禁止",
    },
    voiceMemo:
      "えー、今日の朝会でも思ったんだけど、ユーザーインタビューで『こういうボタンが欲しい』って言われてそのまま作ると大体失敗するんだよね。欲しいものじゃなくて、その人が何に困っててどの作業をショートカットしたいのかを見ないとダメだなって話。",
    outputs: {
      single: {
        angleA: "本質・断定型",
        textA:
          "ユーザーインタビューで「〇〇機能が欲しい」と言われ、そのまま実装すると9割失敗する。\n\n顧客は自分の課題の専門家だが、解決策の専門家ではないからだ。聞くべきは欲しいボタンではなく「今一番時間を奪われている作業」の一点のみ。",
        angleB: "現場の気づき・対比型",
        textB:
          "ダメなPMは顧客の「要望リスト」をそのまま開発チケットにする。\n優秀なPMは要望の裏にある「業務の詰まり」を特定して別の最短ルートを作る。\n\n言われた通りに作るだけなら、人間が間に立つ意味はない。",
      },
      thread: [
        "ユーザーインタビューで「〇〇機能が欲しい」と言われ、そのまま開発すると高確率で失敗する。理由はシンプルで、顧客は「解決策の素人」だからだ。（1/3）",
        "以前、顧客の熱望で作ったCSV一括編集機能が、リリース後ほとんど使われなかった。深掘りすると、顧客が本当にやりたかったのはCSV編集ではなく「月末の承認作業を5分で終わらせること」だった。（2/3）",
        "ヒアリングで聞くべきは「何が欲しいか」ではない。「昨日、その作業で一番イラッとした瞬間はどこか」だ。要望を鵜呑みにせず、構造を疑え。（3/3）",
      ],
      note: {
        title: "顧客の「欲しい機能」をそのまま作って失敗した話と、本音を引き出す3つの質問",
        headings: [
          "1. なぜ要望通りに作った機能ほど使われないのか",
          "2. 「解決策」ではなく「業務のボトルネック」を聞く質問テンプレ",
          "3. 明日のユーザーヒアリングから使えるチェックリスト",
        ],
      },
    },
    replyUrl: "https://note.com/kenta_pm/n/n84f92a1c",
    replyText: "▼ヒアリングで実際に使っている質問シートの全容はこちらにまとめました",
  },
  consultant: {
    label: "例2：法人営業・組織コンサル",
    handle: "@sato_sales_lab",
    displayName: "佐藤｜法人営業の仕組み化",
    role: "営業コンサルタント / 38歳",
    samplePosts: [
      "トップ営業と売れない営業の差は「トークの流暢さ」ではない。商談前の「仮説の深さ」で8割決まっている。",
      "「持ち帰って検討します」と言われた商談の9割は失注する。その場で次の日程を握れないのは、決裁の壁を聞き出せていない証拠。",
    ],
    dnaTags: {
      ending: "「〜である」「〜の証拠」論理的断定",
      rhythm: "数字（8割・9割）を交えた対比構造",
      thinking: "現象の指摘→原因の数値化→行動基準",
      ngRule: "過剰な感嘆符（！）や煽り表現なし",
    },
    voiceMemo:
      "さっき商談同行してて気づいたんだけど、提案資料を最初から最後まで1ページずつ丁寧に説明する営業ほど受注率が低い。相手が知りたいのは自社の会社概要じゃなくて、うちの課題がどう解決してコストがいくら下がるかの結論だけなんだよね。",
    outputs: {
      single: {
        angleA: "対比・結論ファースト型",
        textA:
          "提案資料を1ページ目から順番に丁寧に説明する営業ほど、受注率は低い。\n\n決裁者が知りたいのは貴社の歴史でも会社概要でもない。「自社の課題が解決し、いくら利益が残るか」の結論だけだ。資料は最初から順番にめくるな。",
        angleB: "現場観察・改善アクション型",
        textB:
          "商談開始10分で会社の強みを語り始めるのは悪手である。\n\nトップ営業は冒頭3分で「御社の現状の課題仮説」をぶつけ、相手の反応を見て提案の着地点だけを見せる。説明時間を半分に減らせば、成約率は確実に上がる。",
      },
      thread: [
        "提案資料を1ページ目から丁寧に説明する営業ほど、受注率が低い。決裁者が知りたいのは会社概要ではなく「自社の利益がいくら増えるか」の結論だけだからだ。（1/3）",
        "商談同行でよく見る失敗が、前半20分を自社の実績紹介に使い、肝心の費用対効果や導入スケジュールが時間切れで駆け足になるパターン。これでは社内稟議が通らない。（2/3）",
        "明日の商談からは、冒頭で「結論スライド」を先に見せてほしい。相手が身を乗り出してから初めて、根拠となる事例や仕組みを補足すればいい。（3/3）",
      ],
      note: {
        title: "商談の成約率を1.8倍に変えた「会社概要を飛ばして結論から話す」提案資料の構成術",
        headings: [
          "1. なぜ真面目な営業ほど1ページ目から説明して失敗するのか",
          "2. 決裁者が最初の5分で判断している3つの基準",
          "3. そのまま使えるBtoB提案スライド10枚の並び順",
        ],
      },
    },
    replyUrl: "https://note.com/sato_sales/n/n31b77e09",
    replyText: "▼成約率が上がった提案資料10枚の具体的な構成テンプレートはこちら",
  },
  engineer: {
    label: "例3：個人開発・テックリード",
    handle: "@ryo_dev_log",
    displayName: "りょう｜個人開発とWeb技術",
    role: "フリーランスエンジニア / 31歳",
    samplePosts: [
      "個人開発で一番やってはいけないのは、ユーザー1人もいないのに完璧なマイクロサービス構成を組むこと。",
      "技術選定で3日迷うくらいなら、一番書き慣れたスタックで今日中にLPを出した方が100倍前に進む。",
    ],
    dnaTags: {
      ending: "「〜こと」「〜方がいい」フラットな実務家調",
      rhythm: "短文ストレート・専門用語を噛み砕く",
      thinking: "やりがちな過剰設計の否定→最短行動の提示",
      ngRule: "上から目線の説教調・絵文字乱用なし",
    },
    voiceMemo:
      "個人開発の相談受けてて思うけど、みんな最初に認証とか管理画面とか作り込みすぎなんだよね。まずは決済ボタンとコア機能1個だけで出して、お金払う人がいるか確かめてから作り込めばいいのに。",
    outputs: {
      single: {
        angleA: "過剰設計の否定型",
        textA:
          "個人開発で最初に管理画面や複雑な権限設計を作り込むのは時間の溶かし方として最悪に近い。\n\nユーザー0人の段階に必要なのは、コア機能1つと決済導線だけ。お金を払う人が現れてから、必要な分だけ裏側を整えればいい。",
        angleB: "行動基準・シンプル提示型",
        textB:
          "リリースできない個人開発者ほど「あったら便利な機能」を足し算し続ける。\n\n・管理画面はSupabaseのダッシュボードで代用\n・通知は自分宛てのメール1通で十分\n\nまずは週末に公開して、市場の反応を見ることだけ考えよう。",
      },
      thread: [
        "個人開発で一番もったいないのは、リリース前に「管理画面・複雑な設定・完璧なテスト」を作り込んで力尽きること。（1/3）",
        "初期フェーズなら、データ確認はDBの管理画面を直接見ればいいし、解約処理も手動対応で十分回る。使われないシステムの保守性を高めても意味がない。（2/3）",
        "コア機能1つとStripe決済だけ繋いで、まず世に出す。お金を払ってくれるユーザーが10人ついてから、初めてリファクタリングすればいい。（3/3）",
      ],
      note: {
        title: "個人開発を週末2日でリリースするために「作らないと決めた機能」リスト",
        headings: [
          "1. 作りかけのリポジトリが量産される本当の理由",
          "2. 初期リリースで削ぎ落としていい5つの実装",
          "3. Next.js + Supabaseで最短課金導線を組む最小構成",
        ],
      },
    },
    replyUrl: "https://note.com/ryo_dev/n/n90c44d12",
    replyText: "▼週末リリース用の最小技術スタックとチェックリストをまとめました",
  },
};

export default function Lp094() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaKey>("pm");
  const [activeTab, setActiveTab] = useState<OutputTab>("single");
  const [selectedSingleVariant, setSelectedSingleVariant] = useState<"A" | "B">("A");
  const [autoReplyEnabled, setAutoReplyEnabled] = useState<boolean>(true);
  const [selectedTimeChip, setSelectedTimeChip] = useState<string>("明日の朝 7:30");
  const [queuedSuccess, setQueuedSuccess] = useState<boolean>(false);

  const demo = PERSONA_DEMOS[selectedPersona];

  const scrollToRegister = () => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePersonaChange = (key: PersonaKey) => {
    setSelectedPersona(key);
    setSelectedSingleVariant("A");
    setQueuedSuccess(false);
  };

  const handleQueueDemo = () => {
    setQueuedSuccess(true);
    setTimeout(() => setQueuedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950 shadow-lg shadow-indigo-500/20">
              <Mic className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                Voice<span className="text-indigo-400">Clone</span> Post
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 sm:inline-block">
                文体DNA再現×X自動予約コパイロット
              </span>
            </div>
          </div>

          <button
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-400 sm:text-sm"
          >
            <span>先行モニター登録</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_58%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
              <span className="text-balance">
                <span className="inline-block">Xやnoteで仕事の知見を発信したいが、</span>
                <span className="inline-block">忙しくて更新が止まっている</span>
                <span className="inline-block">ビジネスパーソンへ</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.18] text-balance">
              <span className="inline-block">「AIに書かせると、</span>
              <span className="inline-block">自分らしくない。</span>
              <br className="hidden sm:inline" />
              <span className="inline-block">かといってゼロから</span>
              <span className="inline-block">書く時間はない」</span>
              <span className="mt-2 block bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                <span className="inline-block">30秒の音声メモから、</span>
                <span className="inline-block">文体100%のX投稿＆</span>
                <span className="inline-block">予約完了までワンタップ。</span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
              <span className="inline-block">過去に伸びたあなたの投稿から<strong className="text-white">「語彙・語尾・リズム・思考の癖（文体DNA）」</strong>をAIが精密抽出。</span>{" "}
              <span className="inline-block">通勤中にスマホへ30秒喋るだけで、</span>
              <span className="inline-block"><strong className="text-white">本人としか思えないX投稿・ツリー・note構成案</strong>の生成から、</span>{" "}
              <span className="inline-block">インプレッションを落とさない</span>
              <span className="inline-block"><strong className="text-white">リプ欄URL自動挿入予約</strong>まで</span>
              <span className="inline-block">一気通貫で完結します。</span>
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={scrollToRegister}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-indigo-500/25 transition hover:brightness-110 sm:w-auto"
              >
                <span className="inline-block">先行リリース案内・</span>
                <span className="inline-block">7日間無料枠を受け取る</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <a
                href="#voice-to-post-demo"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 sm:w-auto"
              >
                <Volume2 className="h-4 w-4 text-indigo-400" />
                <span className="inline-block">実際の「文体再現＆</span>
                <span className="inline-block">予約UI」を試す</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              ※正式版は月額 2,980円（税込）・全機能無制限でリリース予定。事前登録で優先案内＋文体プロファイル初期構築特典を進呈。
            </p>
          </div>

          {/* 3-Step Workflow Cards */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-indigo-500/15 px-2.5 py-1 text-xs font-extrabold text-indigo-300">
                  STEP 01 // 初回のみ
                </span>
                <UserCheck className="h-4 w-4 text-indigo-400" />
              </div>
              <h3 className="text-sm font-bold text-white">過去投稿3〜5件から文体DNA抽出</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                過去に反応が良かった投稿を貼るだけ。語尾の癖・改行間隔・論理展開・NG表現をJSON化しあなた専用AIを構築。
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/30 bg-slate-900/90 p-5 shadow-lg shadow-cyan-500/5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-cyan-500/15 px-2.5 py-1 text-xs font-extrabold text-cyan-300">
                  STEP 02 // 移動中30秒
                </span>
                <Mic className="h-4 w-4 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white">スマホ音声メモから一括生成</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                思いつきをそのまま吹き込むだけ。あなたの文体で「単発2案・長文ツリー・note記事見出し案」まで一瞬で変換。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-extrabold text-emerald-300">
                  STEP 03 // ワンタップ
                </span>
                <Send className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">予約キュー＆リプ欄URL自動挿入</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                「明日の朝7:30」を選ぶだけでX予約完了。アルゴリズム対策としてnote等のURLは投稿直後にリプ欄へ自動返信。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Empathy Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
              WHY DAILY POSTING FAILS
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              毎日発信を続けたいのに、
              <br />
              こんな「見えない作業コスト」で止まっていませんか？
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">汎用AIの「薄っぺらい構文」が恥ずかしい</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                ChatGPTに下書きを作らせても「〜が重要です！✨」「〇〇の秘訣3選」のようなテンプレ文章になり、結局自分で全部書き直している。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">移動中の閃きがメモ帳で腐っていく</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                通勤電車や商談帰りに良いネタを思いついても、箇条書きメモのまま夜になり、帰宅後は疲れて投稿を諦める日々。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <Link2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">予約ツールへのコピペ＆リプ欄URL貼りが面倒</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                文章を作った後、別の予約ツールを開いて貼り付け、さらにインプ低下を防ぐため投稿時間に合わせて手動でリプ欄にURLを貼る手間。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-400/25 bg-gradient-to-r from-indigo-950/50 via-slate-900 to-cyan-950/30 p-6 sm:p-8">
            <span className="text-xs font-extrabold text-indigo-300">
              発信が続かない原因は、あなたの継続力不足ではありません
            </span>
            <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">
              「思いつき」から「予約完了」までの工程が分断されているだけです
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              忙しい実務家に必要なのは、PCの前でプロンプトを微調整する時間ではなく、
              <strong>① あなたの過去の文体DNAを固定した専用エンジン</strong>と、
              <strong>② スマホの音声メモからX予約・リプ欄URL自動挿入まで1画面で終わる自動化ライン</strong>です。
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Core Experience Demo */}
      <section id="voice-to-post-demo" className="border-b border-slate-800/80 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300">
              <Zap className="h-3.5 w-3.5" />
              <span>INTERACTIVE VOICE-TO-POST DEMO</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              「雑な音声メモ」が「本人100%の投稿＆予約」に変わる瞬間
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              発信者タイプを切り替えて、過去投稿から抽出された「文体DNA」が音声メモをどのように変換し、リプ欄URL付きで予約されるか試してください。
            </p>
          </div>

          {/* Persona Selector */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {(Object.keys(PERSONA_DEMOS) as PersonaKey[]).map((key) => {
              const active = selectedPersona === key;
              return (
                <button
                  key={key}
                  onClick={() => handlePersonaChange(key)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                    active
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                      : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {PERSONA_DEMOS[key].label}
                </button>
              );
            })}
          </div>

          {/* 3-Column / Mobile-First End-to-End Simulator */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Column: Step 1 Style DNA + Step 2 Voice Memo Input */}
            <div className="space-y-5 lg:col-span-5">
              {/* Style DNA Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-extrabold tracking-wider text-indigo-300 uppercase">
                      STEP 1 // 抽出済み「文体DNA」
                    </span>
                  </div>
                  <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    学習完了
                  </span>
                </div>

                <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/80 p-3">
                  <div className="text-[11px] font-bold text-slate-400">
                    学習元の過去投稿サンプル（一部）
                  </div>
                  <p className="mt-1 text-xs italic leading-relaxed text-slate-300">
                    「{demo.samplePosts[0]}」
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                    <span className="block text-[10px] font-bold text-indigo-400">語尾・文末の癖</span>
                    <span className="mt-0.5 block text-slate-200">{demo.dnaTags.ending}</span>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                    <span className="block text-[10px] font-bold text-indigo-400">リズム・改行</span>
                    <span className="mt-0.5 block text-slate-200">{demo.dnaTags.rhythm}</span>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                    <span className="block text-[10px] font-bold text-cyan-400">思考の展開パターン</span>
                    <span className="mt-0.5 block text-slate-200">{demo.dnaTags.thinking}</span>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-2.5">
                    <span className="block text-[10px] font-bold text-rose-400">AI臭排除NGルール</span>
                    <span className="mt-0.5 block text-slate-200">{demo.dnaTags.ngRule}</span>
                  </div>
                </div>
              </div>

              {/* Voice Memo Input Card */}
              <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-5 shadow-lg shadow-cyan-950/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-cyan-400" />
                    <span className="text-xs font-extrabold tracking-wider text-cyan-300 uppercase">
                      STEP 2 // スマホ音声メモ入力（30秒）
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan-300">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                    00:28 文字起こし済
                  </span>
                </div>

                {/* Audio Waveform Visual */}
                <div className="mt-3 flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5">
                  {[35, 65, 90, 45, 80, 100, 60, 40, 85, 70, 50, 95, 75, 45, 60, 85, 50, 30, 70, 90, 55, 40, 75, 60].map(
                    (h, idx) => (
                      <div
                        key={idx}
                        className="flex-1 rounded-full bg-gradient-to-t from-indigo-500 to-cyan-400 opacity-80"
                        style={{ height: `${Math.max(6, Math.round(h * 0.24))}px` }}
                      />
                    )
                  )}
                </div>

                <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs leading-relaxed text-slate-300">
                  <span className="mb-1 block text-[10px] font-bold text-slate-500">
                    吹き込んだ話し言葉そのまま（未編集）
                  </span>
                  「{demo.voiceMemo}」
                </div>
              </div>
            </div>

            {/* Right Column: Step 3 Generated Output & One-Tap X Scheduler */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
                {/* Mode Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setActiveTab("single")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        activeTab === "single"
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      単発ポスト（140字）
                    </button>
                    <button
                      onClick={() => setActiveTab("thread")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        activeTab === "thread"
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      長文ツリー（3連）
                    </button>
                    <button
                      onClick={() => setActiveTab("note")}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        activeTab === "note"
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      note記事構成案
                    </button>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-300">
                    文体一致率 98%
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  {/* Single Post View */}
                  {activeTab === "single" && (
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">
                          切り口パターンを選択（タップで直接編集可）
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => setSelectedSingleVariant("A")}
                            className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${
                              selectedSingleVariant === "A"
                                ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            案A：{demo.outputs.single.angleA}
                          </button>
                          <button
                            onClick={() => setSelectedSingleVariant("B")}
                            className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${
                              selectedSingleVariant === "B"
                                ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            案B：{demo.outputs.single.angleB}
                          </button>
                        </div>
                      </div>

                      {/* X Timeline Preview Card */}
                      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-extrabold text-white">
                            {demo.displayName.slice(0, 1)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{demo.displayName}</div>
                            <div className="text-xs text-slate-500">{demo.handle}</div>
                          </div>
                        </div>

                        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-100">
                          {selectedSingleVariant === "A"
                            ? demo.outputs.single.textA
                            : demo.outputs.single.textB}
                        </p>

                        <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-2.5 text-[11px] text-slate-500">
                          <span>
                            文字数：
                            {(selectedSingleVariant === "A"
                              ? demo.outputs.single.textA
                              : demo.outputs.single.textB
                            ).length}
                            / 140字
                          </span>
                          <span className="text-emerald-400">✓ 絵文字・AI構文ゼロ</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Thread Post View */}
                  {activeTab === "thread" && (
                    <div className="space-y-3">
                      {demo.outputs.thread.map((tweet, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-xl border border-slate-800 bg-slate-950 p-3.5"
                        >
                          <div className="mb-1.5 flex items-center justify-between text-[11px]">
                            <span className="font-bold text-indigo-400">
                              {idx === 0 ? "1投稿目（フック）" : `${idx + 1}投稿目`}
                            </span>
                            <span className="text-slate-500">{tweet.length} / 140字</span>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-100 sm:text-sm">
                            {tweet}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Note Outline View */}
                  {activeTab === "note" && (
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                        <FileText className="h-4 w-4" />
                        <span>週末に書けるnote記事構成案（自動生成）</span>
                      </div>
                      <h4 className="mt-2 text-base font-extrabold text-white">
                        {demo.outputs.note.title}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {demo.outputs.note.headings.map((h, i) => (
                          <li
                            key={i}
                            className="rounded-lg border border-slate-800/80 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Auto-Reply URL & One-Tap Scheduler Panel */}
                  <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link2 className="h-4 w-4 text-cyan-400" />
                        <span className="text-xs font-extrabold text-white">
                          リプ欄URL自動挿入（インプ低下対策）
                        </span>
                      </div>
                      <button
                        onClick={() => setAutoReplyEnabled(!autoReplyEnabled)}
                        aria-label="リプ欄URL自動挿入の切り替え"
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          autoReplyEnabled ? "bg-indigo-500" : "bg-slate-700"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            autoReplyEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {autoReplyEnabled && (
                      <div className="mt-3 rounded-xl border border-slate-800 bg-slate-900/90 p-3 text-xs">
                        <div className="text-[10px] font-bold text-cyan-400">
                          親ツイート投稿直後にX APIで自動リプライされる内容：
                        </div>
                        <p className="mt-1 text-slate-200">{demo.replyText}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-indigo-400">
                          {demo.replyUrl}
                        </p>
                      </div>
                    )}

                    {/* Timing Chips */}
                    <div className="mt-4">
                      <span className="block text-[11px] font-bold text-slate-400">
                        ワンタップ予約タイミング選択
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {[
                          "今すぐ投稿",
                          "明日の朝 7:30",
                          "今日の昼 12:15",
                          "今日の夜 21:00",
                        ].map((chip) => (
                          <button
                            key={chip}
                            onClick={() => setSelectedTimeChip(chip)}
                            className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                              selectedTimeChip === chip
                                ? "bg-cyan-500 text-slate-950"
                                : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
                            }`}
                          >
                            <Calendar className="h-3 w-3" />
                            <span>{chip}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleQueueDemo}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 text-xs font-extrabold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 sm:text-sm"
                    >
                      {queuedSuccess ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>
                            「{selectedTimeChip}」のX予約キューに登録しました！（体験デモ）
                          </span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>「{selectedTimeChip}」で予約キューに登録する</span>
                        </>
                      )}
                    </button>
                  </div>
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
            <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
              BEFORE & AFTER
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              汎用AIチャットでの下書き作成と、VoiceClone Postの違い
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/25 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-extrabold">これまでの汎用AI＋手動予約</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    毎回プロンプトで「断定調で」「絵文字なしで」と指示しても、すぐ<strong>機械的なAI構文</strong>に戻る
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    1投稿作るのに平均20〜30分かかり、残業や会食が入った日は連続投稿が途切れる
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    X投稿・ツリー作成・note構成案・リプ欄URL貼りを別々のツールで行き来して疲弊する
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-950 p-6 shadow-xl shadow-emerald-950/20">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-extrabold">VoiceClone Post 導入後の発信習慣</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    過去投稿から抽出した<strong>「文体DNA」</strong>を常時適用するため、フォロワーが読んでも100%本人らしい文章になる
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    通勤中の<strong>30秒音声メモから1分で翌朝の予約完了</strong>。1日30分（月15時間）の作業時間を丸ごと削減
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    X単発・ツリー・note構成案の一括生成から、<strong>投稿直後のリプ欄URL自動返信</strong>までスマホ片手で完結
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Offer & Pricing Section */}
      <section className="border-b border-slate-800/80 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/15 px-2.5 py-1 text-xs font-bold text-indigo-300">
                  <Repeat className="h-3.5 w-3.5" />
                  <span>生成・予約キュー・note構成案すべて無制限</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  スタンダードプラン：月額 2,980円（税込）
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  毎日の投稿作成と予約作業にかかっていた<strong className="text-white">「1日30分（月15時間）」を1日あたり約99円</strong>で買い取れます。
                  <br className="hidden sm:inline" />
                  継続的な発信から月1件でも仕事相談やnoteの売上が生まれれば、一瞬で元が取れる自己投資です。
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-center sm:min-w-[235px]">
                <span className="text-xs font-bold text-indigo-400">先行テストユーザー特典</span>
                <div className="mt-1 text-2xl font-extrabold text-white">7日間 完全無料</div>
                <div className="text-xs font-bold text-emerald-400">＋ 文体DNA初期チューニング付</div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  無料期間中の解約は0円。自分の文体が再現されるか試してから継続を判断できます
                </p>
                <button
                  onClick={scrollToRegister}
                  className="mt-4 w-full rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-indigo-400"
                >
                  先行案内を受け取る →
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>X公式OAuth 2.0連携・パスワード預かり一切なし</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Smartphone className="h-4 w-4 shrink-0 text-indigo-400" />
                <span>スマホブラウザ完結・移動中に片手で音声入力〜予約</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Link2 className="h-4 w-4 shrink-0 text-cyan-400" />
                <span>インプ低下を防ぐリプ欄URL自動返信機能を搭載</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Form Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="094"
            productName="VoiceClone Post（文体DNA再現×スマホ音声メモX自動予約コパイロット）"
            offerText="【先行登録者限定特典】正式リリース（月額2,980円・7日間無料トライアル）の優先ご案内に加え、あなたの過去投稿からAIが精度高く文体を学習するための『伸びる過去投稿サンプル選定ガイド＆NGルール設定集』を無料プレゼントします。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 VoiceClone Post. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
