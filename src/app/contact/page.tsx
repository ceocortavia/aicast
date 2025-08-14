import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Kontakt – AICAST",
  description:
    "Kontakt AICAST: forslag til tema, gjester eller samarbeid innen KI og teknologi.",
};

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Kontakt</h1>
      <p className="text-foreground/80">
        Har du innspill, forslag til tema eller ønsker å være gjest? Send oss
        en e-post på <a className="underline" href="mailto:post@aicast.no">post@aicast.no</a>.
      </p>
      <div className="rounded-lg border border-foreground/10 p-4 text-sm text-foreground/70">
        Vi svarer vanligvis innen 1–2 virkedager.
      </div>
    </section>
  );
}

