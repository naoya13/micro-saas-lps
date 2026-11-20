"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Search,
  Target,
  TrendingUp,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lock,
  Layers,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  BarChart3,
  Briefcase,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

interface NicheThemeDemo {
  rank: number;
  title: string;
  targetPersona: string;
  format: string;
  priceJpy: number;
  keywords: string[];
  demandReason: string;
  competitorGap: string;
  deliverables: string[];
  lpPreview: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    priceJustification: string;
  };
}

interface RolePreset {
  id: string;
  label: string;
  roleInput: string;
  skillsInput: string;
  achievementInput: string;
  marketPosition: string;
  themes: NicheThemeDemo[];
}

const ROLE_PRESETS: RolePreset[] = [
  {
    id: "cs",
    label: "BtoB SaaS CSマネージャー（5年）",
    roleInput: "BtoB SaaSのCSマネージャー 5年",
    skillsInput: "解約防止のオンボーディング設計、Notionでの顧客管理、ヘルススコア運用",
    achievementInput: "月次チャーンレートを3.0%から1.2%に改善、導入支援工数を半分に削減",
    marketPosition: "【急成長SaaSの1人目CS・オンボーディング立ち上げ実務家】領域",
    themes: [
      {
        rank: 1,
        title: "初月解約を半減させる「BtoBオンボーディング進捗管理Notionテンプレ」",
        targetPersona:
          "社員10〜30名規模のSaaS企業で、専任CSが1〜2名しかおらず導入支援が属人化しているCS担当者",
        format: "Notionテンプレート ＋ 導入キックオフ台本PDF",
        priceJpy: 6980,
        keywords: [
          "SaaS オンボーディング テンプレート",
          "CS 解約防止 チェックリスト",
          "顧客導入 管理 Notion",
        ],
        demandReason:
          "資金調達直後のスタートアップCSは「今月中に仕組みを作れ」と迫られており、ゼロから作る15時間を数千円でショートカットしたい緊急需要が強い。",
        competitorGap:
          "大手のCSコンサルは月額30万円〜と高額で、一般のNotionブログはタスク管理止まり。「BtoBの解約防止に特化した実務設計図」は競合不在。",
        deliverables: [
          "顧客共有用オンボーディング進捗ポータル（Notion）",
          "解約予兆を検知するヘルススコア判定シート",
          "キックオフMTGでそのまま使えるヒアリング台本",
        ],
        lpPreview: {
          eyebrow: "1人目CS・少人数チームで顧客の導入支援が回っていないSaaS担当者へ",
          headline:
            "「契約は増えているのに、導入1ヶ月目で次々と解約されていく」\nチャーンレートを3.0%→1.2%へ半減させた『BtoBオンボーディング完全設計Notion』",
          subheadline:
            "顧客に複製して渡すだけの専用進捗ポータルと、解約予兆アラート管理表をセット化。ゼロから仕組みを組む20時間の手間を今日中に終わらせます。",
          priceJustification:
            "月額30万円のCSコンサルを雇う必要はありません。たった1社の初月解約（ARPU 3万円）を防ぐだけで、このテンプレート代6,980円の4倍以上のリターンが確定します。",
        },
      },
      {
        rank: 2,
        title: "問い合わせ対応を半分にする「SaaS向けセルフ解決型ヘルプセンター構築キット」",
        targetPersona:
          "同じ操作質問へのチャット返信に毎日2時間を奪われているSaaSのサポート・CS担当",
        format: "Notion公開用FAQテンプレ ＋ 動画解説マニュアル作成手順書",
        priceJpy: 4980,
        keywords: [
          "SaaS FAQ 作り方",
          "ヘルプページ 構成案",
          "問い合わせ 削減 マニュアル",
        ],
        demandReason:
          "機能追加のたびにサポート工数が膨らみ、本来のアップセル施策に手が回らない現場の切実な痛みがある。",
        competitorGap:
          "高機能なヘルプデスクツールは月額数万円かかるが、Notionで即公開できる「読まれるFAQの情報設計テンプレ」は個人実務家ならではの隙間。",
        deliverables: [
          "検索されやすい階層設計済みNotionヘルプページ雛形",
          "機能リリース時に穴埋めするだけの操作ガイド執筆テンプレ",
          "問い合わせ分類＆削減効果測定スプレッドシート",
        ],
        lpPreview: {
          eyebrow: "毎日同じ「使い方の質問」へのチャット返信で1日が終わってしまうCS担当者へ",
          headline:
            "問い合わせ工数を50%削減した『読まれるSaaSヘルプセンター構築キット』",
          subheadline:
            "高額な専用ツールは不要。顧客が自分で検索して解決するNotionヘルプページの階層設計と、穴埋め式マニュアル雛形を丸ごと提供します。",
          priceJustification:
            "毎月40時間のチャット対応コスト（時給2,500円換算で月10万円）を半分に減らせれば、初月から10倍以上の投資回収になります。",
        },
      },
      {
        rank: 3,
        title: "更新率98%を実現する「四半期レビュー（QBR）提案スライド＆事前集計シート」",
        targetPersona:
          "契約更新前のクライアントに「導入効果」をうまく言語化できず値下げ・解約されるCS担当",
        format: "PowerPoint / Googleスライド構成雛形 ＋ 利用実績サマリー計算表",
        priceJpy: 7980,
        keywords: [
          "QBR 資料 テンプレート",
          "SaaS 更新率 改善",
          "カスタマーサクセス 提案書",
        ],
        demandReason:
          "更新1ヶ月前に「何の数字を見せて継続を納得させるか」で毎回資料作成に徹夜する担当者が多い。",
        competitorGap:
          "英語圏のQBRフレームワークは翻訳調で日本のBtoB商習慣に合わず、日本の現場でそのまま使えるスライド構成案は希少。",
        deliverables: [
          "経営層・決裁者が納得するQBRスライド15枚構成（PPTX/Googleスライド）",
          "利用ログからROI（費用対効果）を自動算出するシート",
          "活用が停滞している顧客向けの立て直し提案トークスクリプト",
        ],
        lpPreview: {
          eyebrow:
            "「結局、このツール入れていくら得したの？」と決裁者に聞かれて言葉に詰まるCSへ",
          headline:
            "更新率98%を達成した『BtoB向けQBR（四半期成果報告）提案スライド完全雛形』",
          subheadline:
            "利用データを入力するだけで導入効果を自動可視化するシートと、そのまま顧客へ提出できる15枚の提案スライド構成をセットで提供。",
          priceJustification:
            "1件の契約更新（年間数十万円）を守るための武器として、7,980円は経費精算レベルで即決できる投資です。",
        },
      },
    ],
  },
  {
    id: "dev",
    label: "受託・フリーランスWebエンジニア（6年）",
    roleInput: "フリーランスWebエンジニア（Next.js / Supabase）6年",
    skillsInput: "要件定義、見積もり作成、MVP高速開発、保守運用契約の設計",
    achievementInput:
      "炎上案件ゼロで単価を月50万から110万に引き上げ、仕様変更トラブルを撲滅",
    marketPosition: "【炎上ゼロ・高単価化を実現するフリーランス防衛＆見積もり設計】領域",
    themes: [
      {
        rank: 1,
        title: "タダ働き・無限仕様変更を防ぐ「Web受託開発・要件定義＆合意形成Notionパック」",
        targetPersona:
          "「これもついでに直して」の無償対応で疲弊し、納品後に検収がなかなか下りない個人エンジニア",
        format: "Notion要件定義書テンプレ ＋ 変更管理（追加見積もり）合意シート",
        priceJpy: 5980,
        keywords: [
          "Web開発 要件定義 テンプレート",
          "フリーランス 仕様変更 対策",
          "システム開発 見積もり 項目",
        ],
        demandReason:
          "開発スキルはあるのに、契約・要件定義の詰めが甘くて毎回赤字労働になるエンジニアの痛みが極めて深い。",
        competitorGap:
          "SIer向けの分厚いIPAドキュメントは個人開発に重すぎ、SNSの契約論は抽象的。個人〜小規模受託に最適化された実戦テンプレは競合が弱い。",
        deliverables: [
          "非エンジニア顧客と認識ズレをなくす画面・機能定義書（Notion）",
          "「ここから先は追加費用」と角を立てずに伝える境界線チェックリスト",
          "検収遅延を防ぐ納品完了条件（DoD）合意テンプレート",
        ],
        lpPreview: {
          eyebrow:
            "「ちょっとここ変えられます？」の無償対応で休日が消えている受託エンジニアへ",
          headline:
            "無限仕様変更と炎上をゼロにした『個人開発・受託向け要件定義＆防衛Notionパック』",
          subheadline:
            "開発前に顧客と合意すべき「やらないことリスト」と画面仕様書雛形を完全パッケージ化。そのまま複製して次の案件から即使用できます。",
          priceJustification:
            "無償の追加修正をたった3時間防ぐだけで5,980円以上の元が取れます。1案件あたり数十時間のタダ働きから今すぐ解放されてください。",
        },
      },
      {
        rank: 2,
        title: "開発単価を1.5倍にする「新規事業MVP開発・提案書＆工数見積もりExcel」",
        targetPersona:
          "クライアントの言い値で工数見積もりを出してしまい、いつも相場より安く買い叩かれるエンジニア",
        format: "自動工数・バッファ計算Excelシート ＋ 提案スライド構成案",
        priceJpy: 6980,
        keywords: [
          "MVP開発 見積もり 相場",
          "エンジニア 提案書 テンプレート",
          "システム開発 工数計算 Excel",
        ],
        demandReason:
          "実装工数だけ積み上げて提案し、ディレクションやテスト工数が抜けて利益が残らない悩みが絶えない。",
        competitorGap:
          "見積もりフォーマットの無料版は項目が粗く、非エンジニアの事業責任者に「なぜこの金額になるか」を納得させる提案ロジックまでセットの商品は少ない。",
        deliverables: [
          "リスクバッファ・テスト・環境構築を自動計上する見積もりExcel",
          "「安さ」ではなく「リリース速度と安全性」で選ばれる提案スライド構成",
          "初回ヒアリングで予算感を引き出す質問リスト15選",
        ],
        lpPreview: {
          eyebrow:
            "実装工数だけの見積もりを出してしまい、いつも利益が残らないフリーランス開発者へ",
          headline:
            "月単価50万→110万へ引き上げた『MVP開発・提案スライド＆自動工数見積もりシート』",
          subheadline:
            "クライアントが納得して高単価で発注する提案ロジックと、抜け漏れゼロの工数積算Excelをそのまま提供します。",
          priceJustification:
            "次の1案件の見積もりがたった1万円上がるだけで、このキットの投資額は全額回収できます。",
        },
      },
      {
        rank: 3,
        title:
          "納品後の月額ストック収益を作る「小規模Webアプリ保守運用契約＆障害対応マニュアル」",
        targetPersona:
          "単発の受託開発ばかりで、毎月ゼロから営業・案件探しをすることに不安を感じている個人開発者",
        format: "保守プランメニュー表 ＋ 障害切り分けフロー＆月次報告書テンプレ",
        priceJpy: 4980,
        keywords: [
          "Webシステム 保守運用 費用 相場",
          "フリーランス 保守契約 作り方",
          "個人開発 ストック収入",
        ],
        demandReason:
          "納品時に保守プランを提示できず、無料の問い合わせ窓口になってしまっているエンジニアが多い。",
        competitorGap:
          "法務的な契約書雛形はあっても、顧客が喜んで月額3〜5万円を払う「保守メニューの見せ方・範囲定義」をまとめた実務資料は希少。",
        deliverables: [
          "松竹梅3プラン構成の保守運用サービス提案メニュー表",
          "一次切り分けと緊急度判定を行う障害対応フローチャート",
          "顧客の継続満足度を高める月次稼働レポート自動雛形",
        ],
        lpPreview: {
          eyebrow:
            "納品したら収入が途絶え、次の案件探しに追われ続ける受託エンジニアへ",
          headline:
            "単発受託を月額ストックに変える『Webアプリ保守運用プラン設計＆運用キット』",
          subheadline:
            "顧客に断られにくい松竹梅の保守メニュー表と、最小工数で信頼を積み上げる月次レポート雛形をセットで公開。",
          priceJustification:
            "月額3万円の保守契約がたった1社決まるだけで、年間36万円の安定収益。4,980円の投資が70倍以上に化けます。",
        },
      },
    ],
  },
  {
    id: "hr",
    label: "スタートアップ人事・採用責任者（4年）",
    roleInput: "スタートアップ一人目人事・採用広報 4年",
    skillsInput:
      "エンジニア採用、スカウト文面作成、カジュアル面談設計、採用ATS運用",
    achievementInput:
      "広告費ゼロのダイレクトリクルーティングでエンジニア8名採用、スカウト返信率22%達成",
    marketPosition: "【採用費ゼロ・高返信率を実現するスタートアップ実践スカウト】領域",
    themes: [
      {
        rank: 1,
        title:
          "返信率22%を叩き出した「エンジニア特化・個別カスタマイズスカウト文面＆変数設計集」",
        targetPersona:
          "媒体費用を払って毎月100通スカウトを送っているのに返信率3%以下で採用ゼロのスタートアップ人事",
        format:
          "Notionスカウト文面データベース（30パターン）＋ GitHub/SNS読み解きチェックリスト",
        priceJpy: 5980,
        keywords: [
          "エンジニア スカウト 返信率 上げる",
          "ダイレクトリクルーティング 文面 例文",
          "スタートアップ 採用 苦戦",
        ],
        demandReason:
          "エージェント紹介料（1名150万〜200万円）を払えない企業が、自力スカウトの返信率改善に必死になっている。",
        competitorGap:
          "採用媒体の公式コラムは当たり障りのない例文ばかりで、現役エンジニアが「おっ、ちゃんと見てくれている」と返信する具体文面は実務家しか書けない。",
        deliverables: [
          "職種・志向別（フルスタック/PdM/SRE等）のスカウト文面30選",
          "候補者のGitHubや技術ブログから刺さる1文を3分で抜くリサーチ手順",
          "返信率・面談化率を改善するABテスト管理シート",
        ],
        lpPreview: {
          eyebrow:
            "毎月100通スカウトを送っても無視され続け、採用目標に追われている一人目人事へ",
          headline:
            "広告費ゼロでエンジニア8名を採用した『返信率22%の個別スカウト文面＆設計データベース』",
          subheadline:
            "コピペ感を消す「冒頭3行のパーソナライズ公式」と、職種別の実戦文面30パターンをNotionでそのまま提供します。",
          priceJustification:
            "人材紹介エージェントに1名分の紹介料（約180万円）を払うことを考えれば、5,980円で自社スカウトの返信率を劇的に引き上げる価値は計り知れません。",
        },
      },
      {
        rank: 2,
        title:
          "応募意欲を3倍に引き上げる「スタートアップ・カジュアル面談スライド＆逆質問設計シート」",
        targetPersona:
          "せっかくカジュアル面談を組めても、会社説明だけで終わり本選考への応募率が低い採用担当・CTO",
        format: "カジュアル面談ピッチ資料構成（12枚）＋ 候補者タイプ別トークスクリプト",
        priceJpy: 4980,
        keywords: [
          "カジュアル面談 資料 構成",
          "エンジニア 面談 応募率",
          "採用 ピッチ資料 作り方",
        ],
        demandReason:
          "知名度がないスタートアップにとって、面談での「口説き・魅力付け」が唯一の生命線だが型がない。",
        competitorGap:
          "大手企業の綺麗な会社紹介資料を真似して失敗するケースが多く、カオスな環境を魅力に変えるスタートアップ専用の面談設計は需要が高い。",
        deliverables: [
          "技術的負債や課題すら魅力に変える面談スライド12枚構成",
          "候補者の転職潜在層レベルを見極める質問リスト",
          "面談後24時間以内に送るフォローアップメール文面集",
        ],
        lpPreview: {
          eyebrow:
            "「いい話が聞けました」と丁寧にお礼されて、そのまま音信不通になるカジュアル面談へ",
          headline:
            "本選考への応募率を68%に引き上げた『スタートアップ・カジュアル面談設計キット』",
          subheadline:
            "一方的な会社説明を卒業し、候補者が「このチームで技術課題を解決したい」と自ら応募したくなる12枚の面談スライド構成と質問設計を公開。",
          priceJustification:
            "せっかく獲得した貴重なエンジニアとの面談機会を1件でも本選考へ繋げられれば、4,980円は一瞬で回収できます。",
        },
      },
      {
        rank: 3,
        title:
          "採用工数を月30時間削減する「Notion完結・応募者管理ATS＆面接官評価シート」",
        targetPersona:
          "スプレッドシートとSlackの連絡が散乱し、面接日程調整や評価回収で毎日残業している採用担当",
        format: "Notion採用管理テンプレート ＋ 面接官向け見極め評価ルーブリック",
        priceJpy: 4980,
        keywords: [
          "Notion 採用管理 テンプレート",
          "面接 評価シート 項目",
          "採用業務 効率化",
        ],
        demandReason:
          "高額なATS（採用管理システム）を導入する予算はないが、スプレッドシート管理が限界を迎えている。",
        competitorGap:
          "単なるカンバンボードではなく、現場のエンジニア面接官が5分で評価を入力できる「見極め基準表」まで統合されたテンプレは希少。",
        deliverables: [
          "選考ステータス・日程・申し送り事項を一元化するNotion ATS",
          "面接官の主観ブレを防ぐカルチャー・スキル評価ルーブリック",
          "内定承諾率を高めるオファー面談準備チェックリスト",
        ],
        lpPreview: {
          eyebrow:
            "スプレッドシートとSlackの転記作業で、本来の採用広報に手が回らない一人目人事へ",
          headline:
            "高額ATS不要！採用工数を月30時間削る『Notion採用管理＆面接官評価システム』",
          subheadline:
            "応募者管理から現場面接官の評価回収、オファー面談の申し送りまで、複製して5分で運用開始できるNotionテンプレートです。",
          priceJustification:
            "月額数万円の採用管理ツールを契約し続けるコストに比べ、買い切り4,980円でずっと使えるため年間数十万円のコスト削減になります。",
        },
      },
    ],
  },
];

