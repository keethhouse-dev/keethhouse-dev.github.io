import { phaseData } from "@/lib/house-data";
import StayClient from "./stay-client";

export function generateStaticParams() {
  return phaseData.flatMap((p) =>
    (p.houses ?? []).map((h) => ({ id: h.id }))
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StayClient id={id} />;
}
