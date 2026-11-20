"use client";

import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  UploadCloud,
  Layers,
  AlertTriangle,
  Download,
  Copy,
  Check,
  MousePointerClick,
  ShieldAlert,
  Lightbulb,
  BookOpen,
  Clock,
  Lock,
  Eye,
  FileSpreadsheet,
  LayoutTemplate,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

type TemplatePresetKey = "excel" | "notion";

interface AnnotationPin {
  id: number;
  xPercent: number;
  yPercent: number;
  type: "action" | "warning";
  shortLabel: string;
}

interface ManualStepSample {
  stepNumber: number;
  stepTitle: string;
  userMemo: string;
  screenLabel: string;
  annotations: AnnotationPin[];
  instructions: string[];
  proTip: string;
  caution: string | null;
}

interface TemplateDemoData {
  label: string;
  toolName: string;
  templateTitle: string;
  targetAudience: string;
  welcomeMessage: string;
  beforeYouStart: string[];
  steps: ManualStepSample[];
  faq: { q: string; a: string }[];
}

const DEMO_TEMPLATES: Record<TemplatePresetKey, TemplateDemoData> = {
  excel: {
    label: "サンプル1：確定申告・経費管理Excelシート",
    toolName: "Excel / Googleスプレッドシート",
    templateTitle: "初心者でも5分で使いこなせる！副業フリーランス向け確定申告・経費管理シート",
    targetAudience: "Excel操作に慣れていない個人事業主・副業会社員",
    welcomeMessage:
      "この度は本テンプレートをご購入いただきありがとうございます。難しい関数や簿記の知識は一切不要です。以下の3ステップに沿って入力するだけで、確定申告に必要な集計表が自動で完成します。",
    beforeYouStart: [
      "元のファイルは閲覧専用です。必ず左上の「ファイル」→「コピーを作成」からご自身のドライブに保存してご使用ください。",
      "スマホから閲覧する場合は、Googleスプレッドシートアプリのインストールを推奨します。",
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: "まずは『初期設定』タブに事業年度と期首残高を入力しよう",
        userMemo: "最初にここへ基本情報を入力させる。灰色のセルは自動計算なので触らせない。",
        screenLabel: "Sheet 1: 初期設定・基本情報画面",
        annotations: [
          { id: 1, xPercent: 28, yPercent: 34, type: "action", shortLabel: "① 年月を入力" },
          { id: 2, xPercent: 28, yPercent: 56, type: "action", shortLabel: "② 開業日を選択" },
          { id: 3, xPercent: 72, yPercent: 44, type: "warning", shortLabel: "⚠️ 編集禁止（自動計算）" },
        ],
        instructions: [
          "画面下部の「初期設定」タブを開き、画像の[1]の黄色い枠に対象の年度（例：2026）を入力します。",
          "続いて[2]の枠に開業日または集計開始日を入力します。",
          "右側の[3]のグレーの枠は年間合計が自動計算されるため、直接文字を打ち込まないようご注意ください。",
        ],
        proTip: "黄色い背景のセルだけが「あなたが入力する場所」です。迷ったら黄色い枠だけを探せばOKです！",
        caution: "グレーのセルの数式を消してしまうと、確定申告用の集計レポートが正しく表示されなくなります。",
      },
      {
        stepNumber: 2,
        stepTitle: "日々のレシートを見ながら『経費入力』シートに1行ずつ記録しよう",
        userMemo: "勘定科目はプルダウンから選ばせる。金額は税込で入力。",
        screenLabel: "Sheet 2: 経費入力台帳（プルダウン選択）",
        annotations: [
          { id: 1, xPercent: 22, yPercent: 48, type: "action", shortLabel: "① 日付を入力" },
          { id: 2, xPercent: 48, yPercent: 48, type: "action", shortLabel: "② ▼から科目選択" },
          { id: 3, xPercent: 76, yPercent: 48, type: "action", shortLabel: "③ 税込金額を入力" },
        ],
        instructions: [
          "「経費入力」タブに切り替え、レシートの日付を[1]に入力します（例：4/15 と打つと自動で日付形式になります）。",
          "[2]の「勘定科目」セルをクリックし、右端に出る「▼」ボタンから該当する科目（消耗品費・会議費など）を選びます。",
          "[3]にレシートの合計金額（税込）を半角数字で入力すれば登録完了です。",
        ],
        proTip: "どの勘定科目か迷ったときは、右隣にある「科目早見表」タブのキーワード検索を使うと一瞬で分かります。",
        caution: null,
      },
      {
        stepNumber: 3,
        stepTitle: "『年間集計レポート』を開いて確定申告書の転記数字を確認しよう",
        userMemo: "ここは見るだけのシート。PDF保存ボタンの位置を教えてあげる。",
        screenLabel: "Sheet 3: 青色・白色申告用 自動集計ダッシュボード",
        annotations: [
          { id: 1, xPercent: 35, yPercent: 42, type: "action", shortLabel: "① 申告書へ転記する数字" },
          { id: 2, xPercent: 78, yPercent: 24, type: "action", shortLabel: "② PDF控えを保存" },
        ],
        instructions: [
          "すべての入力が終わったら「年間集計レポート」タブを開きます。e-Tax（確定申告書作成コーナー）にそのまま入力できる科目別合計が[1]に表示されます。",
          "提出前の控えを残す場合は、画面右上の[2]「印刷 / PDFダウンロード」からA4縦サイズで保存してください。",
        ],
        proTip: "毎月月末にこの画面を一度チェックしておくと、翌年2月の確定申告が15分で終わります。",
        caution: "集計シート内の項目名（旅費交通費など）を書き換えると集計がズレるため変更しないでください。",
      },
    ],
    faq: [
      {
        q: "Q. 間違えて数式が入ったセルを上書きしてしまいました。どうすればいいですか？",
        a: "A. すぐに「Ctrl + Z（Macは Command + Z）」を押して1つ前の状態に戻してください。解決しない場合は、購入時の配布リンクから再度新しいファイルをコピーしてご利用いただけます。",
      },
      {
        q: "Q. iPhoneやiPadのスマホからでも経費の入力はできますか？",
        a: "A. はい、可能です。無料の「Googleスプレッドシート」アプリをインストールしてログインすれば、外出先でレシートを見ながらスマホから直接入力できます。",
      },
    ],
  },
  notion: {
    label: "サンプル2：案件・タスク一元管理Notionテンプレ",
    toolName: "Notion（ノーション）",
    templateTitle: "初心者でも5分で使いこなせる！フリーランス案件・請求・タスク一元管理Notion",
    targetAudience: "Notionを初めて触るデザイナー・ライター・個人開発者",
    welcomeMessage:
      "本Notionテンプレートをご購入いただきありがとうございます！複数のクライアント案件・納期・請求ステータスを1画面で迷わず管理できるよう設計されています。まずは画面右上の『複製』から始めましょう。",
    beforeYouStart: [
      "配布URLを開いたら、画面右上にある「複製（Duplicate）」ボタンを押し、ご自身のNotionワークスペースへ取り込んでください。",
      "データベース本体（元のデータ）は削除せず、ホーム画面のビューから操作してください。",
    ],
    steps: [
      {
        stepNumber: 1,
        stepTitle: "配布ページ右上の『複製』ボタンを押して自分のNotionにコピーしよう",
        userMemo: "複製ボタンの場所を赤枠で強調。ログインが必要であることも書く。",
        screenLabel: "Notion 配布テンプレート公開画面",
        annotations: [
          { id: 1, xPercent: 76, yPercent: 18, type: "action", shortLabel: "① ここを押して複製" },
          { id: 2, xPercent: 30, yPercent: 62, type: "warning", shortLabel: "⚠️ ここは直接編集不可" },
        ],
        instructions: [
          "共有リンクを開いたら、画面右上のメニューにある[1]「複製（アイコン）」をクリックします。",
          "ご自身のNotionアカウントにログインすると、数秒でマイページにテンプレートがコピーされます。",
        ],
        proTip: "複製が完了したら、左サイドバーの「お気に入り（☆）」に登録しておくと毎朝ワンクリックで開けます。",
        caution: "共有元のページ（[2]のエリア）は閲覧専用のため、複製するまでは文字の入力ができません。",
      },
      {
        stepNumber: 2,
        stepTitle: "『新規案件を追加』ボタンからクライアント名と納期を登録しよう",
        userMemo: "ボタン機能を仕込んであるので、データベースを直接いじらずボタンを押させる。",
        screenLabel: "Notion ホームダッシュボード（案件管理ビュー）",
        annotations: [
          { id: 1, xPercent: 24, yPercent: 32, type: "action", shortLabel: "① 新規案件ボタン" },
          { id: 2, xPercent: 64, yPercent: 54, type: "action", shortLabel: "② ステータスと納期を選択" },
        ],
        instructions: [
          "ホーム画面左上にある青い[1]「＋ 新規案件を追加」ボタンをクリックします。",
          "自動で案件カードが立ち上がるので、[2]の「クライアント名」「受注金額」「納品予定日」を選択・入力します。",
        ],
        proTip: "ステータスを「請求済み」に変更すると、自動でトップページの「今月の確定売上」に加算されます！",
        caution: null,
      },
      {
        stepNumber: 3,
        stepTitle: "毎朝『今日のタスク』ボードを開いて進捗をドラッグ＆ドロップしよう",
        userMemo: "カンバンボードの使い方を初心者向けに解説。",
        screenLabel: "Notion タスク進捗カンバンボード",
        annotations: [
          { id: 1, xPercent: 25, yPercent: 52, type: "action", shortLabel: "① 未着手タスク" },
          { id: 2, xPercent: 72, yPercent: 52, type: "action", shortLabel: "② 完了へドラッグ" },
        ],
        instructions: [
          "画面下部の「タスク進行ボード」では、今日やるべき作業が[1]「未着手」の列に自動で並びます。",
          "作業が終わったら、カードを掴んで右側の[2]「完了」の列へドラッグ＆ドロップしてください。",
        ],
        proTip: "完了にしたタスクは翌日に自動で非表示になるフィルターを設定済みなので、画面が散らかりません。",
        caution: "ボード右上の「フィルター」設定を解除すると、過去の完了済みタスクがすべて表示されてしまうためご注意ください。",
      },
    ],
    faq: [
      {
        q: "Q. Notionの無料プランでもすべての機能が使えますか？",
        a: "A. はい、無料（フリー）プランのままで制限なくすべてのデータベース・自動化ボタン・集計ビューをお使いいただけます。",
      },
      {
        q: "Q. 誤って画面のレイアウトやデータベースを消してしまいました。",
        a: "A. Notion画面右上の「・・・」メニューから「ページ履歴」または「ゴミ箱」を開くと、過去30日以内の状態へワンクリックで復元できます。",
      },
    ],
  },
};

