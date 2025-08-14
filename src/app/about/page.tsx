import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Om AICAST – Podkast om KI",
  description:
    "Vi snakker med dem som bygger og bruker KI – fra utvikling og forskning til ledelse – og viser konkret hvordan problemer løses med KI.",
};

export default function AboutPage() {
  return (
    <section className="prose prose-invert max-w-none">
      <h1>Om AICAST</h1>
      <p>
        AICAST er en podkast om kunstig intelligens – for skapere, ledere og
        nysgjerrige sjeler. Vi dekker nyheter, dype samtaler, praksis og
        strategi. Vi snakker med dem som bygger og bruker KI – fra utvikling og
        forskning til ledelse – og viser konkret hvordan problemer løses med KI.
      </p>
      <p>
        Målet er å gjøre KI forståelig og nyttig i hverdagen, med fokus på
        kvalitet og klare forklaringer.
      </p>
    </section>
  );
}

