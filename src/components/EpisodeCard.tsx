"use client";

import Link from "next/link";
import Image from "next/image";
import { Episode, formatDuration } from "@/lib/episodes";
import { usePlayer } from "@/components/player/PlayerProvider";

export default function EpisodeCard({ episode }: { episode: Episode }) {
  const { playEpisode } = usePlayer();
  return (
    <article className="episode-card rounded-xl glass p-4 hover:shadow-[0_10px_30px_-10px_rgb(0_0_0_/_0.3)] transition-shadow">
      <div className="aspect-square w-24 overflow-hidden rounded-lg bg-foreground/10">
        <Image
          src={episode.coverImage || "/cover-default.svg"}
          alt={episode.title}
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-1">
        <div className="text-xs text-foreground/60">
          {new Date(episode.publishedAt).toLocaleDateString("no-NO")} • {formatDuration(episode.durationSeconds)}
        </div>
        <h3 className="font-medium leading-tight">
          <Link href={`/episodes/${episode.id}`} className="hover:underline">
            {episode.title}
          </Link>
        </h3>
        <p className="text-sm text-foreground/70 line-clamp-2">{episode.description}</p>
        <div className="pt-1 flex items-center gap-3">
          <Link href={`/episodes/${episode.id}`} className="text-sm underline">
            Detaljer
          </Link>
          <button
            type="button"
            onClick={() => playEpisode(episode)}
            className="text-sm rounded-md px-2 py-1 btn-gradient"
          >
            Spill av
          </button>
        </div>
      </div>
    </article>
  );
}