export default function Lp102() {
  const [selectedPreset, setSelectedPreset] = useState<TemplatePresetKey>("excel");
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [copiedSalesCopy, setCopiedSalesCopy] = useState<boolean>(false);

  const currentTemplate = DEMO_TEMPLATES[selectedPreset];
  const currentStep = currentTemplate.steps[activeStepIdx] || currentTemplate.steps[0];

  const scrollToRegister = () => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePresetSwitch = (key: TemplatePresetKey) => {
    setSelectedPreset(key);
    setActiveStepIdx(0);
    setCopiedSalesCopy(false);
  };

  const handleCopySalesPitch = () => {
    const text = `【初心者でも安心！図解入りPDF操作マニュアル付き】\n購入後すぐに使いこなせる全${currentTemplate.steps.length}ステップの図解ガイド（A4 PDF）を同梱しています。\n・${currentTemplate.steps.map((s) => s.stepTitle).join("\n・")}\n・よくある質問（FAQ）＆トラブル防止ガイド完備`;
    navigator.clipboard.writeText(text);
    setCopiedSalesCopy(true);
    setTimeout(() => setCopiedSalesCopy(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-400 selection:text-slate-950">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
              <BookOpen className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                Snap<span className="text-indigo-400">Manual</span> AI
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 sm:inline-block">
                図解PDF操作マニュアル自動生成
              </span>
            </div>
          </div>

          <button
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-400 sm:text-sm"
          >
            <span>先行公開の案内を受け取る</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_58%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-400" />
              <span className="text-balance">
                <span className="inline-block">Excel・Notion・業務テンプレを</span>
                <span className="inline-block">note / Tips / Gumroadで</span>
                <span className="inline-block">販売・配布するクリエイターへ</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.18] text-balance">
              <span className="inline-block">「テンプレート本体は</span>
              <span className="inline-block">完成したのに、</span>
              <span className="mt-1 block bg-gradient-to-r from-indigo-300 via-violet-300 to-amber-300 bg-clip-text text-transparent">
                <span className="inline-block">操作マニュアル作りが面倒で</span>
                <span className="inline-block">公開できない」</span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
              <span className="inline-block">完成した画面の<strong className="text-white">スクリーンショット</strong>と</span>{" "}
              <span className="inline-block"><strong className="text-white">一言メモ</strong>を放り込むだけ。</span>{" "}
              <span className="inline-block">マルチモーダルAIが画面内の</span>
              <span className="inline-block">「① ここに入力」「⚠️ 編集禁止セル」を自動検出し、</span>{" "}
              <span className="inline-block">初心者が迷わず使える</span>
              <span className="inline-block"><strong className="text-indigo-300">ステップバイステップ図解PDFマニュアル</strong>を</span>
              <span className="inline-block">最短3分で自動生成します。</span>
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={scrollToRegister}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-indigo-500/25 transition hover:brightness-110 sm:w-auto"
              >
                <span className="inline-block">先行リリース案内＆</span>
                <span className="inline-block">限定特典を受け取る</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <a
                href="#interactive-manual-demo"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 sm:w-auto"
              >
                <Eye className="h-4 w-4 text-indigo-400" />
                <span className="inline-block">スクショ→図解PDF変換</span>
                <span className="inline-block">サンプルを見る</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              ※買い切り 4,980円（税込）でリリース予定・月額課金なし・スマホからでも生成可能
            </p>
          </div>

          {/* 3-Step Visual Transformation Flow */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-indigo-500/15 px-2.5 py-1 text-xs font-extrabold text-indigo-300">
                  STEP 01
                </span>
                <UploadCloud className="h-4 w-4 text-indigo-400" />
              </div>
              <h3 className="text-sm font-bold text-white">スクショ＆1行メモを投げる</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                ExcelやNotionの画面キャプチャ（最大10枚）と「ここは触らせない」等の雑なメモをアップロード。
              </p>
            </div>

            <div className="rounded-2xl border border-violet-400/35 bg-slate-900/90 p-5 shadow-lg shadow-violet-500/5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-violet-500/15 px-2.5 py-1 text-xs font-extrabold text-violet-300">
                  STEP 02
                </span>
                <MousePointerClick className="h-4 w-4 text-violet-400" />
              </div>
              <h3 className="text-sm font-bold text-white">AIが注目座標にバッジ自動配置</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                画像内の操作箇所をAIが認識し「① 入力」「⚠️ 編集不可」バッジを自動描画。専門用語も噛み砕いて執筆。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-emerald-500/15 px-2.5 py-1 text-xs font-extrabold text-emerald-300">
                  STEP 03
                </span>
                <Download className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">A4最適化PDFを即ダウンロード</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                改ページ・余白が整ったA4縦PDFをワンクリック出力。noteやTipsの特典ファイルにそのまま同梱して即販売。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain & Empathy Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
              THE CREATOR&apos;S BOTTLENECK
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              こんな「公開直前の足踏み」で、
              <br />
              せっかくのテンプレート資産を寝かせていませんか？
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">本体は完成したのに何週間も放置</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                便利なExcel管理表やNotionテンプレ自体はもう完成しているのに、「使い方の説明書」を作る気が起きず公開が止まっている。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Canva・パワポでの図解作業で休日崩壊</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                スクショを撮って、1枚ずつ赤枠や番号バッジを配置し、初心者向けの解説文とレイアウトを整える単純作業だけで丸1日潰れる。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">説明書を省いてDM質問＆クレーム対応</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                簡易テキストだけで販売したら、「どこに入力すればいいか分からない」「数式を消して壊れた」と質問攻めに遭い消耗する。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-400/25 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-violet-950/30 p-6 sm:p-8">
            <p className="text-xs font-extrabold text-indigo-300">
              高単価で売れ続け、高評価レビューがつくクリエイターの共通点
            </p>
            <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">
              デジタル商品の満足度は「機能の多さ」ではなく「初心者が迷わない取扱説明書」で決まります
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              とはいえ、クリエイターが本来時間を使うべきなのは「新しい商品の開発」であり、退屈なマニュアルのレイアウト調整ではありません。
              <strong>スクショとメモを投げるだけの3分作業</strong>に置き換えて、今日中に商品をリリースしましょう。
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Core Experience Section: Screenshot + Memo -> Auto-Annotated A4 PDF Preview */}
      <section id="interactive-manual-demo" className="border-b border-slate-800/80 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-bold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>INTERACTIVE AI MANUAL PREVIEW</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              「スクショ＋一言メモ」が、図解入りA4マニュアルに変わる瞬間
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              テンプレートの種類（Excel / Notion）とステップを切り替えて、AIが自動配置する「注目バッジ」と「初心者向け解説文」のリアルな生成プレビューをご確認ください。
            </p>
          </div>

          {/* Template Switcher Tabs */}
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2.5">
            <button
              onClick={() => handlePresetSwitch("excel")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                selectedPreset === "excel"
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
              }`}
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>{DEMO_TEMPLATES.excel.label}</span>
            </button>

            <button
              onClick={() => handlePresetSwitch("notion")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                selectedPreset === "notion"
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700"
              }`}
            >
              <LayoutTemplate className="h-4 w-4" />
              <span>{DEMO_TEMPLATES.notion.label}</span>
            </button>
          </div>

          {/* Split Workspace: Left Input (Screenshots + Memos) -> Right Output (A4 PDF Document Preview) */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: Creator's Input (5 cols) */}
            <div className="space-y-4 lg:col-span-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-extrabold tracking-wider text-indigo-400 uppercase">
                    INPUT // クリエイターが渡す素材
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                    所要時間 約60秒
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-400">対象ツール：</span>
                    <span className="font-semibold text-white">{currentTemplate.toolName}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-400">想定読者：</span>
                    <span className="text-slate-200">{currentTemplate.targetAudience}</span>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2.5 text-xs font-bold text-slate-300">
                    アップロードしたスクショ＆一言メモ（クリックでプレビュー切替）
                  </div>
                  <div className="space-y-2.5">
                    {currentTemplate.steps.map((step, idx) => {
                      const isSelected = idx === activeStepIdx;
                      return (
                        <button
                          key={step.stepNumber}
                          onClick={() => setActiveStepIdx(idx)}
                          className={`w-full rounded-xl border p-3.5 text-left transition ${
                            isSelected
                              ? "border-indigo-400 bg-slate-800 shadow-md shadow-indigo-500/10"
                              : "border-slate-800 bg-slate-950/70 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`rounded px-2 py-0.5 text-[11px] font-extrabold ${
                                isSelected
                                  ? "bg-indigo-500 text-white"
                                  : "bg-slate-800 text-slate-300"
                              }`}
                            >
                              スクショ #{step.stepNumber}
                            </span>
                            <span className="text-[11px] text-slate-400">{step.screenLabel}</span>
                          </div>
                          <div className="mt-2 rounded-lg bg-slate-950/90 px-3 py-2 text-xs text-slate-300">
                            <span className="font-bold text-amber-300">メモ：</span>
                            「{step.userMemo}」
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bonus Sales Copy Generator Box */}
                <div className="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-300">
                      販売ページ用『マニュアル同梱アピール文』も自動生成
                    </span>
                    <button
                      onClick={handleCopySalesPitch}
                      className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-slate-900 px-2 py-1 text-[11px] font-bold text-emerald-300 hover:bg-slate-800"
                    >
                      {copiedSalesCopy ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>コピー完了</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>コピー</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-300">
                    noteやTipsの商品説明文にそのまま貼れる「初心者向け図解PDFガイド完備」の訴求テキストをワンタップで出力します。
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Auto-Generated A4 PDF Preview Mockup (7 cols) */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
                {/* PDF Viewer Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-rose-400" />
                    <span className="font-mono text-xs font-bold text-slate-200">
                      manual_guide_A4_print_ready.pdf
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
                      ✓ 注釈座標＆初心者解説 生成完了
                    </span>
                  </div>
                </div>

                {/* A4 Paper Sheet Simulation (White Paper Document UI) */}
                <div className="bg-slate-200 p-3 sm:p-6">
                  <div className="mx-auto max-w-2xl rounded-lg bg-white p-5 text-slate-900 shadow-xl sm:p-8">
                    {/* Document Cover / Header Strip */}
                    <div className="border-b-2 border-indigo-600 pb-4">
                      <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-indigo-600 uppercase">
                        <span>USER OPERATION MANUAL // {currentTemplate.toolName}</span>
                        <span>STEP {currentStep.stepNumber} / {currentTemplate.steps.length}</span>
                      </div>
                      <h3 className="mt-1.5 text-base font-extrabold leading-snug text-slate-900 sm:text-lg">
                        {currentTemplate.templateTitle}
                      </h3>
                      {activeStepIdx === 0 && (
                        <p className="mt-2 rounded-md bg-slate-100 p-2.5 text-[11px] leading-relaxed text-slate-600">
                          {currentTemplate.welcomeMessage}
                        </p>
                      )}
                    </div>

                    {/* Active Step Section */}
                    <div className="mt-5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-extrabold text-white">
                          {currentStep.stepNumber}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 sm:text-base">
                          {currentStep.stepTitle}
                        </h4>
                      </div>

                      {/* Simulated Screenshot Canvas with AI Auto-Annotated Badges */}
                      <div className="relative mt-4 overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-50 shadow-inner">
                        {/* Mock App Window Header inside Screenshot */}
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-3 py-1.5 text-[10px] font-semibold text-slate-500">
                          <span>{currentStep.screenLabel}</span>
                          <span>100% 表示</span>
                        </div>

                        {/* Code-Drawn Spreadsheet / Notion Mock UI */}
                        <div className="relative h-52 w-full bg-white p-4 sm:h-60">
                          {selectedPreset === "excel" ? (
                            <div className="grid h-full grid-cols-4 grid-rows-5 gap-1.5 text-[10px]">
                              <div className="col-span-4 flex items-center rounded bg-emerald-700 px-2.5 font-bold text-white">
                                A1: {currentStep.screenLabel}
                              </div>
                              <div className="flex items-center rounded bg-slate-100 px-2 font-bold text-slate-600">
                                項目ラベル
                              </div>
                              <div className="flex items-center rounded border-2 border-dashed border-amber-400 bg-amber-50 px-2 font-bold text-slate-800">
                                入力セル A
                              </div>
                              <div className="flex items-center rounded bg-slate-100 px-2 font-bold text-slate-600">
                                自動集計欄
                              </div>
                              <div className="flex items-center rounded bg-slate-200 px-2 font-mono text-slate-500">
                                =SUM(B2:B12)
                              </div>
                              <div className="flex items-center rounded bg-slate-100 px-2 font-bold text-slate-600">
                                ステータス
                              </div>
                              <div className="flex items-center rounded border-2 border-dashed border-amber-400 bg-amber-50 px-2 font-bold text-slate-800">
                                選択セル B
                              </div>
                              <div className="col-span-2 flex items-center rounded bg-slate-100 px-2 text-slate-400">
                                ※ グレー枠は関数保護エリア
                              </div>
                              <div className="col-span-4 rounded bg-slate-50 p-2 text-slate-400">
                                明細データ行（日付・勘定科目・税込金額・摘要メモ）...
                              </div>
                            </div>
                          ) : (
                            <div className="flex h-full flex-col justify-between text-[10px]">
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                <span className="font-extrabold text-slate-800">
                                  📁 {currentStep.screenLabel}
                                </span>
                                <span className="rounded bg-slate-200 px-2 py-0.5 font-bold text-slate-700">
                                  複製 / Duplicate
                                </span>
                              </div>
                              <div className="my-2 flex items-center gap-2">
                                <span className="rounded bg-blue-600 px-2.5 py-1 font-bold text-white">
                                  ＋ 新規案件を追加
                                </span>
                                <span className="rounded border border-slate-200 px-2 py-1 text-slate-500">
                                  フィルター: 進行中のみ
                                </span>
                              </div>
                              <div className="grid flex-1 grid-cols-3 gap-2">
                                <div className="rounded border border-slate-200 bg-slate-50 p-2">
                                  <div className="font-bold text-slate-700">未着手</div>
                                  <div className="mt-1 rounded bg-white p-1.5 shadow-sm">
                                    LPデザイン構成案
                                  </div>
                                </div>
                                <div className="rounded border border-slate-200 bg-slate-50 p-2">
                                  <div className="font-bold text-blue-600">進行中</div>
                                  <div className="mt-1 rounded bg-white p-1.5 shadow-sm">
                                    API実装・テスト
                                  </div>
                                </div>
                                <div className="rounded border border-slate-200 bg-slate-50 p-2">
                                  <div className="font-bold text-emerald-600">完了</div>
                                  <div className="mt-1 rounded bg-white p-1.5 shadow-sm">
                                    要件定義ヒアリング
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* AI Auto-Placed Callout Badges */}
                          {currentStep.annotations.map((pin) => (
                            <div
                              key={pin.id}
                              style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
                              className="absolute -translate-x-1/2 -translate-y-1/2"
                            >
                              <div
                                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold text-white shadow-lg ring-2 ring-white ${
                                  pin.type === "warning" ? "bg-rose-600" : "bg-indigo-600"
                                }`}
                              >
                                <span>{pin.shortLabel}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Step-by-Step Instructions List */}
                      <div className="mt-4 space-y-2">
                        {currentStep.instructions.map((line, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs leading-relaxed text-slate-800"
                          >
                            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded bg-indigo-100 text-[10px] font-extrabold text-indigo-700">
                              {i + 1}
                            </span>
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pro Tip & Caution Callouts */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-2.5 text-[11px] text-amber-950">
                          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                          <div>
                            <strong className="font-extrabold">ワンポイント：</strong>
                            {currentStep.proTip}
                          </div>
                        </div>

                        {currentStep.caution && (
                          <div className="flex items-start gap-2 rounded-lg border border-rose-300 bg-rose-50 p-2.5 text-[11px] text-rose-950">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                            <div>
                              <strong className="font-extrabold">事故防止の注意：</strong>
                              {currentStep.caution}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Step Pagination Controls inside PDF Preview */}
                      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3">
                        <span className="text-[10px] font-semibold text-slate-400">
                          ※ 巻末に「よくある質問（FAQ）」も自動生成されます
                        </span>
                        <div className="flex gap-1.5">
                          {currentTemplate.steps.map((s, idx) => (
                            <button
                              key={s.stepNumber}
                              onClick={() => setActiveStepIdx(idx)}
                              className={`rounded px-2.5 py-1 text-[11px] font-bold transition ${
                                idx === activeStepIdx
                                  ? "bg-indigo-600 text-white"
                                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                              }`}
                            >
                              Step {s.stepNumber}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
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
            <span className="text-xs font-bold tracking-wider text-indigo-400 uppercase">
              BEFORE & AFTER
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              Canva・パワポでの手作業と、SnapManual AIの圧倒的な差
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/25 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-extrabold">これまでの手作業マニュアル作成</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    スクショ撮影 → 画像トリミング → 赤枠・矢印の配置 → テキスト整形で<strong>1商品あたり3〜4時間</strong>が消える
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    作り手目線の専門用語（「VLOOKUP」「リレーション」等）を書いてしまい、初心者購入者が使いこなせず低評価になる
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    テンプレートをアップデートするたびに、マニュアルの図解とページ番号を手作業で作り直すのが苦痛
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-950 p-6 shadow-xl shadow-emerald-950/20">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-extrabold">SnapManual AI 導入後のリリース体験</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    スクショと一言メモをアップロードしてから<strong>最短3分でA4印刷最適化PDFが完成</strong>。休日を丸ごと開発に使える
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    「ここに入力」「編集禁止（数式保護）」のバッジと初心者向け噛み砕き解説が自動挿入され、<strong>購入後の質問DMが激減</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    買い切り型なので、これから量産するすべてのExcel・Notion・スプレッドシート商品に何度でも使い回せる
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & ROI Section */}
      <section className="border-b border-slate-800/80 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-400/15 px-2.5 py-1 text-xs font-bold text-indigo-300">
                  <Lock className="h-3.5 w-3.5" />
                  <span>月額サブスクなし・ずっと使える買い切りプラン</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  正式公開予定価格：買い切り 4,980円（税込）
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  これまで1本のマニュアル作成にかかっていた「休日の3〜4時間の図解作業」を丸ごと買い取れます。
                  <br className="hidden sm:inline" />
                  あなたが販売する<strong className="text-indigo-300">1,980円のテンプレートがたった3本売れるだけ</strong>で、このツールの代金は完全に回収できます。
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-center sm:min-w-[235px]">
                <span className="text-xs font-bold text-indigo-400">先行リリース記念特典</span>
                <div className="mt-1 text-lg font-extrabold text-white">クレーム・返金ゼロ</div>
                <div className="text-sm font-bold text-emerald-400">配布前最終チェックリスト</div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  共有権限ミス・数式ロック漏れを防ぐ公開前確認シートを無料付帯
                </p>
                <button
                  onClick={scrollToRegister}
                  className="mt-4 w-full rounded-xl bg-indigo-500 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-indigo-400"
                >
                  先行案内を受け取る →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="102"
            productName="SnapManual AI（スクショ＆メモから図解PDF操作マニュアル自動生成AI）"
            offerText="【先行登録者限定・優先案内】正式リリース（買い切り4,980円・無制限利用）の先行公開ご案内に加え、購入者のクレームと返金をゼロにする『Excel・Notionテンプレート配布前最終チェックリスト』を無料プレゼントします。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 SnapManual AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
