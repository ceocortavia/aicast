"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Episode } from "@/lib/episodes";

type PlayerContextValue = {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playEpisode: (episode: Episode) => void;
  togglePlay: () => void;
  seek: (time: number) => void;
};

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, []);

  const playEpisode = useCallback((episode: Episode) => {
    setCurrentEpisode(episode);
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.src !== episode.audioUrl) {
      audio.src = episode.audioUrl;
    }
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(time, duration || audio.duration || 0));
  }, [duration]);

  const value: PlayerContextValue = useMemo(
    () => ({ currentEpisode, isPlaying, currentTime, duration, playEpisode, togglePlay, seek }),
    [currentEpisode, isPlaying, currentTime, duration, playEpisode, togglePlay, seek]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}