export default function Lp104() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("cs");
  const [selectedRank, setSelectedRank] = useState<number>(1);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);

  const currentPreset =
    ROLE_PRESETS.find((p) => p.id === selectedPresetId) || ROLE_PRESETS[0];
  const currentTheme =
    currentPreset.themes.find((t) => t.rank === selectedRank) ||
    currentPreset.themes[0];

  const scrollToRegister = () => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCopySampleLp = () => {
    const sampleText = `# ${currentTheme.lpPreview.headline.replace("\n", " ")}\n\n${currentTheme.lpPreview.subheadline}\n\n## 収録コンテンツ\n${currentTheme.deliverables.map((d) => `- ${d}`).join("\n")}\n\n## 価格・投資回収根拠\n販売価格目安：${currentTheme.priceJpy.toLocaleString()}円\n${currentTheme.lpPreview.priceJustification}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(sampleText);
    }
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20">
              <Target className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                NICHE<span className="text-amber-400">FORGE</span>
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-amber-300 sm:inline-block">
                ニッチ商品テーマ抽出＆LP構成案AI
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-amber-500/20 transition hover:bg-amber-300 sm:text-sm"
          >
            <span>先行モニターに無料登録</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.13),_transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span className="text-balance">
                <span className="inline-block">本業の知見やスキルを</span>
                <span className="inline-block">デジタル商品にして売りたい</span>
                <span className="inline-block">個人開発者・会社員へ</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.18] text-balance">
              <span className="inline-block">「渾身のコンテンツを作ったのに、</span>
              <span className="inline-block">1円も売れない」</span>
              <span className="mt-2 block bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
                <span className="inline-block">その原因は、文章力ではなく</span>
                <span className="inline-block">『テーマ選び』で</span>
                <span className="inline-block">9割決まっています。</span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
              <span className="inline-block">あなたの<strong className="text-white">「本業の職種・スキル・過去の成果」</strong>を入力するだけ。</span>{" "}
              <span className="inline-block">「今実際に検索需要があり、競合が弱いニッチ商品テーマTOP10」と</span>{" "}
              <span className="inline-block">「そのまま公開できる売れるLP構成案」を</span>{" "}
              <span className="inline-block">データ根拠付きで自動設計する企画参謀AIです。</span>
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToRegister}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 px-7 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-amber-500/20 transition hover:brightness-110 sm:w-auto"
              >
                <span className="inline-block">先行リリース案内＆</span>
                <span className="inline-block">無料お試し枠に登録する</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <a
                href="#interactive-demo"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 sm:w-auto"
              >
                <Search className="h-4 w-4 text-amber-400" />
                <span className="inline-block">実際のAI抽出結果＆</span>
                <span className="inline-block">LP構成サンプルを見る</span>
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                汎用的なレッドオーシャン案を完全排除
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                検索意図・競合の空白・単価根拠まで可視化
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-amber-400" />
                買い切り 9,800円予定（月額課金なし）
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pain & Empathy Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase">
              WHY GREAT CONTENT FAILS TO SELL
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl text-balance">
              <span className="inline-block">こんな「売れないものを作る虚しさ」の中で</span>
              <br className="hidden sm:inline" />
              <span className="inline-block">手を動かしていませんか？</span>
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                土日を潰して作ったのに身内しか買わない
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                週末を削って1万字のnoteや便利なNotionテンプレートを仕上げたのに、公開してみたらスキが数件つくだけで売上はほぼゼロ。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                「無料情報で十分では？」と手が止まる
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                いざ書こうとしても「自分の経験なんて、すでにネットやYouTubeに無料記事が溢れている」と自信を失い、下書きのままお蔵入りする。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                ChatGPTに聞いても競合だらけの一般論
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                AIに「副業のネタを出して」と聞いても、「SNS運用のコツ」「AIプロンプト集」「時間管理術」など、有名発信者が独占しているレッドオーシャン案しか返ってこない。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-400/25 bg-gradient-to-r from-amber-950/35 via-slate-900 to-slate-900 p-6 sm:p-8">
            <h3 className="text-lg font-extrabold text-white sm:text-xl">
              売れない理由はシンプルです。「誰が・いつ・いくら払ってでも解決したいか」の検証前に作り始めているからです。
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              フォロワー数万人のインフルエンサーと正面から戦う必要はありません。個人のデジタル商品で勝つ唯一の方法は、大手が狙わない
              <strong>「超ニッチな実務の痛み（N=1）」</strong>
              をピンポイントで射抜き、あなたが本業で当たり前のように乗り越えた解決策を「そのまま使える成果物」として届けることです。
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Core Experience: Niche Theme Extractor & LP Blueprint Generator */}
      <section
        id="interactive-demo"
        className="border-b border-slate-800/80 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
              <Zap className="h-3.5 w-3.5" />
              <span>ACTUAL AI OUTPUT & INTERACTIVE PREVIEW</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              あなたの「本業の当たり前」が、
              <br className="hidden sm:inline" />
              4,980円〜7,980円のニッチ商品に変わる瞬間
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              職種プリセットを切り替えて、AIが抽出する「データ根拠付きニッチテーマ」と「そのまま公開できるLP構成案」のリアルな出力結果をご確認ください。
            </p>
          </div>

          {/* Preset Role Selector Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {ROLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setSelectedPresetId(preset.id);
                  setSelectedRank(1);
                }}
                className={`rounded-xl px-4 py-2.5 text-xs font-extrabold transition sm:text-sm ${
                  selectedPresetId === preset.id
                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20"
                    : "border border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Simulated 3-Screen App Workflow Container */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Step 1: Input Summary Card */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 lg:col-span-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-extrabold text-amber-400">
                  STEP 01 // 3項目入力（30秒）
                </span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                  ログイン不要
                </span>
              </div>

              <div className="mt-4 space-y-3.5 text-xs">
                <div>
                  <span className="block font-bold text-slate-400">
                    ① 本業の職種・経験年数
                  </span>
                  <div className="mt-1 rounded-xl border border-slate-800 bg-slate-950 p-3 font-semibold text-white">
                    {currentPreset.roleInput}
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-slate-400">
                    ② 得意なスキル・業務領域
                  </span>
                  <div className="mt-1 rounded-xl border border-slate-800 bg-slate-950 p-3 leading-relaxed text-slate-200">
                    {currentPreset.skillsInput}
                  </div>
                </div>

                <div>
                  <span className="block font-bold text-slate-400">
                    ③ 過去に出した具体的な成果・数字
                  </span>
                  <div className="mt-1 rounded-xl border border-slate-800 bg-slate-950 p-3 leading-relaxed text-emerald-300">
                    {currentPreset.achievementInput}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/10 p-3.5">
                <div className="text-[10px] font-bold text-amber-300">
                  AIが特定した勝ち筋ポジション
                </div>
                <div className="mt-1 text-xs font-extrabold text-white">
                  {currentPreset.marketPosition}
                </div>
              </div>
            </div>

            {/* Step 2: Top Themes List (1..3 Unlocked + 4..10 Locked Paywall Preview) */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 lg:col-span-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-extrabold text-amber-400">
                  STEP 02 // ニッチ商品テーマTOP10
                </span>
                <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  上位3件無料表示
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {currentPreset.themes.map((theme) => {
                  const isSelected = theme.rank === selectedRank;
                  return (
                    <button
                      key={theme.rank}
                      type="button"
                      onClick={() => setSelectedRank(theme.rank)}
                      className={`w-full rounded-2xl border p-3.5 text-left transition ${
                        isSelected
                          ? "border-amber-400 bg-slate-950 shadow-lg shadow-amber-500/10"
                          : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-extrabold ${
                            isSelected
                              ? "bg-amber-400 text-slate-950"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          第{theme.rank}位
                        </span>
                        <span className="font-mono text-xs font-extrabold text-emerald-400">
                          想定単価 {theme.priceJpy.toLocaleString()}円
                        </span>
                      </div>
                      <div className="mt-2 text-xs font-bold leading-snug text-white">
                        {theme.title}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                        <span>形式：{theme.format.split("＋")[0]}</span>
                        <span className="inline-flex items-center font-bold text-amber-400">
                          LP構成を見る <ChevronRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Locked Rank 4-10 Preview */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-3.5">
                  <div className="select-none blur-[3px] opacity-50">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold">
                        第4位〜第10位
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        単価 5,980円〜14,800円
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-bold text-white">
                      さらに7つの超ニッチ切り口＆検索クエリ根拠・LP構成案
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-slate-900 px-3 py-1 text-[11px] font-bold text-amber-300 shadow">
                      <Lock className="h-3 w-3" />
                      本製品版で4〜10位も全件解放
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Data Evidence & Ready-to-Publish LP Blueprint */}
            <div className="rounded-3xl border border-amber-400/35 bg-slate-900 p-5 shadow-2xl sm:p-6 lg:col-span-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-extrabold text-amber-400">
                  STEP 03 // データ根拠 ＆ LP構成案
                </span>
                <button
                  type="button"
                  onClick={handleCopySampleLp}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-[10px] font-bold text-slate-200 transition hover:border-amber-400"
                >
                  {copiedMarkdown ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">コピー済</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 text-amber-400" />
                      <span>Markdownコピー</span>
                    </>
                  )}
                </button>
              </div>

              {/* Data Evidence Block */}
              <div className="mt-4 space-y-2.5 rounded-2xl border border-slate-800 bg-slate-950 p-3.5 text-xs">
                <div className="flex items-center gap-1.5 font-extrabold text-amber-300">
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span>売れるデータ根拠（第{currentTheme.rank}位）</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400">
                    想定検索クエリ：
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {currentTheme.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center gap-1 rounded bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-sky-300"
                      >
                        <Search className="h-2.5 w-2.5 text-sky-400" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed text-slate-300">
                  <strong className="text-white">ターゲット像：</strong>
                  {currentTheme.targetPersona}
                </p>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  <strong className="text-white">需要の緊急性：</strong>
                  {currentTheme.demandReason}
                </p>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  <strong className="text-emerald-300">競合の空白：</strong>
                  {currentTheme.competitorGap}
                </p>
              </div>

              {/* Generated LP Copy Preview */}
              <div className="mt-3.5 space-y-2.5 rounded-2xl border border-amber-400/20 bg-slate-950/90 p-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white">
                    生成されたLP販売コピー案
                  </span>
                  <span className="rounded bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    note / Tips即貼付OK
                  </span>
                </div>

                <div className="rounded-lg bg-slate-900 p-2.5">
                  <div className="text-[10px] font-semibold text-amber-300">
                    {currentTheme.lpPreview.eyebrow}
                  </div>
                  <div className="mt-1 whitespace-pre-line text-xs font-extrabold leading-snug text-white">
                    {currentTheme.lpPreview.headline}
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                    {currentTheme.lpPreview.subheadline}
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-bold text-slate-400">
                    収録コンテンツ・目次案：
                  </div>
                  <ul className="mt-1 space-y-1 text-[11px] text-slate-200">
                    {currentTheme.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-[11px] leading-relaxed text-emerald-200">
                  <strong className="text-emerald-300">価格正当化ロジック：</strong>
                  {currentTheme.lpPreview.priceJustification}
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
              BEFORE & AFTER
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              「汎用AIへの丸投げ企画」と「NICHEFORGE」の決定的な違い
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Before */}
            <div className="rounded-2xl border border-rose-500/25 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-extrabold">
                  これまでの自己流・汎用チャットAI企画
                </span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    「初心者向けAI活用術」「仕事の生産性向上」など、競合だらけで980円でも売れないテーマを選んでしまう
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    抽象的なノウハウ記事ばかりになり、購入者が「明日の業務でそのまま使える成果物」に落とし込めない
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    中身を書き終えた後にセールスページ（LP）の書き方が分からず、結局売れないまま放置する
                  </span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-slate-950 p-6 shadow-xl shadow-amber-950/20">
              <div className="mb-4 flex items-center gap-2 text-amber-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-extrabold">
                  NICHEFORGE 導入後のデジタル商品開発
                </span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-amber-400">✓</span>
                  <span>
                    本業の実務実績から
                    <strong>
                      「検索需要があり大手・有名人が参入していないN=1のニッチテーマ」
                    </strong>
                    を10個発掘
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-amber-400">✓</span>
                  <span>
                    Notionテンプレ・計算Excel・台本PDFなど
                    <strong>
                      「4,980円〜19,800円で即決される具体的な商品パッケージ」
                    </strong>
                    まで自動設計
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-amber-400">✓</span>
                  <span>
                    公開前に
                    <strong>
                      「売れるLP構成案（ヘッドライン・目次・価格正当化ロジック）」
                    </strong>
                    が完成するため、勝ち筋が確定した状態で制作できる
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Offer & ROI Section */}
      <section className="border-b border-slate-800/80 py-16 sm:py-22">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-amber-400/35 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/25 p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-400/15 px-2.5 py-1 text-xs font-bold text-amber-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>月額課金なし・一度購入すればずっと使える買い切り型</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  正式公開予定価格：買い切り 9,800円（税込）
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  月額サブスクではありません。一度購入すれば、あなたの職種スキルや切り口を変えながら何度でも新規商品の企画・LP設計が可能です。
                  <br className="hidden sm:inline" />
                  このツールで見つけたニッチテーマで、
                  <strong className="text-amber-300">
                    3,000円の商品がたった4本売れるだけで元が取れます。
                  </strong>
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-center sm:min-w-[240px]">
                <span className="text-xs font-bold text-amber-400">
                  テスト販売・先行登録特典
                </span>
                <div className="mt-1 text-xl font-extrabold text-white">
                  先着30名様限定
                </div>
                <div className="text-sm font-bold text-emerald-400">
                  売れたLP実例テンプレ付帯
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                  実際に成約したデジタル商品のLP構成実例集（Notion版）を無料進呈
                </p>
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="mt-4 w-full rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300"
                >
                  先行登録枠に申し込む →
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-slate-800 pt-6 text-xs text-slate-300 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 shrink-0 text-amber-400" />
                <span>ニッチ商品テーマTOP10抽出（全件アンロック・無制限）</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>売れるLP構成案・完成原稿の自動生成＆Markdown出力</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" />
                <span>売れないテーマに何十時間も費やすリスクをゼロに</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Form Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="104"
            productName="NICHEFORGE（ニッチ商品テーマTOP10抽出＆売れるLP構成案生成AI）"
            offerText="【先行リリース記念・先着30名限定オファー】正式公開（買い切り9,800円）の優先ご案内に加え、実際に成約したデジタル商品の構成を穴埋め式にした『売れたデジタル商品のLP構成実例テンプレート（Notion版）』を無料付帯します。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 NICHEFORGE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
