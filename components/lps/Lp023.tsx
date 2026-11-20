"use client";

import React, { useState } from "react";
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  FileText,
  Calculator,
  BookOpen,
  ShieldCheck,
  Clock,
  Users,
  Layers,
  Check,
  RotateCcw,
  Sliders,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

type AuditCategory = "all" | "numerical" | "style" | "custom";

interface AuditIssue {
  id: string;
  category: Exclude<AuditCategory, "all">;
  categoryLabel: string;
  severity: "critical" | "warning" | "rule";
  page: number;
  relatedPage?: number;
  slideTitle: string;
  before: string;
  after: string;
  reason: string;
  approved: boolean;
}

const INITIAL_ISSUES: AuditIssue[] = [
  {
    id: "err_001",
    category: "numerical",
    categoryLabel: "数値・単位の矛盾",
    severity: "critical",
    page: 19,
    relatedPage: 4,
    slideTitle: "P.19 初期開発投資・ランニング費用内訳",
    before: "初年度システム開発投資：1,500千円（外注費含む）",
    after: "初年度システム開発投資：1,500万円（外注費含む）",
    reason:
      "P.4の投資計画サマリーでは『1,500万円』と記載されていますが、P.19では『1,500千円（150万円）』となっており桁が1桁食い違っています。",
    approved: true,
  },
  {
    id: "err_002",
    category: "numerical",
    categoryLabel: "表内計算ミス",
    severity: "critical",
    page: 11,
    slideTitle: "P.11 部門別コスト削減インパクト試算",
    before: "営業部 45百万円 ＋ 企画部 62百万円 ＋ 管理部 45百万円 ＝ 合計 145百万円",
    after: "営業部 45百万円 ＋ 企画部 62百万円 ＋ 管理部 45百万円 ＝ 合計 152百万円",
    reason:
      "表内の3部門の縦計（45+62+45）は152百万円ですが、合計欄に145百万円と記載されており7百万円の計算不一致があります。",
    approved: true,
  },
  {
    id: "err_003",
    category: "style",
    categoryLabel: "文末・全角半角揺れ",
    severity: "warning",
    page: 8,
    slideTitle: "P.08 導入ステップとスケジュール",
    before: "１ヶ月目に要件定義を実施し、テスト運用を行います。",
    after: "1ヶ月目に要件定義を実施し、テスト運用を実行",
    reason:
      "資料全体の統一基準『体言止め』および『英数字半角』ルールに合わせ、全角数字『１』と常体/敬体混在を自動整形しました。",
    approved: true,
  },
  {
    id: "err_004",
    category: "custom",
    categoryLabel: "自社独自ルール違反",
    severity: "rule",
    page: 14,
    slideTitle: "P.14 導入企業様の声・支援体制",
    before: "弊社コンサルタントがユーザー様の業務フローを伴走支援いたします。",
    after: "当社コンサルタントがユーザ様の業務フローを伴走支援",
    reason:
      "自社共有辞書ルール『弊社→当社』『ユーザー→ユーザ（長音省略）』および文末体言止め基準を適用しました。",
    approved: true,
  },
];

