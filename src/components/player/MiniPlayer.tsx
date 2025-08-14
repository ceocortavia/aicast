"use client";

import { useEffect, useMemo } from "react";
import { usePlayer } from "./PlayerProvider";
import { formatDuration } from "@/lib/episodes";

export default function MiniPlayer() {
  const { currentEpisode, isPlaying, currentTime, duration, togglePlay, seek } = usePlayer();

  const progress = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  useEffect(() => {
    // Fallback for browsers uten view transitions
    document.documentElement.style.setProperty("view-transition-name", "page");
  }, []);

  if (!currentEpisode) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(680px,92vw)] shadow-xl rounded-2xl glass p-3 border border-foreground/10">
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full btn-gradient text-black font-semibold"
          aria-label={isPlaying ? "Pause" : "Spill av"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{currentEpisode.title}</div>
          <div className="flex items-center gap-2 text-xs text-foreground/60">
            <span>{formatDuration(Math.floor(currentTime))}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="flex-1 accent-[color-mix(in_oklab,var(--accent-2)_60%,white)]"
            />
            <span>{formatDuration(Math.floor(duration || 0))}</span>
          </div>
        </div>
      </div>
      <div className="h-1 mt-3 rounded-full bg-foreground/10 overflow-hidden">
        <div
          className="h-full bg-[color-mix(in_oklab,var(--accent-1)_60%,white)] transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}




