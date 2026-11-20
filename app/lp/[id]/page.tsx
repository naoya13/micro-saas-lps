import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PRODUCTS } from "@/data/products";

// ※子スレッドで作ったコンポーネントをここにインポートして追加していく
import Lp104 from "@/components/lps/Lp104";
import Lp117 from "@/components/lps/Lp117";
import Lp102 from "@/components/lps/Lp102";
import Lp094 from "@/components/lps/Lp094";
import Lp008 from "@/components/lps/Lp008";
import Lp073 from "@/components/lps/Lp073";
import Lp013 from "@/components/lps/Lp013";
import Lp023 from "@/components/lps/Lp023";
import Lp004 from "@/components/lps/Lp004";
import Lp101 from "@/components/lps/Lp101";

const LP_COMPONENTS: Record<string, React.ComponentType> = {
  "104": Lp104,
  "117": Lp117,
  "102": Lp102,
  "094": Lp094,
  "008": Lp008,
  "073": Lp073,
  "013": Lp013,
  "023": Lp023,
  "004": Lp004,
  "101": Lp101,
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS[id];
  if (!product) return { title: "Not Found" };

  return {
    title: `${product.name} | ${product.tagline}`,
    description: product.tagline,
  };
}

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((id) => ({ id }));
}

export default async function LpDynamicPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS[id];
  const LpComponent = LP_COMPONENTS[id];

  if (!product || !LpComponent) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <LpComponent />
    </main>
  );
}