export default function Lp023() {
  const [selectedCategory, setSelectedCategory] = useState<AuditCategory>("all");
  const [issues, setIssues] = useState<AuditIssue[]>(INITIAL_ISSUES);
  const [activeIssueId, setActiveIssueId] = useState<string>("err_001");
  const [tonePreset, setTonePreset] = useState<"taigen" | "desumasu">("taigen");

  const scrollToRegister = () => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleApprove = (id: string) => {
    setIssues((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, approved: !item.approved } : item
      )
    );
  };

  const approveAll = () => {
    setIssues((prev) => prev.map((item) => ({ ...item, approved: true })));
  };

  const filteredIssues =
    selectedCategory === "all"
      ? issues
      : issues.filter((item) => item.category === selectedCategory);

  const activeIssue =
    issues.find((item) => item.id === activeIssueId) || issues[0];

  const approvedCount = issues.filter((i) => i.approved).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-400 selection:text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950 shadow-lg shadow-indigo-500/25">
              <FileCheck2 className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                Slide<span className="text-cyan-400">Audit</span> Pro
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 sm:inline-block">
                BtoB資料横断校閲・一括整形SaaS
              </span>
            </div>
          </div>

          <button
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-cyan-500/20 transition hover:brightness-110 sm:px-5 sm:text-sm"
          >
            <span>14日間無料トライアル枠に登録</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
              <span className="text-balance">
                <span className="inline-block">役員会・投資委員会・重要コンペ前の</span>
                <span className="inline-block">数十ページ資料を取りまとめる</span>
                <span className="inline-block">企画リーダー・コンサルへ</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.18] text-balance">
              <span className="inline-block">P.4とP.28の数字の食い違い、</span>
              <span className="inline-block">半角全角の揺れ、</span>
              <span className="inline-block">文末バラバラ——</span>
              <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                <span className="inline-block">提案書提出前夜の</span>
                <span className="inline-block">『深夜の目視校閲地獄』を、</span>
                <span className="inline-block">ファイル丸ごとドロップ・</span>
                <span className="inline-block">最短3分で終わらせる。</span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
              <span className="inline-block">PowerPoint（.pptx）やPDFを丸ごと放り込むだけ。</span>{" "}
              <span className="inline-block">AIが全ページを横断解析し、</span>
              <span className="inline-block"><strong className="text-white">①ページ間の数値・計算・単位の矛盾</strong>、</span>{" "}
              <span className="inline-block"><strong className="text-white">②半角全角・文末・てにをはの表記揺れ</strong>、</span>{" "}
              <span className="inline-block"><strong className="text-cyan-300">③自社独自表記ルール違反</strong>を一括検出＆</span>
              <span className="inline-block">レイアウトを崩さず自動整形するBtoB専用校閲SaaSです。</span>
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={scrollToRegister}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-7 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-indigo-500/25 transition hover:brightness-110 sm:w-auto"
              >
                <span className="inline-block">14日間無料で</span>
                <span className="inline-block">「手元の提案書」を丸ごと試す</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <a
                href="#interactive-audit-demo"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 sm:w-auto"
              >
                <FileCheck2 className="h-4 w-4 text-cyan-400" />
                <span>画面上で赤入れ・一括整形デモを操作する</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              ※クレジットカード登録不要・暗号化処理後にデータ自動削除（AI学習利用なし）・請求書払い対応
            </p>
          </div>

          {/* 3-Step Workflow Cards */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-indigo-400/15 px-2.5 py-1 text-xs font-extrabold text-indigo-300">
                  STEP 01 // 複数ファイル同時投入
                </span>
                <Layers className="h-4 w-4 text-indigo-400" />
              </div>
              <h3 className="text-sm font-bold text-white">PPTX / PDF を丸ごとドロップ</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                メンバーが分担作成した複数スライドをそのまま一括アップロード。最大100ページまで全ページ横断スキャンします。
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/30 bg-slate-900/90 p-5 shadow-lg shadow-cyan-500/5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-cyan-400/15 px-2.5 py-1 text-xs font-extrabold text-cyan-300">
                  STEP 02 // 3大領域の横断検知
                </span>
                <Calculator className="h-4 w-4 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white">矛盾・表記揺れ・社内ルールを赤入れ</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                ページを跨いだ数字・単位の不一致、表計算ミス、文末混在、チーム共有の独自ルール違反をBefore/Afterで提示。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-emerald-400/15 px-2.5 py-1 text-xs font-extrabold text-emerald-300">
                  STEP 03 // レイアウト維持出力
                </span>
                <FileText className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">デザインを崩さずPPTX直接書き戻し</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                承認した修正案をPPTXのXMLノードへ直接反映。フォントサイズや図形配置を一切崩さず完成ファイルをダウンロード。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
              THE PRE-SUBMISSION NIGHTMARE
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              重要な提案書の提出前夜、こんな「不毛な神経戦」で
              <br />
              深夜まで消耗していませんか？
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">分担スライドの合体で文体・表記がバラバラ</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                3〜5人でパート分けして作った資料を結合した瞬間、「です・ます」と「体言止め」の混在、全角半角の揺れ、てにをはのねじれが噴出し、リーダーが夜中まで全ページ手直ししている。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">序盤と後半の「数字・単位の矛盾」で商談凍りつく</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                サマリーページの売上目標と後半の収支表で「数字や単位（万円と千円）が食い違っている」ことに気づかず提出し、役員やクライアントの鋭いツッコミで信頼を失ったことがある。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">自社独自ルール違反で広報・品管から差し戻し</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                「弊社／当社」「長音の有無」「旧サービス名禁止」といった社内表記ルールがメンバーに浸透せず、毎回最終チェックで細かい赤入れ差し戻しが発生する。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/25 bg-gradient-to-r from-indigo-950/50 via-slate-900 to-cyan-950/40 p-6 sm:p-8">
            <span className="text-xs font-extrabold text-cyan-300">
              汎用AIや一般的な文章校正ツールでは解決できない理由
            </span>
            <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">
              1スライドずつコピペして直す作業は、結局人間の手作業と変わりません
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              数十ページの提案書校閲に必要なのは、単文の誤字脱字チェックではありません。
              <strong>「ファイル丸ごとの全ページ横断・数値突合」</strong>と、<strong>「チーム共有の自社ルール辞書に基づくXMLレベルの一括整形」</strong>を同時に完結させるプロ仕様の品質管理（QC）エンジンです。
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Core Experience Section: 2-Pane Audit Report UI */}
      <section id="interactive-audit-demo" className="border-b border-slate-800/80 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
              <Sliders className="h-3.5 w-3.5" />
              <span>LIVE INTERACTIVE AUDIT WORKSPACE</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              「32ページの事業計画書」一括校閲レポート画面を体験
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              実際の製品画面と同じ2ペインUIです。右側の指摘カードをクリックしてページ横断ハイライトを確認したり、修正の承認／解除を切り替えてみてください。
            </p>
          </div>

          {/* Mock App Window */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-indigo-950/40">
            {/* Top App Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-slate-800" />
                <span className="font-mono text-xs font-bold text-slate-200">
                  2026年度_新規事業計画書_最終統合版_v4.pptx
                </span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                  全32ページ解析完了
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-300">
                  数値・計算矛盾: 2件
                </span>
                <span className="rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-300">
                  表記揺れ: 1件
                </span>
                <span className="rounded-md bg-cyan-500/15 px-2.5 py-1 text-xs font-bold text-cyan-300">
                  社内ルール違反: 1件
                </span>
              </div>
            </div>

            {/* Sub-bar: House Rule Presets & Bulk Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/90 px-4 py-2.5 sm:px-6">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-400">適用中の統一ルール:</span>
                <button
                  onClick={() => setTonePreset("taigen")}
                  className={`rounded-md px-2.5 py-1 font-bold transition ${
                    tonePreset === "taigen"
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  文末：体言止め統一
                </button>
                <button
                  onClick={() => setTonePreset("desumasu")}
                  className={`rounded-md px-2.5 py-1 font-bold transition ${
                    tonePreset === "desumasu"
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  文末：です・ます調
                </button>
                <span className="rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1 text-slate-300">
                  英数字半角 / 社内辞書「株式会社〇〇標準」適用中
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={approveAll}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-extrabold text-slate-950 transition hover:bg-emerald-300"
                >
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  <span>全{issues.length}件を一括承認</span>
                </button>
              </div>
            </div>

            {/* 2-Pane Workspace Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Pane: Slide Preview & Cross-Page Highlight */}
              <div className="border-b border-slate-800 bg-slate-950/60 p-5 sm:p-6 lg:col-span-6 lg:border-r lg:border-b-0">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                    SLIDE PREVIEW // 該当ページ赤入れプレビュー
                  </span>
                  <span className="rounded bg-indigo-500/20 px-2 py-0.5 font-mono text-xs font-bold text-indigo-300">
                    Page {activeIssue.page} / 32
                  </span>
                </div>

                {/* Simulated PowerPoint Slide Canvas */}
                <div className="rounded-xl border border-slate-700/80 bg-white p-5 text-slate-900 shadow-xl sm:p-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-xs font-extrabold text-indigo-900">
                      {activeIssue.slideTitle}
                    </span>
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      CONFIDENTIAL // P.{activeIssue.page}
                    </span>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                      <div className="text-[10px] font-bold text-slate-500">
                        対象テキストブロック（XML Node: p{String(activeIssue.page).padStart(2, "0")}_s02_t01）
                      </div>

                      {/* Before Highlight */}
                      <div className="mt-2 rounded border border-rose-300 bg-rose-50 px-3 py-2">
                        <span className="mb-0.5 block text-[10px] font-extrabold text-rose-700">
                          修正前（原文）
                        </span>
                        <p className="text-xs font-semibold text-rose-950 line-through decoration-rose-500/70 sm:text-sm">
                          {activeIssue.before}
                        </p>
                      </div>

                      {/* After Highlight */}
                      <div className="mt-2 rounded border border-emerald-400 bg-emerald-50 px-3 py-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-emerald-800">
                            AI整形案（{tonePreset === "taigen" ? "体言止め・社内ルール適用" : "敬体・社内ルール適用"}）
                          </span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              activeIssue.approved
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-300 text-slate-700"
                            }`}
                          >
                            {activeIssue.approved ? "PPTX出力に反映ON" : "スキップ中"}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs font-bold text-emerald-950 sm:text-sm">
                          {tonePreset === "desumasu" && activeIssue.id === "err_003"
                            ? "1ヶ月目に要件定義を実施し、テスト運用を行います。"
                            : activeIssue.after}
                        </p>
                      </div>
                    </div>

                    {/* Cross-page reference box if numerical mismatch */}
                    {activeIssue.relatedPage && (
                      <div className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-950">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <div>
                          <span className="font-extrabold">
                            他ページとの数値突合アラート（比較対象：P.{activeIssue.relatedPage}）
                          </span>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-amber-900">
                            P.{activeIssue.relatedPage}の「エグゼクティブサマリー投資表」と単位・桁数が一致していません。
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Audit Reason Note */}
                    <div className="rounded-lg bg-slate-100 p-3 text-xs text-slate-700">
                      <span className="font-extrabold text-slate-900">AI校閲コメント：</span>
                      {activeIssue.reason}
                    </div>
                  </div>
                </div>

                {/* Export Preview Footer */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                  <div className="text-xs text-slate-300">
                    承認済み修正：<strong className="text-cyan-300">{approvedCount} / {issues.length} 箇所</strong> をXMLへ書き戻し準備完了
                  </div>
                  <button
                    onClick={scrollToRegister}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-3.5 py-2 text-xs font-extrabold text-slate-950 transition hover:brightness-110"
                  >
                    <span>整形済みPPTXを出力（無料体験へ）</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Pane: Filter Tabs & Issue Cards */}
              <div className="p-5 sm:p-6 lg:col-span-6">
                {/* Category Filter Tabs */}
                <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-3">
                  {[
                    { id: "all" as const, label: `すべて (${issues.length})` },
                    { id: "numerical" as const, label: "① 数値・計算矛盾" },
                    { id: "style" as const, label: "② 表記揺れ・文末" },
                    { id: "custom" as const, label: "③ 社内独自ルール" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        selectedCategory === tab.id
                          ? "bg-cyan-400 text-slate-950"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Issue Cards List */}
                <div className="mt-4 space-y-3">
                  {filteredIssues.map((item) => {
                    const isSelected = item.id === activeIssue.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveIssueId(item.id)}
                        className={`cursor-pointer rounded-xl border p-4 transition ${
                          isSelected
                            ? "border-cyan-400 bg-slate-950 shadow-lg shadow-cyan-500/10"
                            : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
                              P.{item.page}
                            </span>
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-extrabold ${
                                item.severity === "critical"
                                  ? "bg-rose-500/20 text-rose-300"
                                  : item.severity === "warning"
                                  ? "bg-amber-500/20 text-amber-300"
                                  : "bg-cyan-500/20 text-cyan-300"
                              }`}
                            >
                              {item.categoryLabel}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleApprove(item.id);
                            }}
                            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-extrabold transition ${
                              item.approved
                                ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                                : "bg-slate-800 text-slate-400 hover:text-white"
                            }`}
                          >
                            {item.approved ? (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>修正承認済み</span>
                              </>
                            ) : (
                              <>
                                <RotateCcw className="h-3.5 w-3.5" />
                                <span>無視中（戻す）</span>
                              </>
                            )}
                          </button>
                        </div>

                        <p className="mt-2 line-clamp-1 text-xs text-slate-400">
                          <span className="text-rose-400">前：</span>
                          {item.before}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs font-bold text-emerald-300">
                          <span className="text-emerald-400">後：</span>
                          {item.after}
                        </p>
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
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
              WHY B2B TEAMS CHOOSE SLIDEAUDIT PRO
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              目視チェック・汎用チャットAIとの決定的な違い
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Before */}
            <div className="rounded-2xl border border-rose-500/25 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-extrabold">従来の目視校閲・汎用AIコピペ作業</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    30〜80ページのPDFを印刷・並べて目視確認するため、1本あたり<strong>4〜6時間の深夜残業</strong>が発生する
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    人間が文章の言い回しに気を取られ、<strong>「P.4とP.22の単位のズレ（万円と千円）」や縦計ミス</strong>を見落とす
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    汎用AIにテキストを貼り付けるとレイアウトが消え、結局PowerPoint上で1箇所ずつ手打ち修正する羽目になる
                  </span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-b from-indigo-950/30 to-slate-950 p-6 shadow-xl shadow-indigo-950/20">
              <div className="mb-4 flex items-center gap-2 text-cyan-300">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-extrabold">SlideAudit Pro 導入後の資料作成フロー</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-cyan-400">✓</span>
                  <span>
                    PPTX / PDFファイルを丸ごとドラッグ＆ドロップするだけ。<strong>最短3分で全ページ横断スキャン完了</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-cyan-400">✓</span>
                  <span>
                    ページを跨ぐ数値・計算・単位の不一致と、<strong>チーム共有の自社表記ルール違反</strong>を漏れなく警告
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-cyan-400">✓</span>
                  <span>
                    XML直接書き戻しエンジンにより、<strong>元のデザイン・図形配置を100%維持したまま整形済みPPTXを即出力</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Pricing & ROI Section */}
      <section className="border-b border-slate-800/80 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
              ENTERPRISE & TEAM PLANS
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              提案書1本の「差し戻し防止・残業削減」で即座にペイする法人料金体系
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              月収60〜100万円クラスの企画リーダー・コンサルタントが毎月費やしている<strong>「月間15〜20時間の目視校閲コスト（約10〜15万円相当）」</strong>を丸ごと削減します。
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Team Plan */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-indigo-500/15 px-3 py-1 text-xs font-extrabold text-indigo-300">
                  企画部・営業チーム向け
                </span>
                <span className="text-xs font-bold text-slate-400">5アカウントまで</span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-white">チームプラン</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-white sm:text-4xl">月額 30,000円</span>
                <span className="text-xs text-slate-400">（税抜）</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                1名あたり月額6,000円。毎月3〜4本の提案書・事業計画書を作成する部門に最適。
              </p>

              <ul className="mt-6 space-y-3 border-t border-slate-800 pt-6 text-xs text-slate-200 sm:text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span>月間100ファイルまで解析（1ファイル最大50ページ）</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span>チーム共有「自社独自表記ルール辞書」1セット（CSV取込対応）</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span>レイアウト維持PPTX直接出力 ＆ 赤入れPDFレポート出力</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span>14日間完全無料トライアル付き</span>
                </li>
              </ul>

              <button
                onClick={scrollToRegister}
                className="mt-7 w-full rounded-xl border border-cyan-400/50 bg-cyan-400/10 py-3.5 text-sm font-extrabold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
              >
                チームプランの先行無料トライアルに登録 →
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="relative rounded-3xl border-2 border-cyan-400/60 bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 p-7 shadow-2xl shadow-cyan-950/30 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-cyan-400 px-3 py-1 text-xs font-extrabold text-slate-950">
                  コンサル・複数部門導入向け
                </span>
                <span className="text-xs font-bold text-cyan-300">20アカウントまで</span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-white">エンタープライズプラン</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-white sm:text-4xl">月額 50,000円</span>
                <span className="text-xs text-slate-400">（税抜）</span>
              </div>
              <p className="mt-2 text-xs text-slate-300">
                1名あたり月額2,500円。全社的な提案品質の標準化とコンペ勝率向上を実現。
              </p>

              <ul className="mt-6 space-y-3 border-t border-slate-800 pt-6 text-xs text-slate-100 sm:text-sm">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>
                    <strong>ファイル数・ページ数 無制限</strong>（100ページ超の大型計画書対応）
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>部門別・クライアント別の独自ルール辞書を無制限に作成・切替</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>法人請求書払い（Paid / 銀行振込）・SSO認証対応</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>専任オンボーディング（既存ハウスルールCSV初期登録代行）</span>
                </li>
              </ul>

              <button
                onClick={scrollToRegister}
                className="mt-7 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
              >
                エンタープライズ先行導入・14日間無料体験へ →
              </button>
            </div>
          </div>

          {/* Security Guarantee Bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-4 text-xs text-slate-300 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
              <span>
                <strong className="text-white">機密情報保護ポリシー：</strong>
                アップロードされた事業計画書・提案書データはTLS暗号化通信で処理され、解析完了後にサーバーから自動削除されます。AIの学習には一切利用されません。
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 font-bold text-cyan-300">
              <Clock className="h-4 w-4" />
              <span>最短30秒で利用開始</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Form Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="023"
            productName="SlideAudit Pro（複数人作成の提案書・事業計画書を一括横断校閲＆自動整形するBtoB SaaS）"
            offerText="【法人・チーム先行登録オファー】正式公開時の「14日間完全無料トライアル優先案内（チーム月額30,000円 / エンタープライズ月額50,000円・請求書払い対応）」に加え、戦略コンサルティングファーム基準の『提案書提出前・最終品質管理チェックリスト＆独自表記ルール辞書CSVサンプル』を無料進呈いたします。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 SlideAudit Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
