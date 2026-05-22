import { notFound } from "next/navigation";
import type { Direction } from "@/catalog/types";
import { GameClient } from "@/components/GameClient";

const DIRECTIONS: Direction[] = ["en_es", "es_en"];

// Slug en URL: es-en y en-es (guion). En tipos internos: es_en, en_es (underscore).
const URL_TO_DIRECTION: Record<string, Direction> = {
  "es-en": "es_en",
  "en-es": "en_es",
};

export function generateStaticParams() {
  return [{ direction: "es-en" }, { direction: "en-es" }];
}

export default async function JugarPage({
  params,
}: {
  params: Promise<{ direction: string }>;
}) {
  const { direction: urlSlug } = await params;
  const direction = URL_TO_DIRECTION[urlSlug];
  if (!direction || !DIRECTIONS.includes(direction)) {
    notFound();
  }
  return <GameClient direction={direction} />;
}
