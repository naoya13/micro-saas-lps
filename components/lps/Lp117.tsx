"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Wind,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Volume2,
  VolumeX,
  Smartphone,
  FileText,
  Clock,
  ShieldCheck,
  Sparkles,
  Play,
  Square,
  HeartPulse,
  Brain,
  Award,
  Vibrate,
} from "lucide-react";
import { PreRegisterForm } from "@/components/common/PreRegisterForm";

type DemoPhase = 1 | 2 | 3;

interface BreathState {
  label: string;
  count: string;
  scale: string;
  ringColor: string;
  bgGradient: string;
  vibeText: string;
}

const LOG_OPTIONS: readonly string[] = [
  "◎ 落ち着いて結論から話せた",
  "◯ 緊張したが3行骨子は伝えきった",
  "△ 次回は3分前から呼吸を始める",
];

export default function Lp117() {
  const [activePhase, setActivePhase] = useState<DemoPhase>(2);
  const [conclusion, setConclusion] = useState<string>(
    "今月の新規商談KPIは予定通り105%で着地見込みです"
  );
  const [evidence, setEvidence] = useState<string>(
    "先週実施したウェビナー経由の有効リードが前月比1.4倍に増加したため"
  );
  const [nextAction, setNextAction] = useState<string>(
    "来週火曜までにA社・B社の最終提案書を提出しクロージングに入ります"
  );

  // Interactive 4-7-8 Breathing Demo State
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [cycleSec, setCycleSec] = useState<number>(0); // 0..18 (4s inhale, 7s hold, 8s exhale)
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [selectedLog, setSelectedLog] = useState<string>(
    "◎ 落ち着いて結論から話せた"
  );

  useEffect(() => {
    if (!isBreathing) return;
    const interval = window.setInterval(() => {
      setCycleSec((prev) => (prev + 1) % 19);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isBreathing]);

  const getBreathState = (): BreathState => {
    if (!isBreathing) {
      return {
        label: "タップで3分前デモ開始",
        count: "4-7-8",
        scale: "scale-100",
        ringColor: "border-sky-400/50",
        bgGradient: "from-sky-500/30 to-cyan-500/10",
        vibeText: "待機中",
      };
    }
    if (cycleSec < 4) {
      return {
        label: "鼻からゆっくり吸う",
        count: `${4 - cycleSec}`,
        scale: "scale-125",
        ringColor: "border-sky-400",
        bgGradient: "from-sky-400/40 to-blue-500/20",
        vibeText: "ブブッ（1回振動・吸気合図）",
      };
    }
    if (cycleSec < 11) {
      return {
        label: "息を止めてキープ",
        count: `${11 - cycleSec}`,
        scale: "scale-125",
        ringColor: "border-indigo-400",
        bgGradient: "from-indigo-400/40 to-purple-500/20",
        vibeText: "ブッ・ブッ（2回短振動・静止合図）",
      };
    }
    return {
      label: "口から細く長く吐く",
      count: `${19 - cycleSec}`,
      scale: "scale-90",
      ringColor: "border-emerald-400",
      bgGradient: "from-emerald-400/40 to-teal-500/20",
      vibeText: "ブーー（長振動・副交感神経スイッチ）",
    };
  };

  const breathState = getBreathState();

  const scrollToRegister = (): void => {
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePhaseChange = (phase: DemoPhase): void => {
    setActivePhase(phase);
    if (phase !== 2 && isBreathing) {
      setIsBreathing(false);
      setCycleSec(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-400 selection:text-slate-950">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 text-slate-950 shadow-lg shadow-sky-500/20">
              <Wind className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white">
                CALM<span className="text-sky-400">3</span>
              </span>
              <span className="ml-2 hidden rounded bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-sky-300 sm:inline-block">
                本番3分前の緊張コントロール
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToRegister}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-400 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-sky-400/20 transition hover:bg-sky-300 sm:text-sm"
          >
            <span>先行公開の案内を受け取る</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800/80 pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_58%)]" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs font-semibold text-sky-300">
              <HeartPulse className="h-3.5 w-3.5 shrink-0 text-sky-400" />
              <span className="text-balance">
                <span className="inline-block">全体会議や定例報告で、</span>
                <span className="inline-block">自分の順番が近づくと</span>
                <span className="inline-block">脈が速くなるビジネスパーソンへ</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.18] text-balance">
              <span className="inline-block">「準備は完璧だったのに、</span>
              <span className="inline-block">本番で声が震えて</span>
              <span className="inline-block">頭が真っ白になる」</span>
              <span className="mt-2 block bg-gradient-to-r from-sky-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                <span className="inline-block">会議3分前の</span>
                <span className="inline-block">『3行骨子×4-7-8呼吸』で</span>
                <span className="inline-block">強制鎮静化する。</span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg text-pretty">
              <span className="inline-block">報告30分前の<strong className="text-white">「3行骨子メモ」</strong>でワーキングメモリを解放し、</span>{" "}
              <span className="inline-block">開始3分前の<strong className="text-white">「振動＆音ガイド付き4-7-8呼吸法」</strong>で</span>
              <span className="inline-block">副交感神経を優位に切り替え。</span>{" "}
              <span className="inline-block">デスクの下でスマホを握ったままでも、</span>
              <span className="inline-block">誰にも気づかれずに心拍数を落ち着かせ、</span>
              <span className="inline-block">準備した通りに話せる直前コントロールアプリです。</span>
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={scrollToRegister}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-emerald-400 px-7 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-sky-500/20 transition hover:brightness-110 sm:w-auto"
              >
                <span className="inline-block">テスト公開の優先案内・</span>
                <span className="inline-block">限定特典を受け取る</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
              <a
                href="#live-simulator"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 sm:w-auto"
              >
                <Play className="h-4 w-4 text-sky-400" />
                <span className="inline-block">画面上で3分前呼吸＆</span>
                <span className="inline-block">カンペを試す</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              ※買い切り 1,480円（税込）でリリース予定・月額課金なし・アプリインストール不要（ブラウザ即起動）
            </p>
          </div>

          {/* 3-Phase Timeline Bar */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-sky-400/15 px-2.5 py-1 text-xs font-extrabold text-sky-300">
                  報告 30分前
                </span>
                <FileText className="h-4 w-4 text-sky-400" />
              </div>
              <h3 className="text-sm font-bold text-white">① 3行骨子メモ（1分整理）</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                「結論・根拠・次のアクション」の3行だけを入力。脳の記憶容量を空け、本番中のカンペとして固定表示。
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/30 bg-slate-900/90 p-5 shadow-lg shadow-emerald-500/5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-emerald-400/15 px-2.5 py-1 text-xs font-extrabold text-emerald-300">
                  報告 3分前
                </span>
                <Wind className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white">② 4-7-8 呼吸リズムガイド</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                「4秒吸う・7秒止める・8秒吐く」を振動と微細音で誘導。机の下でスマホを握りながら強制的に心拍を鎮静。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="rounded-md bg-indigo-400/15 px-2.5 py-1 text-xs font-extrabold text-indigo-300">
                  報告 終了後
                </span>
                <Award className="h-4 w-4 text-indigo-400" />
              </div>
              <h3 className="text-sm font-bold text-white">③ 1タップ成功記録</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                終わった瞬間の手応えを1タップ保存。自己嫌悪の記憶を「コントロールできた実績」に上書きします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Empathy & Physiological Mechanism Section */}
      <section className="border-b border-slate-800/80 bg-slate-900/40 py-16 sm:py-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-wider text-sky-400 uppercase">
              WHY YOU FREEZE BEFORE SPEAKING
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl text-balance">
              <span className="inline-block">毎週の会議で、こんな「もったいない自己嫌悪」を</span>
              <br className="hidden sm:inline" />
              <span className="inline-block">繰り返していませんか？</span>
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">順番が近づくと脈が跳ね上がる</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                前の人の報告が終わりに近づくにつれ、心臓がドクドクと速くなり、手足が冷たくなって呼吸が浅くなる。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">早口になり一番言いたい結論が抜ける</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                「落ち着け」と頭で言い聞かせるほど焦りが増し、用意していたはずの数字や論点が頭からすっぽり抜け落ちる。
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">会議後「なぜうまく話せなかった」と引きずる</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                内容は悪くないはずなのに、しどろもどろになった悔しさで1日中自己嫌悪に陥り、次の会議も怖くなる。
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-sky-400/25 bg-gradient-to-r from-sky-950/40 via-slate-900 to-emerald-950/30 p-6 sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-xs font-extrabold text-sky-300">
                  メンタルの弱さではなく「生理学的なエラー」です
                </span>
                <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">
                  交感神経が暴走すると、脳のワーキングメモリが一時停止します
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  緊張状態で「話す内容を頭の中で思い出そう」とするほど脳はパニックを起こします。
                  必要なのは気合いではなく、<strong>① 話す軸を3行だけ画面に逃がすこと（外部化）</strong>と、
                  <strong>② 吐く息を吸う息の2倍にする呼吸リズムで迷走神経を刺激し、心拍を物理的に下げること</strong>の同時実行です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Smartphone App Simulator Section */}
      <section id="live-simulator" className="border-b border-slate-800/80 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
              <Smartphone className="h-3.5 w-3.5" />
              <span>LIVE INTERACTIVE DEMO</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              実際のスマホ画面・4-7-8呼吸ガイドを体験
            </h2>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              右側のスマホUIは実際に操作できます。骨子を書き換えて「3分前:呼吸」タブでスタートボタンを押し、呼吸サークルのリズムを体験してください。
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Explanation Column */}
            <div className="space-y-4 lg:col-span-6">
              <button
                type="button"
                onClick={() => handlePhaseChange(1)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  activePhase === 1
                    ? "border-sky-400 bg-slate-900 shadow-lg shadow-sky-500/10"
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-sky-400">PHASE 01 // 報告30分前</span>
                  <span className="text-xs text-slate-400">所要時間：60秒</span>
                </div>
                <h3 className="mt-1 text-base font-bold text-white">
                  迷いを断ち切る「3行骨子メモ」
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  「結論・根拠・次のアクション」の3行だけを入力。入力した瞬間に直前モードの画面上部へ大きく固定され、本番中のカンペとして機能します。
                </p>
              </button>

              <button
                type="button"
                onClick={() => handlePhaseChange(2)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  activePhase === 2
                    ? "border-emerald-400 bg-slate-900 shadow-lg shadow-emerald-500/10"
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-400">
                    PHASE 02 // 報告3分前（コア体験）
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                    <Vibrate className="h-3.5 w-3.5" /> 振動＆音シンクロ
                  </span>
                </div>
                <h3 className="mt-1 text-base font-bold text-white">
                  見なくてもリズムが分かる「4-7-8呼吸ガイド」
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  吸う(4秒)・止める(7秒)・吐く(8秒)の切り替わりタイミングでスマホが微細に振動。会議室で画面を見つめ続けなくても、ポケットや手元でリズムを同期できます。
                </p>
              </button>

              <button
                type="button"
                onClick={() => handlePhaseChange(3)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  activePhase === 3
                    ? "border-indigo-400 bg-slate-900 shadow-lg shadow-indigo-500/10"
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-400">PHASE 03 // 報告終了後</span>
                  <span className="text-xs text-slate-400">所要時間：1秒</span>
                </div>
                <h3 className="mt-1 text-base font-bold text-white">
                  自己嫌悪を防ぐ「1タップ完了ログ」
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                  報告が終わった直後に3択から1タップで記録。「緊張しても乗り切れた」事実を積み上げ、次回の予期不安を和らげます。
                </p>
              </button>
            </div>

            {/* Right Interactive Phone Mockup */}
            <div className="flex justify-center lg:col-span-6">
              <div className="w-full max-w-[380px] rounded-[2.5rem] border-[6px] border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-sky-950/40">
                {/* Phone Notch / Status Bar */}
                <div className="mb-3 flex items-center justify-between px-3 pt-1 text-[11px] font-semibold text-slate-400">
                  <span>09:57</span>
                  <div className="h-4 w-24 rounded-full bg-slate-900" />
                  <span>5G 100%</span>
                </div>

                {/* App Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <span className="text-xs font-extrabold tracking-wider text-sky-400">
                    CALM3 // 直前制御
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    完了実績: 12回
                  </span>
                </div>

                {/* 3-Phase Switcher Tabs */}
                <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-slate-900 p-1">
                  <button
                    type="button"
                    onClick={() => handlePhaseChange(1)}
                    className={`rounded-lg py-2 text-[11px] font-bold transition ${
                      activePhase === 1
                        ? "bg-slate-800 text-white shadow"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    ① 30分前:骨子
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePhaseChange(2)}
                    className={`rounded-lg py-2 text-[11px] font-bold transition ${
                      activePhase === 2
                        ? "bg-slate-800 text-white shadow"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    ② 3分前:呼吸
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePhaseChange(3)}
                    className={`rounded-lg py-2 text-[11px] font-bold transition ${
                      activePhase === 3
                        ? "bg-slate-800 text-white shadow"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    ③ 終了後:記録
                  </button>
                </div>

                {/* App Screen Body */}
                <div className="mt-3 min-h-[410px] rounded-2xl border border-slate-800/90 bg-slate-900/90 p-4">
                  {activePhase === 1 && (
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">報告の「3行骨子」を固定</h4>
                        <p className="text-[11px] text-slate-400">
                          書き換えると②のカンペに即反映されます
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="demo-conclusion"
                          className="text-[11px] font-bold text-sky-400"
                        >
                          1. 結論（一番伝えたい1行）
                        </label>
                        <input
                          id="demo-conclusion"
                          type="text"
                          value={conclusion}
                          onChange={(e) => setConclusion(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="demo-evidence"
                          className="text-[11px] font-bold text-sky-400"
                        >
                          2. 根拠・数字（結論を支える事実）
                        </label>
                        <input
                          id="demo-evidence"
                          type="text"
                          value={evidence}
                          onChange={(e) => setEvidence(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="demo-next-action"
                          className="text-[11px] font-bold text-sky-400"
                        >
                          3. 次のアクション（共有・依頼事項）
                        </label>
                        <input
                          id="demo-next-action"
                          type="text"
                          value={nextAction}
                          onChange={(e) => setNextAction(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-sky-400 focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePhaseChange(2)}
                        className="mt-2 w-full rounded-xl bg-sky-400 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-sky-300"
                      >
                        骨子を固定して「3分前呼吸」へ →
                      </button>
                    </div>
                  )}

                  {activePhase === 2 && (
                    <div className="flex h-full flex-col justify-between space-y-3">
                      {/* Fixed Cue Card */}
                      <div className="rounded-xl border-l-4 border-sky-400 bg-slate-950 p-3 text-xs">
                        <div className="flex gap-1.5">
                          <span className="shrink-0 font-bold text-sky-400">結論</span>
                          <span className="line-clamp-1 font-semibold text-white">
                            {conclusion || "（結論未入力）"}
                          </span>
                        </div>
                        <div className="mt-1 flex gap-1.5">
                          <span className="shrink-0 font-bold text-slate-400">根拠</span>
                          <span className="line-clamp-1 text-slate-300">
                            {evidence || "（根拠未入力）"}
                          </span>
                        </div>
                        <div className="mt-1 flex gap-1.5">
                          <span className="shrink-0 font-bold text-emerald-400">次歩</span>
                          <span className="line-clamp-1 text-slate-300">
                            {nextAction || "（アクション未入力）"}
                          </span>
                        </div>
                      </div>

                      {/* Sound & Vibration Status Bar */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-emerald-300">
                          <Vibrate className="h-3.5 w-3.5" />
                          <span>{breathState.vibeText}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setSoundOn((prev) => !prev)}
                          className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-[10px] font-bold text-slate-200"
                        >
                          {soundOn ? (
                            <>
                              <Volume2 className="h-3 w-3 text-sky-400" />
                              <span>音ON</span>
                            </>
                          ) : (
                            <>
                              <VolumeX className="h-3 w-3 text-slate-500" />
                              <span>消音</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Breathing Animation Circle */}
                      <div className="flex flex-col items-center justify-center py-5">
                        <div
                          className={`flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 bg-gradient-to-br transition-all duration-1000 ${breathState.ringColor} ${breathState.bgGradient} ${breathState.scale}`}
                        >
                          <span className="text-[11px] font-extrabold text-white">
                            {breathState.label}
                          </span>
                          <span className="mt-0.5 font-mono text-2xl font-black text-white">
                            {breathState.count}
                          </span>
                        </div>
                      </div>

                      {/* Control Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsBreathing((prev) => !prev);
                          setCycleSec(0);
                        }}
                        className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-extrabold transition ${
                          isBreathing
                            ? "bg-rose-500 text-white"
                            : "bg-sky-400 text-slate-950 hover:bg-sky-300"
                        }`}
                      >
                        {isBreathing ? (
                          <>
                            <Square className="h-3.5 w-3.5 fill-current" />
                            <span>デモを停止する</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-3.5 w-3.5 fill-current" />
                            <span>4-7-8 呼吸ガイドを再生する</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {activePhase === 3 && (
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          お疲れ様でした。今の感覚を1タップ
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          完了記録で「やり切った記憶」を上書きします
                        </p>
                      </div>

                      <div className="space-y-2">
                        {LOG_OPTIONS.map((option) => (
                          <button
                            type="button"
                            key={option}
                            onClick={() => setSelectedLog(option)}
                            className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left text-xs font-bold transition ${
                              selectedLog === option
                                ? "border-emerald-400 bg-emerald-500/15 text-white"
                                : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700"
                            }`}
                          >
                            <span>{option}</span>
                            <CheckCircle2
                              className={`h-4 w-4 ${
                                selectedLog === option ? "text-emerald-400" : "text-slate-700"
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-[11px]">
                        <div className="font-bold text-slate-400">直近のコントロール履歴</div>
                        <div className="mt-1.5 flex items-center justify-between text-slate-200">
                          <span>{selectedLog}</span>
                          <span className="text-slate-500">たった今</span>
                        </div>
                      </div>
                    </div>
                  )}
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
            <span className="text-xs font-bold tracking-wider text-sky-400 uppercase">
              BEFORE & AFTER
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              精神論の「深呼吸」と、CALM3の「生理学的コントロール」の違い
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-500/25 bg-slate-950/90 p-6">
              <div className="mb-4 flex items-center gap-2 text-rose-400">
                <XCircle className="h-5 w-5" />
                <span className="text-sm font-extrabold">これまでの自己流・気合い対策</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    直前に焦って「早く吸って早く吐く」浅い深呼吸をしてしまい、逆に交感神経が刺激されて動悸が悪化する
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    長文のカンペを用意しすぎて、本番で「今どこを読んでいるか」を見失いパニックになる
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-rose-400">✕</span>
                  <span>
                    高額な話し方教室やサブスク型瞑想アプリは、会議3分前の切羽詰まった場面では開く気すら起きない
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-950 p-6 shadow-xl shadow-emerald-950/20">
              <div className="mb-4 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-extrabold">CALM3 導入後の会議ルーティン</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    <strong>「4秒吸う・7秒止める・8秒吐く」</strong>の自動ペースメーカーに身を委ねるだけで、3分間で強制的に副交感神経へ切り替え
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    画面上部に固定された<strong>「結論・根拠・次歩」の3行カンペ</strong>だけを見ればいいので、絶対に話の軸がブレない
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400">✓</span>
                  <span>
                    ログイン不要・ホーム画面から1タップ即起動。デスクの下でスマホを握ったまま周囲にバレずに実践できる
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
          <div className="rounded-3xl border border-sky-400/30 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/30 p-6 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md bg-sky-400/15 px-2.5 py-1 text-xs font-bold text-sky-300">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>月額課金なし・一度買えばずっと使える買い切り型</span>
                </div>
                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  正式公開予定価格：買い切り 1,480円（税込）
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                  数万円のあがり症セミナーや話し方教室に通う前に、まずは「次の会議の3分前」に1回試してみてください。
                  <br className="hidden sm:inline" />
                  <strong className="text-sky-300">ランチ1回分の投資</strong>で、毎週の会議前の胃が痛くなる時間と、終了後の自己嫌悪から解放されます。
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-950/90 p-5 text-center sm:min-w-[230px]">
                <span className="text-xs font-bold text-sky-400">テスト公開・先行ユーザー特典</span>
                <div className="mt-1 text-xl font-extrabold text-white">シーン別3行骨子</div>
                <div className="text-sm font-bold text-emerald-400">テンプレート集を無料付帯</div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  役員報告・謝罪・反対意見への切り返し用テンプレを初期実装
                </p>
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="mt-4 w-full rounded-xl bg-sky-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:bg-sky-300"
                >
                  先行案内を受け取る →
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="h-4 w-4 shrink-0 text-sky-400" />
                <span>ログイン不要・入力データは端末内のみに安全保存</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Vibrate className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>画面を見ずに同期できるバイブレーション＆微細音ガイド</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Smartphone className="h-4 w-4 shrink-0 text-sky-400" />
                <span>iPhone / Android ブラウザ対応・ホーム画面追加で即起動</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Registration Form Section */}
      <section id="register-form" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <PreRegisterForm
            productId="117"
            productName="CALM3（本番3分前の緊張コントロール・3行骨子×4-7-8呼吸アプリ）"
            offerText="【テスト公開・先行登録特典】正式リリース（買い切り1,480円）の優先ご案内に加え、緊張しやすい場面（役員報告・進捗遅延の共有・反対意見への切り返し）でそのまま使える『シーン別3行骨子テンプレート集』を無料付帯でお渡しします。"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 CALM3. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
