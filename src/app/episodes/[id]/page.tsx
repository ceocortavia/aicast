import { notFound } from "next/navigation";
import { getEpisodeById, episodes, formatDuration } from "@/lib/episodes";
import Image from "next/image";
import PlayButton from "@/components/player/PlayButton";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

export const dynamic = "force-static";

export function generateStaticParams() {
  return episodes.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const e = getEpisodeById(id);
  if (!e) return { title: "Episode ikke funnet – AICAST" };
  const title = `${e.title} – AICAST`;
  const description = e.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/episodes/${e.id}`,
      type: "article",
      images: e.coverImage ? [{ url: e.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: e.coverImage ? [e.coverImage] : undefined,
    },
    alternates: { canonical: `/episodes/${e.id}` },
  };
}

export default async function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const episode = getEpisodeById(id);
  if (!episode) return notFound();

  return (
    <article className="space-y-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "PodcastEpisode",
          name: episode.title,
          url: `${process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/episodes/${episode.id}`,
          datePublished: new Date(episode.publishedAt).toISOString(),
          description: episode.description,
          associatedMedia: {
            "@type": "MediaObject",
            contentUrl: episode.audioUrl,
          },
          partOfSeries: {
            "@type": "PodcastSeries",
            name: "AICAST – Podkast om KI",
          },
        }}
      />
      <header className="space-y-2">
        <div className="text-sm text-foreground/60">
          {new Date(episode.publishedAt).toLocaleDateString("no-NO")} • {formatDuration(episode.durationSeconds)}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-gradient">{episode.title}</h1>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 overflow-hidden rounded-lg border border-foreground/10">
            <Image
              src={episode.coverImage || "/cover-default.svg"}
              alt={episode.title}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-foreground/80">{episode.description}</p>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-lg p-2">
          <audio controls className="w-full">
            <source src={episode.audioUrl} type="audio/mpeg" />
            Nettleseren din støtter ikke lydavspilleren.
          </audio>
          <div className="pt-2">
            <PlayButton episode={episode} />
          </div>
        </div>
        <div className="space-y-3">
          {episode.spotifyEmbedUrl && (
            <iframe
              title="Spotify"
              src={episode.spotifyEmbedUrl}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full rounded-lg border border-foreground/10"
            />
          )}
          {episode.appleEmbedUrl && (
            <iframe
              title="Apple Podcasts"
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              height="175"
              style={{ width: "100%", overflow: "hidden", background: "transparent" }}
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-top-navigation"
              src={episode.appleEmbedUrl}
              className="w-full rounded-lg border border-foreground/10"
            />
          )}
        </div>
      </div>
    </article>
  );
}

