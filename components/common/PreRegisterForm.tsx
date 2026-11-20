"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Loader2,
  Gift,
  ShieldCheck,
  Clock,
} from "lucide-react";

interface PreRegisterFormProps {
  productId: string;
  productName: string;
  offerText?: string;
}

export function PreRegisterForm({
  productId,
  productName,
  offerText = "先行リリース案内＆初期モニター特別優待を受け取る",
}: PreRegisterFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // offerText からバッジ部分（【...】）とオファー詳細文を分離抽出
  const badgeMatch = offerText.match(/【(.*?)】/);
  const badgeLabel = badgeMatch ? badgeMatch[1] : "先行登録者限定オファー";
  const cleanOfferText = offerText.replace(/【.*?】/, "").trim();

  // Formspreeへの登録データ送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("https://formspree.io/f/xyewdyky", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          productId,
          productName,
          email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const detailedMessage =
          errorData && errorData.errors
            ? errorData.errors.map((err: { message: string }) => err.message).join(", ")
            : "登録に失敗しました。時間をおいて再度お試しください。";
        throw new Error(detailedMessage);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("[PreRegister Error]", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "通信エラーが発生しました。ネットワーク環境をご確認の上、再度お試しください。"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="register-form"
      className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl transition-all sm:p-10"
    >
      {/* 上部アクセントカラーバー */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400" />

      {/* ヘッダーエリア（見出しは短く洗練されたフォントサイズで視覚的圧迫感を排除） */}
      <div className="text-center sm:text-left">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-indigo-600" />
          <span>{badgeLabel}</span>
        </div>

        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl text-balance">
          先行リリース枠に無料登録する
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm text-pretty">
          メールアドレスをご登録いただくと、正式リリースと同時に優先アクセス権と以下の特別優待をお届けします。
        </p>
      </div>

      {/* 特別オファー内容の独立カード表示（長文テキストを美しく整理） */}
      <div className="my-6 rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-indigo-50/70 via-slate-50/50 to-white p-4.5 sm:p-5">
        <div className="flex items-start gap-3.5">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-500/20">
            <Gift className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800">
              登録者限定の特別オファー
            </span>
            <p className="mt-1 text-xs font-medium leading-relaxed text-slate-700 sm:text-sm text-pretty">
              {cleanOfferText}
            </p>
          </div>
        </div>
      </div>

      {/* エラーアラート枠 */}
      {errorMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-xs text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
          <div className="flex-1">
            <p className="font-bold text-rose-900">送信エラーが発生しました</p>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* 登録完了後のメッセージ表示 */}
      {submitted ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-6 text-center sm:p-8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <p className="text-lg font-bold text-emerald-950 sm:text-xl">
            先行登録が完了いたしました！
          </p>
          <p className="mt-2 text-xs leading-relaxed text-emerald-800 sm:text-sm text-balance">
            『{productName}』の公開準備が整い次第、ご登録のメールアドレス宛へ最優先でご案内いたします。
          </p>
        </div>
      ) : (
        /* メール登録フォーム本体 */
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              disabled={isSubmitting}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="flex-1 rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 disabled:cursor-not-allowed disabled:bg-slate-100"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-500"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>送信中...</span>
                </>
              ) : (
                <>
                  <span>優先案内を受け取る</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* 信頼性・安心感を担保するマイクロコピー */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-center text-[11px] text-slate-400 sm:text-xs">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3 text-slate-400" />
              所要時間 約10秒で完了
            </span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              スパム一切なし（1クリック解除可）
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
