import type { Metadata } from "next";
import { getLatestEpisodes } from "@/lib/episodes";
import EpisodeCard from "@/components/EpisodeCard";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Episoder – AICAST",
  description:
    "Utforsk episoder om kunstig intelligens: intervjuer, innsikt og praktiske verktøy.",
};

export default function EpisodesPage() {
  const list = getLatestEpisodes();
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-gradient reveal">Episoder</h1>
      <div className="card-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
        {list.map((e) => (
          <EpisodeCard key={e.id} episode={e} />
        ))}
      </div>
    </section>
  );
}

