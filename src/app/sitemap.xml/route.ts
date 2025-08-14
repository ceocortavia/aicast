import { episodes } from "@/lib/episodes";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = process.env.SITE_URL ?? "https://aicast.example";
  const urls = ["/", "/episodes", "/about", "/contact", ...episodes.map((e) => `/episodes/${e.id}`)];
  const xmlUrls = urls
    .map((path) => `<url><loc>${siteUrl}${path}</loc></url>`) 
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xmlUrls}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}


