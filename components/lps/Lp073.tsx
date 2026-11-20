"use client";

import React, { useState } from "react";
import {
  Moon,
  Sun,
  Coffee,
  Wine,
  Utensils,
  Smartphone,
  Flame,
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  TrendingDown,
  Award,
  Zap,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

type ScheduleType = "normal" | "dinner_party" | "late_work";
type BedtimeType = "23:30" | "24:00" | "24:30" | "01:00";

interface ActionItem {
  time: string;
  title: string;
  detail: string;
  targetCulprit: string;
}

interface HabitsState {
  lateDinner: boolean;
  alcoholHeavy: boolean;
  lateCaffeine: boolean;
  screenBeforeBed: boolean;
  bathOrExercise: boolean;
}

export default function Lp073() {
  const [selectedScore, setSelectedScore] = useState<number>(2);
  const [habits, setHabits] = useState<HabitsState>({
    lateDinner: true,
    alcoholHeavy: false,
    lateCaffeine: true,
    screenBeforeBed: true,
    bathOrExercise: false,
  });

  const [bedtime, setBedtime] = useState<BedtimeType>("24:00");
  const [schedule, setSchedule] = useState<ScheduleType>("dinner_party");

  const scrollToRegister = () => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleHabit = (key: keyof HabitsState) => {
    setHabits((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getDynamicCulprits = () => {
    const list = [
      {
        id: "lateDinner",
        name: "22時以降の遅い夕食",
        impact: habits.lateDinner ? "-1.45 pt" : "-1.15 pt",
        reason:
          "内臓の消化活動が深部体温の低下を妨げ、入眠後90分の黄金の深い睡眠を浅くしています。",
        active: habits.lateDinner,
      },
      {
        id: "lateCaffeine",
        name: "17時以降のカフェイン摂取",
        impact: habits.lateCaffeine ? "-1.10 pt" : "-0.85 pt",
        reason:
          "カフェインの半減期（約5〜7時間）により、就寝時も脳内のアデノシン受容体がブロックされています。",
        active: habits.lateCaffeine,
      },
      {
        id: "alcoholHeavy",
        name: "就寝3時間以内の飲酒（3杯以上）",
        impact: habits.alcoholHeavy ? "-1.60 pt" : "-0.95 pt",
        reason:
          "寝つきは良くなりますが、深夜のアルコール分解（アセトアルデヒド）による中途覚醒が急増します。",
        active: habits.alcoholHeavy,
      },
      {
        id: "screenBeforeBed",
        name: "ベッド内でのスマホ・PC作業",
        impact: habits.screenBeforeBed ? "-0.80 pt" : "-0.65 pt",
        reason:
          "ブルーライトと業務情報の脳内処理により交感神経が優位なまま入眠しています。",
        active: habits.screenBeforeBed,
      },
    ];

    return list
      .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1))
      .slice(0, 3);
  };

  const getReverseActions = (): ActionItem[] => {
    const hourMap: Record<BedtimeType, number> = {
      "23:30": 23.5,
      "24:00": 24,
      "24:30": 24.5,
      "01:00": 25,
    };
    const baseHour = hourMap[bedtime];

    const formatTime = (h: number) => {
      const normalized = h >= 24 ? h - 24 : h;
      const hh = String(Math.floor(normalized)).padStart(2, "0");
      const mm =
        normalized % 1 === 0.5 ? "30" : normalized % 1 === 0.25 ? "15" : "00";
      return `${hh}:${mm}`;
    };

    const caffeineDeadline = formatTime(baseHour - 8);
    const dinnerDeadline = formatTime(baseHour - 2.5);
    const screenOffTime = formatTime(baseHour - 0.75);

    if (schedule === "dinner_party") {
      return [
        {
          time: caffeineDeadline,
          title: "コーヒー・緑茶を完全ストップ",
          detail: `${bedtime}就寝から逆算したカフェイン限界ライン。以降は水かノンカフェイン茶へ。`,
          targetCulprit: "真犯人2位：遅いカフェイン対策",
        },
        {
          time: dinnerDeadline,
          title: "会食3杯目以降は炭酸水＋締め炭水化物カット",
          detail:
            "会食を断る必要はありません。血糖値スパイクと消化負担だけを防ぎ深い睡眠を守ります。",
          targetCulprit: "真犯人1位：遅い食事・深酒のダメージ軽減",
        },
        {
          time: screenOffTime,
          title: "帰宅後40℃のシャワー＋スマホを充電台へ",
          detail:
            "入浴は湯船に浸かりすぎず首元を温める程度にし、ベッドにスマホを持ち込まない。",
          targetCulprit: "真犯人3位：入眠直前の交感神経刺激ブロック",
        },
      ];
    }

    if (schedule === "late_work") {
      return [
        {
          time: "20:30",
          title: "残業前の「分食」でおにぎり・スープを先に摂る",
          detail:
            "22時以降のドカ食いを防ぐため、会議の合間に消化の良い軽食を済ませておく。",
          targetCulprit: "真犯人1位：22時以降の消化負担ブロック",
        },
        {
          time: formatTime(baseHour - 1),
          title: "PCのナイトシフト最大化＆タスク書き出し終了",
          detail:
            "未完了タスクを紙に3行書き出して脳のワーキングメモリを強制終了させる。",
          targetCulprit: "脳の覚醒・中途覚醒防止",
        },
        {
          time: formatTime(baseHour - 0.5),
          title: "白湯を1杯飲み、照明を間接照明のみに落とす",
          detail:
            "深部体温を一時的に上げてから急降下させ、最短15分での入眠スイッチを入れる。",
          targetCulprit: "入眠潜時の短縮",
        },
      ];
    }

    return [
      {
        time: caffeineDeadline,
        title: "本日のカフェイン摂取デッドライン",
        detail: `${bedtime}の入眠時に脳内残存量を最小化するため、これ以降はデカフェに切り替えます。`,
        targetCulprit: "真犯人2位：カフェイン残存ブロック",
      },
      {
        time: dinnerDeadline,
        title: "夕食完了タイムリミット（就寝2.5時間前）",
        detail:
          "この時刻までに食事を終えることで、あなたの翌朝目覚めスコアは平均+1.4pt向上します。",
        targetCulprit: "真犯人1位：22時以降の夕食ブロック",
      },
      {
        time: screenOffTime,
        title: "スマホをリビングに置き、目覚ましだけセット",
        detail:
          "寝る45分前にデジタル遮断。明朝10秒のタップ記録までスマホに触らない環境を作ります。",
        targetCulprit: "黄金の勝ちパターン再現",
      },
    ];
  };

  const culprits = getDynamicCulprits();
  const reverseActions = getReverseActions();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-400 selection:text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950 shadow-lg shadow-indigo-500/25">
              <Moon className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                Sleep<span className="text-cyan-400">Culprit</span> AI
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 sm:inline-block">
                10秒記録×逆算睡眠コーチ
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-cyan-500/20 transition hover:brightness-110 sm:px-5 sm:text-sm"
          >
            <span>先行リリース枠に無料登録</span>
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
                <span className="inline-block">7時間寝ているのに</span>
                <span className="inline-block">朝起きた瞬間から</span>
                <span className="inline-block">体が重いビジネスパーソンへ</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.18] text-balance">
              <span className="inline-block">スマートウォッチの</span>
              <span className="inline-block">スコアを見ても、</span>
              <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                <span className="inline-block">「結局どうすれば</span>
                <span className="inline-block">深く眠れるか」</span>
                <span className="inline-block">分からないあなたへ。</span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
              <span className="inline-block">ウェアラブル端末も、</span>
              <span className="inline-block">寝る前の面倒な日記も一切不要。</span>{" "}
              <span className="inline-block"><strong className="text-white">朝10秒のタップ記録</strong>だけで、</span>
              <span className="inline-block">あなたの睡眠の質を破壊している<strong className="text-cyan-300">「個人特有の真犯人」</strong>を統計特定。</span>{" "}
              <span className="inline-block">その日の予定と就寝時刻から</span>
              <span className="inline-block"><strong className="text-white">「今夜何時に何をすべきか3行動」</strong>を</span>
              <span className="inline-block">逆算通知するパーソナル睡眠コーチアプリです。</span>
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToRegister}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-7 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-indigo-500/25 transition hover:brightness-110 sm:w-auto"
              >
                <span className="inline-block">7日間無料で自分の</span>
                <span className="inline-block">「睡眠の真犯人」を特定する</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <a
                href="#interactive-simulator"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 sm:w-auto"
              >
                <Zap className="h-4 w-4 text-cyan-400" />
                <span>画面上で10秒記録＆逆算デモを試す</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              ※スマートウォッチ不要（スマホブラウザ即起動）・月額1,480円（1日約49円）・初月7日間完全無料トライアル付き
            </p>
          </div>

          {/* 3-Step Visual Cycle */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-amber-400/15 px-2.5 py-1 text-xs font-extrabold text-amber-300">
                  STEP 01 // 朝起きて10秒
                </span>
                <Sun className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="text-sm font-bold text-white">目覚めスコア＆前日行動タップ</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                5段階の目覚め実感と、夕食・飲酒・カフェイン・画面時間を親指だけでワンタップ記録。
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-400/30 bg-slate-900/90 p-5 shadow-lg shadow-cyan-500/5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-cyan-400/15 px-2.5 py-1 text-xs font-extrabold text-cyan-300">
                  STEP 02 // 統計×AI相関分析
                </span>
                <TrendingDown className="h-4 w-4 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white">あなた固有の「真犯人」を特定</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                「22時以降の夕食の翌朝は平均-1.4pt悪化」など、一般論ではないあなただけの弱点と勝ちパターンを数値化。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-indigo-400/15 px-2.5 py-1 text-xs font-extrabold text-indigo-300">
                  STEP 03 // 夕方〜夜の逆算通知
                </span>
                <Bell className="h-4 w-4 text-indigo-400" />
              </div>
              <h3 className="text-sm font-bold text-white">今夜やるべき「3行動」を指示</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                「24時就寝・会食あり」など今日の予定に合わせ、ダメージを最小化する3つの時刻付きアクションをプッシュ通知。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain & Core Insight Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
              WHY SLEEP ADVICE FAILS BUSY PROFESSIONALS
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              こんな「終わらない睡眠のモヤモヤ」を
              <br />
              抱えていませんか？
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">睡眠時間は確保しているのに泥のような疲労感</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                7時間寝たはずなのにアラームが鳴った瞬間から体が重く、午前中の重要な会議で頭がスッキリ回転しない。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">計測アプリは「結果」を教えるだけで行動が変わらない</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                スマートウォッチで「深い睡眠が短い」と表示されても、残業や会食がある中で「今夜何をどう変えればいいか」が分からない。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">一般的な睡眠ノウハウは全部守れず挫折する</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                「14時以降カフェイン禁止」「寝る2時間前スマホOFF」「毎日23時就寝」——全部やろうとして結局どれも続かない。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-400/25 bg-gradient-to-r from-indigo-950/50 via-slate-900 to-cyan-950/40 p-6 sm:p-8">
            <span className="text-xs font-extrabold text-cyan-300">
              睡眠の質が改善しない本当の理由
            </span>
            <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">
              睡眠を破壊する「真犯人」は、人によって全く異なります
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
              「少量の飲酒でも翌朝ボロボロになる人」もいれば、「お酒よりも21時以降の食事が致命傷になる人」「16時のコーヒー1杯が原因の人」もいます。
              世の中の一般論を10個守る必要はありません。
              <strong>あなた自身のデータで「一番効く1つの真犯人」を特定し、今夜の予定から逆算して最小限の3行動だけを変えること。</strong>
              これが忙しい実務家が最短で朝スッキリ目覚める唯一の方法です。
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Core Experience Simulator */}
      <section id="interactive-simulator" className="border-b border-slate-800/80 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
              <Zap className="h-3.5 w-3.5" />
              <span>LIVE INTERACTIVE PROTOTYPE</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              「朝の10秒タップ」と「夜の逆算3行動」を画面上で体験
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              左のスマホ画面で前日の行動をタップし、右側の「今夜の就寝時刻・予定」を切り替えてみてください。AIがあなたの真犯人と今夜の逆算スケジュールをリアルタイム生成します。
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Phone Mockup: Morning 10-sec Tap Screen */}
            <div className="lg:col-span-5">
              <div className="mx-auto max-w-[380px] rounded-[2.25rem] border-[5px] border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-indigo-950/40">
                <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-extrabold text-white">朝の10秒タップ記録</span>
                  </div>
                  <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                    所要時間: 約8秒
                  </span>
                </div>

                {/* Step 1: Wake-up Score */}
                <div>
                  <label className="text-xs font-bold text-slate-300">
                    1. 今朝の目覚めスコアは？
                  </label>
                  <div className="mt-2 grid grid-cols-5 gap-1.5">
                    {[
                      { score: 1, label: "泥重" },
                      { score: 2, label: "眠気" },
                      { score: 3, label: "普通" },
                      { score: 4, label: "快調" },
                      { score: 5, label: "最高" },
                    ].map((item) => {
                      const active = selectedScore === item.score;
                      return (
                        <button
                          key={item.score}
                          type="button"
                          onClick={() => setSelectedScore(item.score)}
                          className={`flex flex-col items-center rounded-xl border py-2.5 transition ${
                            active
                              ? "border-cyan-400 bg-cyan-400/20 text-white shadow-md shadow-cyan-500/10"
                              : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <span className="text-sm font-extrabold">{item.score}</span>
                          <span className="mt-0.5 text-[10px]">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Yesterday's Habit Toggles */}
                <div className="mt-5">
                  <label className="text-xs font-bold text-slate-300">
                    2. 前日の行動（当てはまるものをタップ）
                  </label>
                  <div className="mt-2.5 space-y-2">
                    {[
                      {
                        key: "lateDinner" as const,
                        icon: Utensils,
                        label: "夕食が22時以降だった",
                      },
                      {
                        key: "lateCaffeine" as const,
                        icon: Coffee,
                        label: "17時以降にカフェインを摂った",
                      },
                      {
                        key: "alcoholHeavy" as const,
                        icon: Wine,
                        label: "飲酒3杯以上（深酒）をした",
                      },
                      {
                        key: "screenBeforeBed" as const,
                        icon: Smartphone,
                        label: "寝る直前までスマホ・PCを見た",
                      },
                      {
                        key: "bathOrExercise" as const,
                        icon: Flame,
                        label: "湯船に浸かった／運動をした",
                      },
                    ].map((habit) => {
                      const Icon = habit.icon;
                      const isOn = habits[habit.key];
                      return (
                        <button
                          key={habit.key}
                          type="button"
                          onClick={() => toggleHabit(habit.key)}
                          className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition ${
                            isOn
                              ? habit.key === "bathOrExercise"
                                ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-200"
                                : "border-rose-400/60 bg-rose-500/15 text-rose-200"
                              : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{habit.label}</span>
                          </span>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                              isOn
                                ? habit.key === "bathOrExercise"
                                  ? "bg-emerald-400 text-slate-950"
                                  : "bg-rose-400 text-slate-950"
                                : "bg-slate-800 text-slate-500"
                            }`}
                          >
                            {isOn ? "該当" : "なし"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 p-3 text-center text-xs font-extrabold text-slate-950">
                  ✓ 今朝スコア「{selectedScore}/5」記録完了！右側に即反映中
                </div>
              </div>
            </div>

            {/* Right Column: AI Culprit Report + Tonight's 3 Reverse Actions */}
            <div className="space-y-6 lg:col-span-7">
              {/* Card 1: Personal Culprit Ranking */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-rose-400" />
                    <h3 className="text-base font-extrabold text-white">
                      あなたの睡眠破壊「真犯人」ランキング（直近30日相関）
                    </h3>
                  </div>
                  <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-[11px] font-bold text-indigo-300">
                    個人統計データ分析
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {culprits.map((c, idx) => (
                    <div
                      key={c.id}
                      className={`rounded-xl border p-3.5 transition ${
                        idx === 0
                          ? "border-rose-500/40 bg-rose-950/20"
                          : "border-slate-800 bg-slate-950/70"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-extrabold ${
                              idx === 0
                                ? "bg-rose-500 text-white"
                                : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {idx + 1}位
                          </span>
                          <span className="text-sm font-bold text-white">{c.name}</span>
                        </div>
                        <span className="font-mono text-xs font-extrabold text-rose-400">
                          翌朝スコア {c.impact}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{c.reason}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-200">
                  <Award className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>
                    <strong>あなたの黄金の勝ちパターン：</strong>
                    「21時前の夕食 × 湯船入浴」の翌朝は目覚めスコア4以上達成率 <strong>88%</strong>
                  </span>
                </div>
              </div>

              {/* Card 2: Tonight's Reverse-Engineered 3 Actions */}
              <div className="rounded-2xl border border-cyan-400/35 bg-slate-900/95 p-5 shadow-xl shadow-cyan-950/20 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-base font-extrabold text-white">
                      今夜やるべき「3つの逆算行動」自動指示
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-300">
                    各時刻の10分前にプッシュ通知
                  </span>
                </div>

                {/* Tonight Schedule Controls */}
                <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3.5 sm:grid-cols-2">
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400">
                      今夜の就寝ターゲット時刻
                    </span>
                    <div className="mt-1.5 grid grid-cols-4 gap-1">
                      {(["23:30", "24:00", "24:30", "01:00"] as BedtimeType[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBedtime(t)}
                          className={`rounded-lg py-1.5 font-mono text-xs font-bold transition ${
                            bedtime === t
                              ? "bg-cyan-400 text-slate-950"
                              : "bg-slate-900 text-slate-400 hover:text-white"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[11px] font-bold text-slate-400">
                      今夜の予定（ハームリダクション調整）
                    </span>
                    <div className="mt-1.5 grid grid-cols-3 gap-1">
                      {[
                        { id: "normal" as const, label: "通常" },
                        { id: "dinner_party" as const, label: "会食あり" },
                        { id: "late_work" as const, label: "深夜残業" },
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSchedule(s.id)}
                          className={`rounded-lg py-1.5 text-xs font-bold transition ${
                            schedule === s.id
                              ? "bg-indigo-500 text-white"
                              : "bg-slate-900 text-slate-400 hover:text-white"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3 Reverse-Engineered Timeline Items */}
                <div className="mt-4 space-y-3">
                  {reverseActions.map((act, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3.5 rounded-xl border border-slate-800 bg-slate-950/90 p-3.5"
                    >
                      <div className="shrink-0 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1.5 text-center">
                        <span className="block text-[9px] font-bold text-cyan-300">逆算時刻</span>
                        <span className="font-mono text-sm font-extrabold text-white">
                          {act.time}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{act.title}</h4>
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                            {act.targetCulprit}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-300">{act.detail}</p>
                      </div>
                    </div>
                  ))}
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
              WHY NOT SMARTWATCHES?
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              高価なスマートウォッチ・睡眠計測アプリとの決定的な違い
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Before */}
            <div className="rounded-2xl border border-rose-500/25 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-extrabold">従来の睡眠トラッカー・一般ノウハウ</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    「レム睡眠が何分・睡眠スコア68点」と過去の結果を見るだけで、
                    <strong>今夜どう行動を変えればいいか分からない</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    腕時計をつけたまま寝る違和感や、数日ごとの充電切れで結局使わなくなる（端末代3〜5万円がムダに）
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    「会食の日にお酒を飲むな」「22時に寝ろ」といったビジネスパーソンの現実に合わない精神論ばかり
                  </span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-b from-indigo-950/30 to-slate-950 p-6 shadow-xl shadow-indigo-950/20">
              <div className="mb-4 flex items-center gap-2 text-cyan-300">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-extrabold">SleepCulprit AI（本プロダクト）</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-cyan-400">✓</span>
                  <span>
                    あなたのデータから
                    <strong>「一番睡眠を壊している1つの真犯人」</strong>
                    を統計特定し、ピンポイントで対策
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-cyan-400">✓</span>
                  <span>
                    ウェアラブル端末ゼロ。<strong>朝10秒のワンタップ記録</strong>
                    だけだから、忙しい平日でも無理なく続く
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-cyan-400">✓</span>
                  <span>
                    「会食あり・24時就寝」などその日の予定を前提に、
                    <strong>ダメージを最小化する逆算3行動</strong>を通知指示
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Offer & Pricing Logic Section */}
      <section className="border-b border-slate-800/80 py-16 sm:py-22">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-indigo-400/35 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-cyan-400/15 px-2.5 py-1 text-xs font-bold text-cyan-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>初月7日間完全無料トライアル・いつでもワンタップ解約</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  パーソナルプラン：月額 1,480円（税込）
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  眠気覚ましのエナジードリンクやコンビニコーヒーを毎日買うコスト（月4,500〜6,000円）の
                  <strong className="text-cyan-300">わずか3分の1、1日あたり約49円</strong>です。
                  <br className="hidden sm:inline" />
                  何万円もするスマートウォッチや高級寝具を買う前に、まずは7日間の無料体験で「自分自身の行動の真犯人」を特定してください。
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/95 p-5 text-center sm:min-w-[230px]">
                <span className="text-xs font-bold text-cyan-400">先行リリース登録特典</span>
                <div className="mt-1 text-2xl font-extrabold text-white">初月 7日間無料</div>
                <div className="mt-0.5 text-xs font-bold text-emerald-400">
                  ＋ 業種別・睡眠リカバリー設計図付
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  1週間の記録であなたの悪化要因レポートを無料生成
                </p>
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:brightness-110"
                >
                  先行案内を受け取る →
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                <span>毎日の10秒タップ記録・全行動ログ無制限</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                <span>個人特有の真犯人ランキング＆勝ちパターン分析</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                <span>毎晩の予定から逆算する「3行動」自動プッシュ通知</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="073"
            productName="SleepCulprit AI（朝の10秒タップで睡眠の真犯人を特定＆逆算指示する睡眠コーチ）"
            offerText="【先行登録者限定・優先招待オファー】正式公開時の7日間無料トライアル優先案内（月額1,480円プラン）に加え、会食・深夜残業がある日でも翌朝のパフォーマンスを落とさない「ビジネスパーソン専用・睡眠ダメージ最小化プロトコルPDF」を無料でお送りします。"
          />
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 SleepCulprit AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
