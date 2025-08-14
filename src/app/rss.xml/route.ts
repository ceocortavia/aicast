import { episodes } from "@/lib/episodes";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = process.env.SITE_URL ?? "https://aicast.example";
  const xmlItems = episodes
    .map((e) => {
      const pubDate = new Date(e.publishedAt).toUTCString();
      const duration = formatRssDuration(e.durationSeconds);
      return `
        <item>
          <title>${escapeXml(e.title)}</title>
          <link>${siteUrl}/episodes/${e.id}</link>
          <guid>${siteUrl}/episodes/${e.id}</guid>
          <description>${escapeXml(e.description)}</description>
          <pubDate>${pubDate}</pubDate>
          <enclosure url="${e.audioUrl}" type="audio/mpeg"/>
          <itunes:duration>${duration}</itunes:duration>
          <itunes:explicit>false</itunes:explicit>
          <itunes:episodeType>full</itunes:episodeType>
        </item>
      `;
    })
    .join("");

  const now = new Date().toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>AICAST – Podkast om KI</title>
      <link>${siteUrl}</link>
      <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
      <language>no</language>
      <lastBuildDate>${now}</lastBuildDate>
      <description>Vi snakker med dem som bygger og bruker KI – fra utvikling og forskning til ledelse – og viser konkret hvordan problemer løses med KI.</description>
      <itunes:author>AICAST</itunes:author>
      <itunes:summary>Vi snakker med dem som bygger og bruker KI – fra utvikling og forskning til ledelse – og viser konkret hvordan problemer løses med KI.</itunes:summary>
      <itunes:image href="${siteUrl}/opengraph-image"/>
      <itunes:category text="Technology"/>
      ${xmlItems}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}

function escapeXml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function formatRssDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

