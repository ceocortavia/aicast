import Link from "next/link";
import { getLatestEpisodes } from "@/lib/episodes";
import EpisodeCard from "@/components/EpisodeCard";
import Parallax from "@/components/visuals/Parallax";

export default function Home() {
  const latest = getLatestEpisodes(6);
  return (
    <section className="space-y-10">
      <div className="grid md:grid-cols-2 gap-8 items-center reveal">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-gradient">AICAST</h1>
          <p className="text-lg text-foreground/80">
            Vi snakker med dem som bygger og bruker KI – fra utvikling og forskning til ledelse – og viser konkret hvordan problemer løses med KI.
          </p>
          <div className="flex gap-3">
            <Link
              href="/episodes"
              className="inline-flex items-center rounded-md btn-gradient px-4 py-2 text-sm font-medium hover:opacity-90 shadow-lg shadow-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]"
            >
              Utforsk episoder
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
            >
              Om AICAST
            </Link>
          </div>
        </div>
        <Parallax>
          <div className="aspect-video rounded-2xl glass border border-foreground/10 flex items-center justify-center text-foreground/60 shadow-[0_30px_120px_-40px_rgb(0_0_0_/_0.45)]">
            Interaktiv hero / spiller kommer her
          </div>
        </Parallax>
      </div>

      <div className="space-y-4 reveal">
        <h2 className="text-xl font-semibold">Siste episoder</h2>
        <div className="card-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
          {latest.map((e) => (
            <EpisodeCard key={e.id} episode={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
