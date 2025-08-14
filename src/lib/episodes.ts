export type Episode = {
  id: string;
  title: string;
  description: string;
  publishedAt: string; // ISO string
  durationSeconds: number;
  audioUrl: string;
  coverImage?: string; // kan være SVG fra public/
  tags?: string[];
  spotifyEmbedUrl?: string;
  appleEmbedUrl?: string;
};

export const episodes: Episode[] = [
  {
    id: "introduksjon-ki",
    title: "Introduksjon til KI-landskapet",
    description:
      "Hva er kunstig intelligens i 2025? Vi dekker grunnbegreper og trender.",
    publishedAt: new Date().toISOString(),
    durationSeconds: 1620,
    audioUrl: "https://cdn.example.com/audio/introduksjon-ki.mp3",
    coverImage: "/cover-default.svg",
    tags: ["intro", "trender"],
    spotifyEmbedUrl: "https://open.spotify.com/embed/episode/3Z4Example",
    appleEmbedUrl: "https://embed.podcasts.apple.com/us/podcast/id0000000000?i=1000600000000",
  },
  {
    id: "agentics",
    title: "Agentics og autonome agenter",
    description:
      "Hvordan bygger man praktiske agenter, og hva brukes de til i dag?",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    durationSeconds: 2380,
    audioUrl: "https://cdn.example.com/audio/agentics.mp3",
    coverImage: "/cover-default.svg",
    tags: ["agenter", "applikasjoner"],
    spotifyEmbedUrl: "https://open.spotify.com/embed/episode/5A7Example",
    appleEmbedUrl: "https://embed.podcasts.apple.com/us/podcast/id0000000000?i=1000600000001",
  },
  {
    id: "sikkerhet-personvern",
    title: "KI, sikkerhet og personvern",
    description:
      "Vi diskuterer risiko, governance og personvern i KI-systemer.",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
    durationSeconds: 3012,
    audioUrl: "https://cdn.example.com/audio/sikkerhet-personvern.mp3",
    coverImage: "/cover-default.svg",
    tags: ["sikkerhet", "personvern"],
    spotifyEmbedUrl: "https://open.spotify.com/embed/episode/7B9Example",
    appleEmbedUrl: "https://embed.podcasts.apple.com/us/podcast/id0000000000?i=1000600000002",
  },
];

export function getEpisodeById(id: string): Episode | undefined {
  return episodes.find((e) => e.id === id);
}

export function getLatestEpisodes(limit = 6): Episode[] {
  return [...episodes]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}`;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

