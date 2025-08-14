"use client";

import { Episode } from "@/lib/episodes";
import { usePlayer } from "@/components/player/PlayerProvider";

export default function PlayButton({ episode, className = "" }: { episode: Episode; className?: string }) {
  const { playEpisode } = usePlayer();
  return (
    <button
      type="button"
      onClick={() => playEpisode(episode)}
      className={`inline-flex items-center rounded-md px-3 py-1.5 btn-gradient ${className}`}
    >
      ▶ Spill av
    </button>
  );
}




